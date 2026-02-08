const GOOGLE_CLIENT_ID = '365489384585-cdh01hr4lu5m1d98s3js94cpo7lovttv.apps.googleusercontent.com';
const REDIRECT_URI = window.location.origin.includes('localhost')
  ? 'http://localhost:5173/'
  : 'https://barboralohrova.github.io/dashboard/';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
].join(' ');

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

/**
 * Zahájí OAuth 2.0 přihlášení s Implicit Grant flow
 */
export async function initiateGoogleLogin(): Promise<void> {
  const state = generateRandomString(32);
  sessionStorage.setItem('oauth_state', state);
  
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'token');
  authUrl.searchParams.set('scope', SCOPES);
  authUrl.searchParams.set('state', state);
  
  window.location.href = authUrl.toString();
}

/**
 * Zpracuje OAuth callback a získá access token z URL hash fragmentu
 * 
 * Security Note: Implicit Grant flow exposes the access token in the URL hash,
 * which may be visible in browser history. This is acceptable for client-side
 * SPAs without a backend, but tokens should be cleared from the URL immediately
 * after extraction and should not be logged or stored insecurely.
 */
export async function handleOAuthCallback(): Promise<{ accessToken: string; refreshToken?: string }> {
  // Parse token from URL hash fragment (Implicit Grant)
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get('access_token');
  const state = hashParams.get('state');
  const error = hashParams.get('error');
  
  if (error) {
    throw new Error(`OAuth error: ${error}`);
  }
  
  const savedState = sessionStorage.getItem('oauth_state');
  if (state !== savedState) {
    throw new Error('State mismatch - possible CSRF attack');
  }
  
  if (!accessToken) {
    throw new Error('No access token received');
  }
  
  // Vyčistit session storage
  sessionStorage.removeItem('oauth_state');
  
  // Vyčistit URL hash (odstranit token z URL)
  window.history.replaceState(null, '', window.location.pathname);
  
  return {
    accessToken,
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
