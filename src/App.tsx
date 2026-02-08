import { useAuthStore } from './stores/authStore';
import { LandingPage } from './components/LandingPage';
import { AuthCallback } from './components/AuthCallback';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { isAuthenticated } = useAuthStore();
  const isCallback = window.location.pathname.includes('/callback');
  
  if (isCallback) {
    return <AuthCallback />;
  }
  
  if (!isAuthenticated) {
    return <LandingPage />;
  }
  
  return <Dashboard />;
}

export default App;
