import React from 'react';
import { getDayPeriod } from '../../utils/helpers';

interface Building {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  module: string;
}

const BUILDINGS: Building[] = [
  { id: 'tasks', name: 'Nástěnka u studny', icon: '📋', x: 20, y: 30, module: 'tasks' },
  { id: 'calendar', name: 'Rozhledna', icon: '📅', x: 75, y: 20, module: 'calendar' },
  { id: 'finance', name: 'Strom moudrosti', icon: '💰', x: 50, y: 15, module: 'finance' },
  { id: 'food', name: 'Kuchyňka', icon: '🍳', x: 30, y: 60, module: 'food' },
  { id: 'diary', name: 'Tajný deníček', icon: '📝', x: 70, y: 65, module: 'diary' },
  { id: 'habits', name: 'Tréninková loučka', icon: '🏋️', x: 15, y: 75, module: 'habits' },
  { id: 'learning', name: 'Jeskyně poznání', icon: '⛰️', x: 85, y: 50, module: 'learning' },
  { id: 'home', name: 'Chaloupka', icon: '🏡', x: 45, y: 45, module: 'home' },
  { id: 'health', name: 'Bylinkářka', icon: '🌸', x: 60, y: 75, module: 'health' },
  { id: 'relationships', name: 'Poštovní budka', icon: '👥', x: 35, y: 25, module: 'relationships' },
  { id: 'insurance', name: 'Strážní věž', icon: '🛡️', x: 80, y: 80, module: 'insurance' },
  { id: 'travel', name: 'Cestovatelský kůl', icon: '🧳', x: 25, y: 50, module: 'travel' },
];

interface EmeraldMapProps {
  onBuildingClick: (module: string) => void;
}

export const EmeraldMap: React.FC<EmeraldMapProps> = ({ onBuildingClick }) => {
  const dayPeriod = getDayPeriod();
  const [hoveredBuilding, setHoveredBuilding] = React.useState<string | null>(null);
  
  // Background colors based on day period
  const bgGradients = {
    morning: 'from-orange-200 via-yellow-100 to-matcha-light',
    day: 'from-blue-200 via-matcha-light to-green-200',
    evening: 'from-orange-300 via-warm to-matcha-light',
    night: 'from-indigo-900 via-purple-900 to-blue-900',
  };
  
  const textColor = dayPeriod === 'night' ? 'text-white' : 'text-text-dark';
  
  return (
    <div className={`relative w-full h-[600px] rounded-kawaii overflow-hidden bg-gradient-to-br ${bgGradients[dayPeriod]} shadow-xl`}>
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Trees */}
        <div className="absolute left-[10%] top-[40%] text-6xl animate-pulse" style={{ animationDuration: '4s' }}>
          🌲
        </div>
        <div className="absolute right-[15%] top-[30%] text-5xl animate-pulse" style={{ animationDuration: '5s' }}>
          🌳
        </div>
        <div className="absolute left-[5%] bottom-[20%] text-5xl animate-pulse" style={{ animationDuration: '6s' }}>
          🌲
        </div>
        
        {/* Stars at night */}
        {dayPeriod === 'night' && (
          <>
            <div className="absolute left-[20%] top-[10%] text-2xl animate-pulse">⭐</div>
            <div className="absolute right-[30%] top-[15%] text-xl animate-pulse">✨</div>
            <div className="absolute left-[60%] top-[8%] text-2xl animate-pulse">⭐</div>
            <div className="absolute right-[10%] top-[20%] text-xl animate-pulse">✨</div>
          </>
        )}
        
        {/* Sun/Moon */}
        <div className="absolute right-[10%] top-[10%] text-5xl">
          {dayPeriod === 'night' ? '🌙' : '☀️'}
        </div>
      </div>
      
      {/* Buildings */}
      {BUILDINGS.map((building) => (
        <div
          key={building.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
          style={{
            left: `${building.x}%`,
            top: `${building.y}%`,
            transform: hoveredBuilding === building.id ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => setHoveredBuilding(building.id)}
          onMouseLeave={() => setHoveredBuilding(null)}
          onClick={() => onBuildingClick(building.module)}
        >
          <div className="relative">
            {/* Building icon */}
            <div className={`text-6xl ${hoveredBuilding === building.id ? 'drop-shadow-2xl' : ''}`}>
              {building.icon}
            </div>
            
            {/* Tooltip on hover */}
            {hoveredBuilding === building.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-white rounded-kawaii shadow-lg whitespace-nowrap z-10">
                <p className="text-sm font-semibold text-matcha-dark">{building.name}</p>
              </div>
            )}
            
            {/* Glow effect on hover */}
            {hoveredBuilding === building.id && (
              <div className="absolute inset-0 bg-yellow-300 opacity-30 blur-xl rounded-full -z-10" />
            )}
          </div>
        </div>
      ))}
      
      {/* Listka Avatar */}
      <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce pointer-events-none" style={{ animationDuration: '3s' }}>
        🍃
      </div>
      
      {/* Period indicator */}
      <div className={`absolute top-4 left-4 px-4 py-2 rounded-kawaii bg-white bg-opacity-70 ${textColor}`}>
        <p className="text-sm font-medium">
          {dayPeriod === 'morning' && '🌅 Ráno'}
          {dayPeriod === 'day' && '☀️ Den'}
          {dayPeriod === 'evening' && '🌅 Podvečer'}
          {dayPeriod === 'night' && '🌙 Noc'}
        </p>
      </div>
      
      {/* Welcome message */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className={`text-xl font-bold ${dayPeriod === 'night' ? 'text-white' : 'text-matcha-dark'} drop-shadow-lg`}>
          Vesnice Emerald
        </p>
        <p className={`text-sm ${dayPeriod === 'night' ? 'text-gray-300' : 'text-gray-600'}`}>
          Klikni na budovu pro vstup
        </p>
      </div>
    </div>
  );
};
