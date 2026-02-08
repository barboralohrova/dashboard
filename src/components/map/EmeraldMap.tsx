import React, { useState } from 'react';
import { getDayPeriod } from '../../utils/helpers';

interface Building {
  id: string;
  name: string;
  icon: string;
  module: string;
  category: 'tasks' | 'finance' | 'food' | 'personal' | 'travel' | 'home';
}

const BUILDINGS: Building[] = [
  { id: 'tasks', name: 'Nástěnka u studny', icon: '📋', module: 'tasks', category: 'tasks' },
  { id: 'calendar', name: 'Rozhledna', icon: '📅', module: 'calendar', category: 'tasks' },
  { id: 'finance', name: 'Strom moudrosti', icon: '💰', module: 'finance', category: 'finance' },
  { id: 'food', name: 'Kuchyňka', icon: '🍳', module: 'food', category: 'food' },
  { id: 'diary', name: 'Tajný deníček', icon: '📝', module: 'diary', category: 'personal' },
  { id: 'habits', name: 'Tréninková loučka', icon: '🏋️', module: 'habits', category: 'home' },
  { id: 'learning', name: 'Jeskyně poznání', icon: '⛰️', module: 'learning', category: 'home' },
  { id: 'home', name: 'Chaloupka', icon: '🏡', module: 'home', category: 'home' },
  { id: 'health', name: 'Bylinkářka', icon: '🌸', module: 'health', category: 'food' },
  { id: 'relationships', name: 'Poštovní budka', icon: '👥', module: 'relationships', category: 'personal' },
  { id: 'insurance', name: 'Strážní věž', icon: '🛡️', module: 'insurance', category: 'travel' },
  { id: 'travel', name: 'Cestovatelský kůl', icon: '🧳', module: 'travel', category: 'travel' },
];

const CATEGORY_COLORS = {
  tasks: 'bg-blue-50 hover:bg-blue-100',
  finance: 'bg-yellow-50 hover:bg-yellow-100',
  food: 'bg-green-50 hover:bg-green-100',
  personal: 'bg-pink-50 hover:bg-pink-100',
  travel: 'bg-purple-50 hover:bg-purple-100',
  home: 'bg-orange-50 hover:bg-orange-100',
};

interface EmeraldMapProps {
  onBuildingClick: (module: string) => void;
}

export const EmeraldMap: React.FC<EmeraldMapProps> = ({ onBuildingClick }) => {
  const dayPeriod = getDayPeriod();
  const [avatarError, setAvatarError] = useState(false);
  
  // Background colors based on day period
  const bgGradients = {
    morning: 'from-orange-200 via-yellow-100 to-matcha-light',
    day: 'from-blue-200 via-matcha-light to-green-200',
    evening: 'from-orange-300 via-warm to-matcha-light',
    night: 'from-indigo-900 via-purple-900 to-blue-900',
  };
  
  const textColor = dayPeriod === 'night' ? 'text-white' : 'text-text-dark';
  
  return (
    <div className={`relative w-full min-h-[50vh] md:min-h-[60vh] rounded-kawaii overflow-hidden bg-gradient-to-br ${bgGradients[dayPeriod]} shadow-xl p-6 md:p-8`}>
      {/* Decorative elements - positioned in corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Trees */}
        <div className="absolute left-4 top-4 text-4xl md:text-5xl animate-pulse opacity-40" style={{ animationDuration: '4s' }}>
          🌲
        </div>
        <div className="absolute right-4 top-4 text-3xl md:text-4xl animate-pulse opacity-40" style={{ animationDuration: '5s' }}>
          🌳
        </div>
        <div className="absolute left-4 bottom-4 text-3xl md:text-4xl animate-pulse opacity-40" style={{ animationDuration: '6s' }}>
          🌲
        </div>
        <div className="absolute right-4 bottom-4 text-4xl md:text-5xl animate-pulse opacity-40" style={{ animationDuration: '5.5s' }}>
          🌳
        </div>
        
        {/* Stars at night */}
        {dayPeriod === 'night' && (
          <>
            <div className="absolute left-[20%] top-[15%] text-xl animate-pulse">⭐</div>
            <div className="absolute right-[25%] top-[20%] text-lg animate-pulse">✨</div>
            <div className="absolute left-[70%] top-[10%] text-xl animate-pulse">⭐</div>
            <div className="absolute right-[15%] top-[25%] text-lg animate-pulse">✨</div>
          </>
        )}
        
        {/* Sun/Moon */}
        <div className="absolute right-[10%] top-[10%] text-4xl md:text-5xl">
          {dayPeriod === 'night' ? '🌙' : '☀️'}
        </div>
      </div>
      
      {/* Lístka avatar floating at top center */}
      <div className="flex justify-center mb-6 relative z-10">
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
      
      {/* Period indicator */}
      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm ${textColor} text-xs md:text-sm font-medium shadow-md z-10`}>
        {dayPeriod === 'morning' && '🌅 Ráno'}
        {dayPeriod === 'day' && '☀️ Den'}
        {dayPeriod === 'evening' && '🌅 Podvečer'}
        {dayPeriod === 'night' && '🌙 Noc'}
      </div>
      
      {/* Buildings Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {BUILDINGS.map((building) => (
          <button
            key={building.id}
            onClick={() => onBuildingClick(building.module)}
            className={`${CATEGORY_COLORS[building.category]} rounded-kawaii p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center justify-center min-h-[120px] md:min-h-[140px]`}
          >
            <div className="text-4xl md:text-5xl mb-2">
              {building.icon}
            </div>
            <p className="text-xs md:text-sm font-semibold text-matcha-dark text-center leading-tight">
              {building.name}
            </p>
          </button>
        ))}
      </div>
      
      {/* Welcome message */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-10">
        <p className={`text-lg md:text-xl font-bold ${dayPeriod === 'night' ? 'text-white' : 'text-matcha-dark'} drop-shadow-lg`}>
          Vesnice Emerald
        </p>
        <p className={`text-xs md:text-sm ${dayPeriod === 'night' ? 'text-gray-300' : 'text-gray-600'}`}>
          Klikni na budovu pro vstup
        </p>
      </div>
    </div>
  );
};
