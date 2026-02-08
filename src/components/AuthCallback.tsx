import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const AuthCallback: React.FC = () => {
  const { handleCallback } = useAuthStore();
  
  useEffect(() => {
    handleCallback();
  }, [handleCallback]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-light to-warm flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6 animate-bounce">🌿</div>
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
