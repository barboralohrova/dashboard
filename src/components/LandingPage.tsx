import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Button } from './ui';

export const LandingPage: React.FC = () => {
  const { login, isLoading, error } = useAuthStore();
  const [avatarError, setAvatarError] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-matcha-light to-warm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <div 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-xl"
              style={{ animation: 'float 3s ease-in-out infinite' }}
            >
              {!avatarError ? (
                <img 
                  src="/dashboard/listka-avatar.png" 
                  alt="Lístka" 
                  className="w-full h-full rounded-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="text-5xl md:text-6xl">🌿</span>
              )}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-matcha-dark mb-4">
            Vesnice Emerald
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Vítej v lese Emerald 🌿
          </p>
          <p className="text-lg text-gray-600">
            Tvůj osobní životní organizér s gamifikací
          </p>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-kawaii p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-semibold text-matcha-dark mb-2">Úkoly & Organizace</h3>
            <p className="text-sm text-gray-600">Spravuj své úkoly a získávej XP za splnění</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-kawaii p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-semibold text-matcha-dark mb-2">Levelování</h3>
            <p className="text-sm text-gray-600">Rostoucí s tebou, odemykej nová zvířátka</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-kawaii p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-3">🏘️</div>
            <h3 className="font-semibold text-matcha-dark mb-2">Vesnice Emerald</h3>
            <p className="text-sm text-gray-600">Interaktivní mapa s tvými životními oblastmi</p>
          </div>
        </div>
        
        {/* Login Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-kawaii p-8 shadow-xl">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Připoj se k Lístce a začni svou cestu lesní vesnicí
            </p>
          </div>
          
          <Button
            onClick={login}
            disabled={isLoading}
            variant="primary"
            size="lg"
            className="w-full md:w-auto"
          >
            {isLoading ? 'Přihlašování...' : '🔐 Přihlásit se přes Google'}
          </Button>
          
          {error && (
            <p className="mt-4 text-red-500 text-sm">{error}</p>
          )}
          
          <p className="mt-6 text-xs text-gray-500">
            Používáme Google OAuth pro bezpečné přihlášení.<br />
            Data jsou uložena v Google Sheets na tvém Google Disku.
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Tvůj avatar Lístka 🍃 tě provází celou cestou</p>
        </div>
      </div>
    </div>
  );
};
