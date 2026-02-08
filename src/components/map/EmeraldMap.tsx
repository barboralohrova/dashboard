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
  tasks: { bg: 'bg-blue-50', border: 'border-blue-200', shadow: 'shadow-[4px_4px_0px_#BFDBFE]' },
  finance: { bg: 'bg-lemon', border: 'border-yellow-300', shadow: 'shadow-[4px_4px_0px_#FDE68A]' },
  food: { bg: 'bg-matcha-light', border: 'border-matcha-dark', shadow: 'shadow-sticker-dark' },
  personal: { bg: 'bg-salmon/40', border: 'border-salmon', shadow: 'shadow-sticker-salmon' },
  travel: { bg: 'bg-lavender/40', border: 'border-lavender', shadow: 'shadow-sticker-lavender' },
  home: { bg: 'bg-warm', border: 'border-accent', shadow: 'shadow-sticker-accent' },
};

interface EmeraldMapProps {
  onBuildingClick: (module: string) => void;
}

export const EmeraldMap: React.FC<EmeraldMapProps> = ({ onBuildingClick }) => {
  const dayPeriod = getDayPeriod();
  const [avatarError, setAvatarError] = useState(false);
  
  // Background colors based on day period
  const bgGradients = {
    morning: 'from-orange-300 via-yellow-200 to-matcha-light',
    day: 'from-blue-300 via-matcha-light to-green-300',
    evening: 'from-orange-400 via-warm to-salmon/50',
    night: 'from-indigo-900 via-purple-900 to-blue-900',
  };
  
  // Lístka greeting based on time
  const greetings = {
    morning: 'Dobré ránko! ☀️ Co dneska uděláme?',
    day: 'Dneska ti to krásně roste! 🌱',
    evening: 'Krásný podvečer! 🌅 Už jsi splnil/a dnešní návyky?',
    night: 'Dobrou noc! 🌙 Odpočiň si',
  };
  
  const textColor = dayPeriod === 'night' ? 'text-white' : 'text-text-dark';
  
  return (
    <div className={`relative w-full min-h-[60vh] md:min-h-[70vh] rounded-3xl overflow-hidden bg-gradient-to-br ${bgGradients[dayPeriod]} p-6 md:p-8`}>
      {/* Decorative elements */}
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
      
      {/* Lístka avatar with speech bubble floating at top center */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="relative">
          {/* Speech bubble */}
          <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-white rounded-3xl px-6 py-3 shadow-sticker-dark border-[3px] border-matcha-light whitespace-nowrap ${dayPeriod === 'night' ? 'bg-opacity-95' : ''}`}>
            <p className="text-sm md:text-base font-semibold text-matcha-dark">{greetings[dayPeriod]}</p>
            {/* Speech bubble tail */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-matcha-light"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-[14px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
            </div>
          </div>
          
          {/* Avatar */}
          <div 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-[3px] border-matcha-dark shadow-sticker-dark flex items-center justify-center animate-float"
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
      </div>
      
      {/* Period indicator */}
      <div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sticker border-[2px] border-matcha-light ${textColor} text-xs md:text-sm font-semibold z-10`}>
        {dayPeriod === 'morning' && '🌅 Ráno'}
        {dayPeriod === 'day' && '☀️ Den'}
        {dayPeriod === 'evening' && '🌅 Podvečer'}
        {dayPeriod === 'night' && '🌙 Noc'}
      </div>
      
      {/* Buildings Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {BUILDINGS.map((building) => {
          const colors = CATEGORY_COLORS[building.category];
          return (
            <button
              key={building.id}
              onClick={() => onBuildingClick(building.module)}
              className={`${colors.bg} ${colors.border} ${colors.shadow} border-[3px] rounded-3xl p-4 md:p-6 hover:scale-105 active:scale-95 transition-all duration-200 hover-wobble flex flex-col items-center justify-center min-h-[140px] md:min-h-[160px]`}
            >
              <div className="text-5xl md:text-6xl mb-3">
                {building.icon}
              </div>
              <p className="text-xs md:text-sm font-semibold text-matcha-dark text-center leading-tight">
                {building.name}
              </p>
            </button>
          );
        })}
      </div>
      
      {/* Welcome message */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
        <p className={`text-xl md:text-2xl font-bold ${dayPeriod === 'night' ? 'text-white' : 'text-matcha-dark'} drop-shadow-lg`}>
          Vesnice Emerald
        </p>
        <p className={`text-xs md:text-sm ${dayPeriod === 'night' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
          Klikni na budovu pro vstup
        </p>
      </div>
    </div>
  );
};
