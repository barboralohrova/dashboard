import { useState, useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import { LandingPage } from './components/LandingPage';
import { AuthCallback } from './components/AuthCallback';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();
  
  // Check ONCE if this is an OAuth callback - use useState initializer so it doesn't change on re-render
  const [isOAuthCallback] = useState(() => {
    const hash = window.location.hash;
    if (hash.length > 1) {
      const params = new URLSearchParams(hash.substring(1));
      return params.has('access_token');
    }
    return false;
  });
  
  // Try to restore session from sessionStorage on mount
  useEffect(() => {
    if (!isOAuthCallback && !isAuthenticated) {
      restoreSession();
    }
  }, []);
  
  // Handle GitHub Pages SPA routing
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      window.history.replaceState(null, '', redirect);
    }
  }, []);
  
  if (isOAuthCallback && !isAuthenticated) {
    return <AuthCallback />;
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-matcha-light to-warm flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🌿</div>
          <h2 className="text-2xl font-bold text-matcha-dark mb-4">Načítání...</h2>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <LandingPage />;
  }
  
  return <Dashboard />;
}

export default App;
