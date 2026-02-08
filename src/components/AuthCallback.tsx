import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const AuthCallback: React.FC = () => {
  const { handleCallback, error } = useAuthStore();
  
  useEffect(() => {
    handleCallback();
  }, []);
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-matcha-light to-warm flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Chyba přihlášení
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = window.location.origin + '/dashboard/'}
            className="bg-matcha-dark text-white px-6 py-3 rounded-lg hover:opacity-90"
          >
            Zkusit znovu
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-light to-warm flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div 
            className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <img 
              src="/dashboard/listka-avatar.png" 
              alt="Lístka" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-matcha-dark mb-4">
          Přihlašování...
        </h2>
        <p className="text-gray-600">
          Inicializujeme tvůj les Emerald
        </p>
      </div>
    </div>
  );
};
