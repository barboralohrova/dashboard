import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useGameStore } from '../../stores/gameStore';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { level, streak_aktualni } = useGameStore();
  
  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-matcha-dark">🌲 Forest Dashboard</h1>
          <span className="text-sm text-gray-500">Vesnice Emerald</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-semibold">Level:</span>
              <span className="text-matcha-dark font-bold">{level}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold">Streak:</span>
              <span className="text-accent font-bold">{streak_aktualni} 🔥</span>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-3">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-600"
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
