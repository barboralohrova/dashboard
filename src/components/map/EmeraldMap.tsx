import React, { useState } from 'react';
import { getDayPeriod } from '../../utils/helpers';

interface Building {
  id: string;
  name: string;
  icon: string;
  module: string;
  category: 'tasks' | 'finance' | 'food' | 'personal' | 'travel' | 'home';
  position: { x: string; y: string };
}

const BUILDINGS: Building[] = [
  { id: 'tasks', name: 'Nástěnka u studny', icon: '📋', module: 'tasks', category: 'tasks', position: { x: '15%', y: '20%' } },
  { id: 'calendar', name: 'Rozhledna', icon: '📅', module: 'calendar', category: 'tasks', position: { x: '75%', y: '15%' } },
  { id: 'finance', name: 'Strom moudrosti', icon: '💰', module: 'finance', category: 'finance', position: { x: '25%', y: '50%' } },
  { id: 'food', name: 'Kuchyňka', icon: '🍳', module: 'food', category: 'food', position: { x: '65%', y: '45%' } },
  { id: 'diary', name: 'Tajný deníček', icon: '📝', module: 'diary', category: 'personal', position: { x: '45%', y: '25%' } },
  { id: 'habits', name: 'Tréninková loučka', icon: '🏋️', module: 'habits', category: 'home', position: { x: '10%', y: '65%' } },
  { id: 'learning', name: 'Jeskyně poznání', icon: '⛰️', module: 'learning', category: 'home', position: { x: '80%', y: '65%' } },
  { id: 'home', name: 'Chaloupka', icon: '🏡', module: 'home', category: 'home', position: { x: '55%', y: '75%' } },
  { id: 'health', name: 'Bylinkářka', icon: '🌸', module: 'health', category: 'food', position: { x: '35%', y: '70%' } },
  { id: 'relationships', name: 'Poštovní budka', icon: '👥', module: 'relationships', category: 'personal', position: { x: '70%', y: '30%' } },
  { id: 'insurance', name: 'Strážní věž', icon: '🛡️', module: 'insurance', category: 'travel', position: { x: '20%', y: '35%' } },
  { id: 'travel', name: 'Cestovatelský kůl', icon: '🧳', module: 'travel', category: 'travel', position: { x: '85%', y: '50%' } },
];

const CATEGORY_COLORS = {
  tasks: { bg: 'bg-blue-50', border: 'border-blue-200', shadow: 'shadow-[4px_4px_0px_#BFDBFE]' },
  finance: { bg: 'bg-lemon', border: 'border-yellow-300', shadow: 'shadow-[4px_4px_0px_#FDE68A]' },
  food: { bg: 'bg-matcha-light', border: 'border-matcha-dark', shadow: 'shadow-sticker-dark' },
  personal: { bg: 'bg-salmon/40', border: 'border-salmon', shadow: 'shadow-sticker-salmon' },
  travel: { bg: 'bg-lavender/40', border: 'border-lavender', shadow: 'shadow-sticker-lavender' },
  home: { bg: 'bg-warm', border: 'border-accent', shadow: 'shadow-sticker-accent' },
};

// Center point for Lístka's starting position
const LISTKA_START = { x: '50%', y: '50%' };

interface EmeraldMapProps {
  onBuildingClick: (module: string) => void;
}

export const EmeraldMap: React.FC<EmeraldMapProps> = ({ onBuildingClick }) => {
  const dayPeriod = getDayPeriod();
  const [avatarError, setAvatarError] = useState(false);
  const [animatingTo, setAnimatingTo] = useState<string | null>(null);
  const [listkaPosition, setListkaPosition] = useState(LISTKA_START);
  
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
  
  const handleBuildingClick = (building: Building) => {
    if (animatingTo) return; // Prevent clicks during animation
    
    setAnimatingTo(building.id);
    setListkaPosition(building.position);
    
    // Wait for animation to complete before switching modules
    setTimeout(() => {
      onBuildingClick(building.module);
      setAnimatingTo(null);
      // Reset Lístka position
      setTimeout(() => setListkaPosition(LISTKA_START), 500);
    }, 1200); // Animation duration
  };
  
  return (
    <div className={`relative w-full min-h-[80vh] md:min-h-[90vh] rounded-3xl overflow-hidden bg-gradient-to-br ${bgGradients[dayPeriod]} p-4 md:p-6`}>
      {/* Forest background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Trees around the edges */}
        <div className="absolute left-2 top-10 text-4xl md:text-6xl animate-pulse opacity-30" style={{ animationDuration: '4s' }}>
          🌲
        </div>
        <div className="absolute right-2 top-10 text-4xl md:text-6xl animate-pulse opacity-30" style={{ animationDuration: '5s' }}>
          🌳
        </div>
        <div className="absolute left-2 bottom-10 text-4xl md:text-6xl animate-pulse opacity-30" style={{ animationDuration: '6s' }}>
          🌲
        </div>
        <div className="absolute right-2 bottom-10 text-4xl md:text-6xl animate-pulse opacity-30" style={{ animationDuration: '5.5s' }}>
          🌳
        </div>
        
        {/* Additional forest elements */}
        <div className="absolute left-[12%] top-[40%] text-2xl opacity-40">🌿</div>
        <div className="absolute right-[15%] top-[55%] text-2xl opacity-40">🍄</div>
        <div className="absolute left-[30%] bottom-[20%] text-2xl opacity-40">🌺</div>
        <div className="absolute right-[35%] bottom-[25%] text-2xl opacity-40">🪨</div>
        <div className="absolute left-[60%] top-[35%] text-2xl opacity-40">🌻</div>
        <div className="absolute right-[25%] top-[70%] text-2xl opacity-40">🌿</div>
        
        {/* Stars at night */}
        {dayPeriod === 'night' && (
          <>
            <div className="absolute left-[20%] top-[8%] text-xl animate-pulse">⭐</div>
            <div className="absolute right-[25%] top-[12%] text-lg animate-pulse">✨</div>
            <div className="absolute left-[70%] top-[6%] text-xl animate-pulse">⭐</div>
            <div className="absolute right-[15%] top-[15%] text-lg animate-pulse">✨</div>
          </>
        )}
        
        {/* Sun/Moon */}
        <div className="absolute right-[8%] top-[5%] text-4xl md:text-5xl">
          {dayPeriod === 'night' ? '🌙' : '☀️'}
        </div>
      </div>
      
      {/* Period indicator */}
      <div className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sticker border-[2px] border-matcha-light ${textColor} text-xs md:text-sm font-semibold z-20`}>
        {dayPeriod === 'morning' && '🌅 Ráno'}
        {dayPeriod === 'day' && '☀️ Den'}
        {dayPeriod === 'evening' && '🌅 Podvečer'}
        {dayPeriod === 'night' && '🌙 Noc'}
      </div>
      
      {/* Welcome message at top */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-20">
        <p className={`text-xl md:text-2xl font-bold ${dayPeriod === 'night' ? 'text-white' : 'text-matcha-dark'} drop-shadow-lg`}>
          Vesnice Emerald
        </p>
        <p className={`text-xs md:text-sm ${dayPeriod === 'night' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
          Klikni na budovu pro vstup
        </p>
      </div>
      
      {/* SVG Paths - Forest walkways connecting buildings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.6 }}>
        <defs>
          <filter id="pathShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feFlood floodColor="#4B3621" floodOpacity="0.3"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Paths from center to each building */}
        {BUILDINGS.map((building, index) => {
          const startX = 50;
          const startY = 50;
          const endX = parseInt(building.position.x);
          const endY = parseInt(building.position.y);
          
          // Create curved path with stable randomization based on index
          const offset = (index % 2 === 0 ? 5 : -5);
          const controlX1 = (startX + endX) / 2 + offset;
          const controlY1 = (startY + endY) / 2 + offset;
          
          return (
            <path
              key={`path-${building.id}`}
              d={`M ${startX}% ${startY}% Q ${controlX1}% ${controlY1}%, ${endX}% ${endY}%`}
              stroke="#8B7355"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              filter="url(#pathShadow)"
              strokeDasharray="8,4"
            />
          );
        })}
      </svg>
      
      {/* Buildings - Organically positioned */}
      <div className="relative w-full h-full z-10">
        {BUILDINGS.map((building) => {
          const colors = CATEGORY_COLORS[building.category];
          return (
            <button
              key={building.id}
              onClick={() => handleBuildingClick(building)}
              disabled={!!animatingTo}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${colors.bg} ${colors.border} ${colors.shadow} border-[3px] rounded-3xl p-2 md:p-4 hover:scale-110 active:scale-95 transition-all duration-200 hover-wobble flex flex-col items-center justify-center min-w-[90px] min-h-[90px] md:min-w-[120px] md:min-h-[120px] ${animatingTo ? 'opacity-50' : ''}`}
              style={{
                left: building.position.x,
                top: building.position.y,
              }}
            >
              <div className="text-3xl md:text-5xl mb-1 md:mb-2">
                {building.icon}
              </div>
              <p className="text-[10px] md:text-sm font-semibold text-matcha-dark text-center leading-tight">
                {building.name}
              </p>
            </button>
          );
        })}
      </div>
      
      {/* Lístka avatar - Animated character */}
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-1000 ease-in-out"
        style={{
          left: listkaPosition.x,
          top: listkaPosition.y,
        }}
      >
        <div className="relative">
          {/* Speech bubble - hide on mobile or when animating */}
          {!animatingTo && (
            <div className={`hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 rounded-3xl px-5 py-2 shadow-sticker-dark border-[3px] border-matcha-light whitespace-nowrap ${
              dayPeriod === 'night' ? 'bg-white' : 'bg-white'
            }`}>
              <p className="text-xs md:text-sm font-semibold text-matcha-dark">{greetings[dayPeriod]}</p>
              {/* Speech bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[3px]">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-matcha-light"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-[12px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>
            </div>
          )}
          
          {/* Avatar with floating animation */}
          <div 
            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border-[3px] border-matcha-dark shadow-sticker-dark flex items-center justify-center animate-float"
          >
            {!avatarError ? (
              <img 
                src="/dashboard/listka-avatar.png" 
                alt="Lístka" 
                className="w-full h-full rounded-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="text-3xl md:text-5xl">🌿</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
