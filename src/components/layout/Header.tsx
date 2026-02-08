import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useGameStore } from '../../stores/gameStore';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { level, streak_aktualni, xp, xpForNextLevel } = useGameStore();
  const [avatarError, setAvatarError] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md px-4 md:px-8 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section - Avatar + Subtitle */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            {!avatarError ? (
              <img 
                src="/dashboard/listka-avatar.png" 
                alt="Lístka" 
                className="w-full h-full rounded-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="text-lg md:text-xl">🌿</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm text-gray-500 leading-tight">Vesnice Emerald</span>
          </div>
        </div>
        
        {/* Center section - Level badge & XP progress */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="bg-matcha-light text-matcha-dark px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-sm">
            <span>🌟</span>
            <span>Level {level}</span>
          </div>
          <div className="flex flex-col min-w-[200px]">
            <div className="text-xs text-gray-600 mb-1 text-center">
              {xp} / {xpForNextLevel} XP do dalšího levelu
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-matcha-dark to-matcha-light transition-all duration-300"
                style={{ width: `${(xp / xpForNextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Right section - User + Streak + Logout */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {user && (
            <>
              <div className="hidden md:flex items-center space-x-2">
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full shadow-sm"
                  />
                )}
                <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
              </div>
              <div className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-bold flex items-center space-x-1 shadow-sm">
                <span>🔥</span>
                <span>{streak_aktualni}</span>
              </div>
              <button
                onClick={logout}
                className="hidden md:inline text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-kawaii hover:bg-red-50"
              >
                Odhlásit
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
