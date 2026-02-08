const GOOGLE_CLIENT_ID = '365489384585-cdh01hr4lu5m1d98s3js94cpo7lovttv.apps.googleusercontent.com';
const REDIRECT_URI = window.location.origin.includes('localhost')
  ? 'http://localhost:5173/callback'
  : 'https://barboralohrova.github.io/dashboard/callback';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
].join(' ');

/**
 * Generuje PKCE code verifier a challenge
 */
async function generatePKCE(): Promise<{ verifier: string; challenge: string }> {
  const verifier = generateRandomString(128);
  const challenge = await sha256(verifier);
  return { verifier, challenge };
}

function generateRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

async function sha256(plain: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hash);
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Zahájí OAuth 2.0 přihlášení s PKCE
 */
export async function initiateGoogleLogin(): Promise<void> {
  const { verifier, challenge } = await generatePKCE();
  
  // Uložit verifier do sessionStorage pro pozdější použití
  sessionStorage.setItem('pkce_verifier', verifier);
  
  const state = generateRandomString(32);
  sessionStorage.setItem('oauth_state', state);
  
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPES);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  
  window.location.href = authUrl.toString();
}

/**
 * Zpracuje OAuth callback a získá access token
 */
export async function handleOAuthCallback(): Promise<{ accessToken: string; refreshToken?: string }> {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');
  
  if (error) {
    throw new Error(`OAuth error: ${error}`);
  }
  
  const savedState = sessionStorage.getItem('oauth_state');
  if (state !== savedState) {
    throw new Error('State mismatch - possible CSRF attack');
  }
  
  if (!code) {
    throw new Error('No authorization code received');
  }
  
  const verifier = sessionStorage.getItem('pkce_verifier');
  if (!verifier) {
    throw new Error('PKCE verifier not found');
  }
  
  // Vyměnit authorization code za access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      code_verifier: verifier,
    }),
  });
  
  if (!tokenResponse.ok) {
    const errorData = await tokenResponse.json();
    throw new Error(`Token exchange failed: ${errorData.error_description || errorData.error}`);
  }
  
  const tokenData = await tokenResponse.json();
  
  // Vyčistit session storage
  sessionStorage.removeItem('pkce_verifier');
  sessionStorage.removeItem('oauth_state');
  
  return {
    accessToken: tokenData.access_token,
    refreshToken: tokenData.refresh_token,
  };
}

/**
 * Získá informace o přihlášeném uživateli
 */
export async function getUserInfo(accessToken: string): Promise<{
  id: string;
  email: string;
  name: string;
  picture?: string;
}> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  
  const data = await response.json();
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    picture: data.picture,
  };
}

/**
 * Obnoví access token pomocí refresh tokenu
 */
export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  
  const data = await response.json();
  return data.access_token;
}
