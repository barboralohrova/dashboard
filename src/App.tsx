import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import { LandingPage } from './components/LandingPage';
import { AuthCallback } from './components/AuthCallback';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { isAuthenticated } = useAuthStore();
  
  // Check if we're returning from OAuth (hash contains access_token)
  const isOAuthCallback = window.location.hash.length > 0 && 
    new URLSearchParams(window.location.hash.substring(1)).has('access_token');
  
  // Handle GitHub Pages SPA routing
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      window.history.replaceState(null, '', redirect);
    }
  }, []);
  
  if (isOAuthCallback) {
    return <AuthCallback />;
  }
  
  if (!isAuthenticated) {
    return <LandingPage />;
  }
  
  return <Dashboard />;
}

export default App;
