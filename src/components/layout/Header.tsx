import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useGameStore } from '../../stores/gameStore';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { level, streak_aktualni } = useGameStore();
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-4 md:px-6 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <h1 className="text-xl md:text-2xl font-bold text-matcha-dark flex items-center">
            <span className="mr-1 md:mr-2">🌲</span>
            <span className="hidden sm:inline">Forest Dashboard</span>
            <span className="sm:hidden">Forest</span>
          </h1>
          <span className="hidden md:inline text-sm text-gray-500">Vesnice Emerald</span>
        </div>
        
        {/* Center section - Desktop only */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="bg-matcha-light text-matcha-dark px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-sm">
            <span>🌟</span>
            <span>Lv.{level}</span>
          </div>
          <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-sm">
            <span>🔥</span>
            <span>{streak_aktualni}</span>
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Mobile - just Lístka avatar */}
          <div className="md:hidden">
            <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
              <img 
                src="/dashboard/listka-avatar.png" 
                alt="Lístka" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          
          {/* Desktop - user info */}
          {user && (
            <div className="hidden md:flex items-center space-x-3">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full shadow-sm"
                />
              )}
              <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Odhlásit
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
