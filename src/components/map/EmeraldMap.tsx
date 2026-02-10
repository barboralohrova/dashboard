import React, { useState } from 'react';
import { getDayPeriod } from '../../utils/helpers';
import { ListkaSprite } from './ListkaSprite';
import { ForestDecorations } from './ForestDecorations';
import { MapPaths } from './MapPaths';
import { TasksBuilding } from './buildings/TasksBuilding';
import { CalendarBuilding } from './buildings/CalendarBuilding';
import { FinanceBuilding } from './buildings/FinanceBuilding';
import { FoodBuilding } from './buildings/FoodBuilding';
import { DiaryBuilding } from './buildings/DiaryBuilding';
import { HabitsBuilding } from './buildings/HabitsBuilding';
import { LearningBuilding } from './buildings/LearningBuilding';
import { HomeBuilding } from './buildings/HomeBuilding';
import { HealthBuilding } from './buildings/HealthBuilding';
import { RelationshipsBuilding } from './buildings/RelationshipsBuilding';
import { InsuranceBuilding } from './buildings/InsuranceBuilding';
import { TravelBuilding } from './buildings/TravelBuilding';

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

// Map building ID to SVG component
const BUILDING_COMPONENTS: Record<string, React.FC<{ className?: string }>> = {
  tasks: TasksBuilding,
  calendar: CalendarBuilding,
  finance: FinanceBuilding,
  food: FoodBuilding,
  diary: DiaryBuilding,
  habits: HabitsBuilding,
  learning: LearningBuilding,
  home: HomeBuilding,
  health: HealthBuilding,
  relationships: RelationshipsBuilding,
  insurance: InsuranceBuilding,
  travel: TravelBuilding,
};

// Center point for Lístka's starting position
const LISTKA_START = { x: '50%', y: '50%' };

// Animation constants
const ANIMATION_DURATION_MS = 1200; // Time for Lístka to travel to a building
const ANIMATION_DURATION_CSS = '1.2s'; // CSS transition duration
const POSITION_RESET_DELAY_MS = 500; // Delay before resetting Lístka position after module change

interface EmeraldMapProps {
  onBuildingClick: (module: string) => void;
}

export const EmeraldMap: React.FC<EmeraldMapProps> = ({ onBuildingClick }) => {
  const dayPeriod = getDayPeriod();
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
      // Reset Lístka position after a brief delay
      setTimeout(() => setListkaPosition(LISTKA_START), POSITION_RESET_DELAY_MS);
    }, ANIMATION_DURATION_MS);
  };
  
  return (
    <div 
      className={`relative w-full min-h-[80vh] md:min-h-[90vh] rounded-3xl overflow-hidden bg-gradient-to-br ${bgGradients[dayPeriod]} p-4 md:p-6`}
      role="region"
      aria-label="Interaktivní lesní mapa"
    >
      {/* Forest decorations - trees, bushes, mushrooms, etc. */}
      <ForestDecorations dayPeriod={dayPeriod} />
      
      {/* SVG Paths connecting buildings */}
      <MapPaths buildings={BUILDINGS} centerX={50} centerY={50} />
      
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
      
      {/* Buildings - SVG illustrations organically positioned */}
      <div className="relative w-full h-full z-10">
        {BUILDINGS.map((building) => {
          const BuildingComponent = BUILDING_COMPONENTS[building.id];
          const isActive = animatingTo === building.id;
          
          return (
            <button
              key={building.id}
              onClick={() => handleBuildingClick(building)}
              disabled={!!animatingTo}
              aria-label={`Přejít do modulu ${building.name}`}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 hover:z-30 active:scale-95 ${
                animatingTo && !isActive ? 'opacity-50' : ''
              } ${isActive ? 'scale-105 z-30' : 'hover-wobble'}`}
              style={{
                left: building.position.x,
                top: building.position.y,
              }}
            >
              {/* SVG Building illustration */}
              <div className="w-20 h-24 md:w-28 md:h-32 lg:w-32 lg:h-36 drop-shadow-lg">
                {BuildingComponent && <BuildingComponent className="w-full h-full" />}
              </div>
              
              {/* Building name label */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border-2 border-matcha-light whitespace-nowrap">
                <p className="text-[10px] md:text-xs font-bold text-matcha-dark">
                  {building.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Lístka avatar - Animated SVG character */}
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        style={{
          left: listkaPosition.x,
          top: listkaPosition.y,
          transition: `left ${ANIMATION_DURATION_CSS} ease-in-out, top ${ANIMATION_DURATION_CSS} ease-in-out`,
        }}
      >
        <div className="relative">
          {/* Speech bubble - hide when animating */}
          {!animatingTo && (
            <div className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 
                          rounded-3xl px-5 py-2 shadow-sticker-dark border-[3px] border-matcha-light 
                          whitespace-nowrap bg-white">
              <p className="text-xs md:text-sm font-semibold text-matcha-dark">{greetings[dayPeriod]}</p>
              {/* Speech bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[3px]">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-matcha-light"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-[12px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
              </div>
            </div>
          )}
          
          {/* Lístka SVG sprite with floating animation */}
          <div className="w-20 h-20 md:w-28 md:h-28 animate-float drop-shadow-xl">
            <ListkaSprite className="w-full h-full" showOrb={!animatingTo} />
          </div>
        </div>
      </div>
    </div>
  );
};
