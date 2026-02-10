import React, { useState } from 'react';
import { getDayPeriod } from '../../utils/helpers';

interface Building {
  id: string;
  name: string;
  module: string;
  x: number;
  y: number;
}

const BUILDINGS: Building[] = [
  { id: 'tasks', name: 'Nástěnka u studny', module: 'tasks', x: 180, y: 200 },
  { id: 'calendar', name: 'Rozhledna', module: 'calendar', x: 900, y: 150 },
  { id: 'finance', name: 'Strom moudrosti', module: 'finance', x: 300, y: 450 },
  { id: 'food', name: 'Kuchyňka', module: 'food', x: 780, y: 400 },
  { id: 'diary', name: 'Tajný deníček', module: 'diary', x: 540, y: 250 },
  { id: 'habits', name: 'Tréninková loučka', module: 'habits', x: 120, y: 580 },
  { id: 'learning', name: 'Jeskyně poznání', module: 'learning', x: 960, y: 580 },
  { id: 'home', name: 'Chaloupka', module: 'home', x: 660, y: 670 },
  { id: 'health', name: 'Bylinkářka', module: 'health', x: 420, y: 630 },
  { id: 'relationships', name: 'Poštovní budka', module: 'relationships', x: 840, y: 300 },
  { id: 'insurance', name: 'Strážní věž', module: 'insurance', x: 240, y: 350 },
  { id: 'travel', name: 'Cestovatelský kůl', module: 'travel', x: 1020, y: 450 },
];

const LISTKA_CENTER_POSITION = { x: 600, y: 450 };
const ANIMATION_DURATION_MS = 1200;

interface EmeraldMapProps {
  onBuildingClick: (module: string) => void;
}

export const EmeraldMap: React.FC<EmeraldMapProps> = ({ onBuildingClick }) => {
  const dayPeriod = getDayPeriod();
  const [animatingTo, setAnimatingTo] = useState<string | null>(null);
  const [listkaPosition, setListkaPosition] = useState(LISTKA_CENTER_POSITION);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  // Greetings based on day period
  const greetings = {
    morning: 'Dobré ránko! ☀️ Co dneska uděláme?',
    day: 'Dneska ti to krásně roste! 🌱',
    evening: 'Krásný podvečer! 🌅 Už jsi splnil/a dnešní návyky?',
    night: 'Dobrou noc! 🌙 Odpočiň si',
  };

  const handleBuildingClick = (building: Building) => {
    if (animatingTo) return;
    
    setAnimatingTo(building.id);
    setListkaPosition({ x: building.x, y: building.y });
    
    setTimeout(() => {
      onBuildingClick(building.module);
      setAnimatingTo(null);
      setTimeout(() => setListkaPosition(LISTKA_CENTER_POSITION), 500);
    }, ANIMATION_DURATION_MS);
  };

  // Safe building lookup helper
  const getBuildingById = (id: string): Building | undefined => {
    return BUILDINGS.find(b => b.id === id);
  };

  // Day period colors
  const isDark = dayPeriod === 'night';
  const isListkaIdle = !animatingTo; // Show orb and speech bubble when Lístka is idle
  const skyColors = {
    morning: ['#FF9966', '#FFD700', '#87CEEB'],
    day: ['#87CEEB', '#98D8C8', '#90EE90'],
    evening: ['#FF6B6B', '#FF8C42', '#FFA07A'],
    night: ['#191970', '#2F1B4D', '#1C1C44'],
  };

  const currentSky = skyColors[dayPeriod];

  return (
    <div className="relative w-full min-h-[80vh] md:min-h-[90vh] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200">
      {/* Period indicator */}
      <div className={`absolute top-4 left-4 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg border-2 z-50 ${
        isDark ? 'bg-purple-900/90 border-purple-400 text-white' : 'bg-white/90 border-emerald-400 text-emerald-900'
      } text-xs md:text-sm font-semibold`}>
        {dayPeriod === 'morning' && '🌅 Ráno'}
        {dayPeriod === 'day' && '☀️ Den'}
        {dayPeriod === 'evening' && '🌅 Podvečer'}
        {dayPeriod === 'night' && '🌙 Noc'}
      </div>

      {/* Welcome message */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-50">
        <p className={`text-xl md:text-2xl font-bold drop-shadow-lg ${isDark ? 'text-white' : 'text-emerald-900'}`}>
          Vesnice Emerald
        </p>
        <p className={`text-xs md:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Klikni na budovu pro vstup
        </p>
      </div>

      {/* Main SVG - Isometric Forest Map */}
      <svg
        viewBox="0 0 1200 900"
        className="w-full h-full"
        style={{
          transform: 'perspective(1200px) rotateX(15deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Define gradients and patterns */}
        <defs>
          {/* Sky gradient */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={currentSky[0]} />
            <stop offset="50%" stopColor={currentSky[1]} />
            <stop offset="100%" stopColor={currentSky[2]} />
          </linearGradient>

          {/* Grass pattern */}
          <pattern id="grassPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#7CB342" />
            <circle cx="5" cy="5" r="1" fill="#689F38" />
            <circle cx="15" cy="12" r="1" fill="#689F38" />
            <circle cx="25" cy="8" r="1" fill="#689F38" />
            <circle cx="35" cy="15" r="1" fill="#689F38" />
            <circle cx="10" cy="25" r="1" fill="#689F38" />
            <circle cx="30" cy="30" r="1" fill="#689F38" />
          </pattern>

          {/* Wood texture */}
          <pattern id="woodPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#8B4513" />
            <line x1="0" y1="5" x2="20" y2="5" stroke="#704214" strokeWidth="0.5" />
            <line x1="0" y1="15" x2="20" y2="15" stroke="#704214" strokeWidth="0.5" />
          </pattern>

          {/* Stone texture */}
          <pattern id="stonePattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="#A8A29E" />
            <polygon points="2,2 12,2 12,12 2,12" fill="#78716C" opacity="0.3" />
            <polygon points="15,5 25,5 25,15 15,15" fill="#78716C" opacity="0.3" />
            <polygon points="5,18 15,18 15,28 5,28" fill="#78716C" opacity="0.3" />
          </pattern>

          {/* Glow filter for hover */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Sky/Background */}
        <rect width="1200" height="900" fill="url(#skyGradient)" />

        {/* Ground - Forest floor */}
        <ellipse cx="600" cy="700" rx="550" ry="200" fill="url(#grassPattern)" opacity="0.9" />
        <ellipse cx="600" cy="700" rx="500" ry="180" fill="#8BC34A" opacity="0.5" />

        {/* Background trees (far) */}
        <g opacity={isDark ? "0.4" : "0.6"}>
          <ellipse cx="100" cy="300" rx="50" ry="60" fill="#2E7D32" />
          <ellipse cx="200" cy="280" rx="60" ry="70" fill="#388E3C" />
          <ellipse cx="1000" cy="290" rx="55" ry="65" fill="#2E7D32" />
          <ellipse cx="1100" cy="310" rx="50" ry="60" fill="#388E3C" />
        </g>

        {/* Stream */}
        <path
          d="M 0,500 Q 200,480 400,500 T 800,480 L 1200,490"
          fill="none"
          stroke={isDark ? "#4A90E2" : "#64B5F6"}
          strokeWidth="15"
          opacity="0.6"
        />
        <path
          d="M 0,500 Q 200,480 400,500 T 800,480 L 1200,490"
          fill="none"
          stroke="white"
          strokeWidth="8"
          opacity="0.3"
        />

        {/* Paths connecting buildings */}
        <g opacity="0.7">
          <path d="M 600,450 L 180,200" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 900,150" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 300,450" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 780,400" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 540,250" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 120,580" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 960,580" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 660,670" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 420,630" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 840,300" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 240,350" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 600,450 L 1020,450" stroke="#8D6E63" strokeWidth="8" fill="none" strokeLinecap="round" />
        </g>

        {/* Decorative elements - Mushrooms */}
        <g opacity={isDark ? "0.6" : "0.8"}>
          <g transform="translate(450, 550)">
            <ellipse cx="0" cy="5" rx="8" ry="3" fill="#D4C5B9" />
            <ellipse cx="0" cy="0" rx="10" ry="6" fill="#E57373" />
            <circle cx="-3" cy="-1" r="2" fill="#FFCDD2" opacity="0.7" />
            <circle cx="3" cy="1" r="1.5" fill="#FFCDD2" opacity="0.7" />
          </g>
          <g transform="translate(750, 620)">
            <ellipse cx="0" cy="4" rx="6" ry="2" fill="#D4C5B9" />
            <ellipse cx="0" cy="0" rx="8" ry="5" fill="#FFB74D" />
            <circle cx="-2" cy="-1" r="1.5" fill="#FFE0B2" opacity="0.7" />
          </g>
        </g>

        {/* Decorative elements - Flowers */}
        <g opacity={isDark ? "0.5" : "0.9"}>
          <g transform="translate(350, 520)">
            <circle cx="0" cy="0" r="3" fill="#E91E63" />
            <circle cx="-4" cy="-4" r="2" fill="#F06292" />
            <circle cx="4" cy="-4" r="2" fill="#F06292" />
            <circle cx="-4" cy="4" r="2" fill="#F06292" />
            <circle cx="4" cy="4" r="2" fill="#F06292" />
          </g>
          <g transform="translate(850, 540)">
            <circle cx="0" cy="0" r="2.5" fill="#9C27B0" />
            <circle cx="-3" cy="-3" r="1.5" fill="#BA68C8" />
            <circle cx="3" cy="-3" r="1.5" fill="#BA68C8" />
            <circle cx="-3" cy="3" r="1.5" fill="#BA68C8" />
            <circle cx="3" cy="3" r="1.5" fill="#BA68C8" />
          </g>
        </g>

        {/* BUILDINGS START - Each building is a detailed isometric SVG group */}

        {/* 1. Tasks Building - Stone Well with Bulletin Board */}
        <g
          onClick={() => {
            const building = getBuildingById('tasks');
            if (building) handleBuildingClick(building);
          }}
          onMouseEnter={() => setHoveredBuilding('tasks')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'tasks' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'tasks' ? 0.5 : 1}
        >
          {/* Well base shadow */}
          <ellipse cx="180" cy="240" rx="35" ry="10" fill="#000" opacity="0.2" />
          {/* Well cylinder - front */}
          <polygon points="160,210 200,210 200,230 160,230" fill="#A8A29E" stroke="#78716C" strokeWidth="1.5" />
          {/* Well cylinder - side */}
          <polygon points="200,210 215,200 215,220 200,230" fill="#8B8680" stroke="#78716C" strokeWidth="1.5" />
          {/* Well top */}
          <polygon points="160,210 200,210 215,200 175,200" fill="#D4C5B9" stroke="#78716C" strokeWidth="1.5" />
          {/* Stone texture lines */}
          <line x1="160" y1="215" x2="200" y2="215" stroke="#78716C" strokeWidth="1" opacity="0.5" />
          <line x1="160" y1="220" x2="200" y2="220" stroke="#78716C" strokeWidth="1" opacity="0.5" />
          <line x1="160" y1="225" x2="200" y2="225" stroke="#78716C" strokeWidth="1" opacity="0.5" />
          {/* Wooden roof posts */}
          <rect x="165" y="180" width="4" height="30" fill="#704214" stroke="#4B3621" strokeWidth="0.8" />
          <rect x="195" y="180" width="4" height="30" fill="#704214" stroke="#4B3621" strokeWidth="0.8" />
          {/* Roof */}
          <polygon points="180,165 150,185 210,185" fill="#8B4513" stroke="#4B3621" strokeWidth="1.5" />
          <polygon points="180,165 210,185 225,175 195,155" fill="#A0522D" stroke="#4B3621" strokeWidth="1.5" />
          {/* Bulletin board */}
          <rect x="155" y="175" width="20" height="25" fill="#D2691E" stroke="#8B4513" strokeWidth="1" />
          <rect x="157" y="178" width="4" height="5" fill="#FFF" opacity="0.9" />
          <rect x="163" y="178" width="4" height="5" fill="#FFE4B5" opacity="0.9" />
          <rect x="157" y="185" width="4" height="5" fill="#FFB6C1" opacity="0.9" />
          <rect x="163" y="185" width="4" height="5" fill="#E0FFFF" opacity="0.9" />
          {/* Bucket */}
          <ellipse cx="180" cy="225" rx="5" ry="3" fill="#8B7355" stroke="#4B3621" strokeWidth="0.8" />
          <rect x="175" y="225" width="10" height="8" fill="#A0826D" stroke="#4B3621" strokeWidth="0.8" />
          {/* Building label */}
          <g>
            <rect x="140" y="245" width="80" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="180" y="255" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Nástěnka</text>
          </g>
        </g>

        {/* 2. Calendar Building - Watchtower in Tree */}
        <g
          onClick={() => { const building = getBuildingById("calendar"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('calendar')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'calendar' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'calendar' ? 0.5 : 1}
        >
          {/* Tree trunk */}
          <polygon points="890,180 910,180 920,230 880,230" fill="#5D4037" stroke="#3E2723" strokeWidth="1.5" />
          <polygon points="910,180 920,175 930,225 920,230" fill="#4E342E" stroke="#3E2723" strokeWidth="1.5" />
          {/* Tree crown */}
          <ellipse cx="900" cy="140" rx="40" ry="45" fill="#4CAF50" opacity="0.9" />
          <ellipse cx="905" cy="145" rx="35" ry="40" fill="#66BB6A" opacity="0.8" />
          <ellipse cx="895" cy="138" rx="30" ry="35" fill="#81C784" opacity="0.7" />
          {/* Platform - front */}
          <polygon points="880,170 920,170 920,175 880,175" fill="#8B4513" stroke="#4B3621" strokeWidth="1.2" />
          {/* Platform - side */}
          <polygon points="920,170 935,163 935,168 920,175" fill="#704214" stroke="#4B3621" strokeWidth="1.2" />
          {/* Platform - top */}
          <polygon points="880,170 920,170 935,163 895,163" fill="#A0522D" stroke="#4B3621" strokeWidth="1.2" />
          {/* Railing */}
          <line x1="882" y1="165" x2="882" y2="170" stroke="#8B4513" strokeWidth="1.5" />
          <line x1="890" y1="165" x2="890" y2="170" stroke="#8B4513" strokeWidth="1.5" />
          <line x1="900" y1="165" x2="900" y2="170" stroke="#8B4513" strokeWidth="1.5" />
          <line x1="910" y1="165" x2="910" y2="170" stroke="#8B4513" strokeWidth="1.5" />
          <line x1="918" y1="165" x2="918" y2="170" stroke="#8B4513" strokeWidth="1.5" />
          {/* Roof */}
          <polygon points="900,145 870,165 930,165" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1.2" />
          <polygon points="900,145 930,165 945,158 915,138" fill="#E57373" stroke="#B71C1C" strokeWidth="1.2" />
          {/* Flag */}
          <line x1="900" y1="145" x2="900" y2="120" stroke="#4B3621" strokeWidth="2" />
          <polygon points="900,125 915,128 900,131" fill="#FFC107" />
          {/* Building label */}
          <g>
            <rect x="860" y="235" width="80" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="900" y="245" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Rozhledna</text>
          </g>
        </g>

        {/* 3. Finance Building - Wisdom Tree */}
        <g
          onClick={() => { const building = getBuildingById("finance"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('finance')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'finance' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'finance' ? 0.5 : 1}
        >
          {/* Massive trunk with door */}
          <polygon points="280,470 320,470 330,530 270,530" fill="#6D4C41" stroke="#3E2723" strokeWidth="2" />
          <polygon points="320,470 340,465 350,525 330,530" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />
          {/* Door in trunk */}
          <ellipse cx="300" cy="510" rx="10" ry="15" fill="#3E2723" stroke="#1B1B1B" strokeWidth="1" />
          <circle cx="305" cy="510" r="1.5" fill="#FFD700" />
          {/* Tree texture */}
          <path d="M 285,480 Q 290,485 285,490" stroke="#4E342E" strokeWidth="1" fill="none" />
          <path d="M 315,485 Q 320,490 315,495" stroke="#4E342E" strokeWidth="1" fill="none" />
          {/* Crown */}
          <ellipse cx="305" cy="430" rx="50" ry="55" fill="#388E3C" opacity="0.9" />
          <ellipse cx="310" cy="435" rx="45" ry="50" fill="#4CAF50" opacity="0.8" />
          <ellipse cx="300" cy="428" rx="40" ry="45" fill="#66BB6A" opacity="0.7" />
          {/* Hanging coins */}
          <circle cx="290" cy="445" r="4" fill="#FFD700" stroke="#FFA000" strokeWidth="0.8" />
          <line x1="290" y1="435" x2="290" y2="441" stroke="#8B7355" strokeWidth="0.8" />
          <circle cx="310" cy="450" r="4" fill="#FFD700" stroke="#FFA000" strokeWidth="0.8" />
          <line x1="310" y1="440" x2="310" y2="446" stroke="#8B7355" strokeWidth="0.8" />
          <circle cx="325" cy="443" r="3.5" fill="#FFD700" stroke="#FFA000" strokeWidth="0.8" />
          <line x1="325" y1="435" x2="325" y2="439" stroke="#8B7355" strokeWidth="0.8" />
          {/* Money bag */}
          <ellipse cx="340" cy="525" rx="8" ry="10" fill="#8B7355" stroke="#4B3621" strokeWidth="1" />
          <circle cx="340" cy="520" r="6" fill="#A0826D" stroke="#4B3621" strokeWidth="1" />
          <line x1="338" y1="517" x2="342" y2="517" stroke="#4B3621" strokeWidth="1.5" />
          {/* Cellar door */}
          <polygon points="260,530 280,530 282,537 258,537" fill="#4E342E" stroke="#3E2723" strokeWidth="1" />
          <rect x="265" y="532" width="8" height="4" fill="#5D4037" />
          {/* Building label */}
          <g>
            <rect x="260" y="540" width="90" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="305" y="550" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Strom moudrosti</text>
          </g>
        </g>

        {/* 4. Food Building - Kitchen Hut */}
        <g
          onClick={() => { const building = getBuildingById("food"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('food')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'food' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'food' ? 0.5 : 1}
        >
          {/* Hut - front wall */}
          <polygon points="760,410 800,410 800,440 760,440" fill="#8B7355" stroke="#4B3621" strokeWidth="1.5" />
          {/* Hut - side wall */}
          <polygon points="800,410 820,400 820,430 800,440" fill="#6F5F4F" stroke="#4B3621" strokeWidth="1.5" />
          {/* Hut - roof front */}
          <polygon points="750,405 810,405 810,395 750,395" fill="#A0522D" stroke="#4B3621" strokeWidth="1.5" />
          {/* Hut - roof side */}
          <polygon points="810,405 830,395 830,385 810,395" fill="#8B4513" stroke="#4B3621" strokeWidth="1.5" />
          {/* Roof shingles */}
          <line x1="755" y1="398" x2="805" y2="398" stroke="#704214" strokeWidth="1" />
          <line x1="755" y1="401" x2="805" y2="401" stroke="#704214" strokeWidth="1" />
          {/* Door */}
          <rect x="775" y="420" width="10" height="18" fill="#4E342E" stroke="#3E2723" strokeWidth="0.8" />
          {/* Window */}
          <rect x="765" y="418" width="7" height="7" fill="#87CEEB" stroke="#4B3621" strokeWidth="0.8" opacity="0.8" />
          {/* Shelter - front */}
          <line x1="750" y1="430" x2="750" y2="445" stroke="#704214" strokeWidth="3" />
          <line x1="735" y1="430" x2="735" y2="445" stroke="#704214" strokeWidth="3" />
          {/* Shelter roof */}
          <polygon points="725,430 755,430 755,425 725,425" fill="#8B4513" stroke="#4B3621" strokeWidth="1.2" />
          {/* Hearth */}
          <ellipse cx="740" cy="450" rx="10" ry="5" fill="#5D4E37" />
          <circle cx="735" cy="448" r="3" fill="#8B8680" />
          <circle cx="740" cy="447" r="3" fill="#8B8680" />
          <circle cx="745" cy="448" r="3" fill="#8B8680" />
          {/* Fire */}
          <polygon points="740,443 737,448 743,448" fill="#FF6B35" opacity="0.8" />
          <polygon points="740,440 738,445 742,445" fill="#FFA500" opacity="0.9" />
          <polygon points="740,437 739,442 741,442" fill="#FFFF00" opacity="0.7" />
          {/* Cauldron */}
          <ellipse cx="740" cy="443" rx="5" ry="3" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="0.8" />
          <path d="M 735,443 Q 740,450 745,443" stroke="#2C2C2C" strokeWidth="1.5" fill="none" />
          {/* Hanging pots */}
          <circle cx="745" cy="432" r="3" fill="#B8860B" stroke="#8B6914" strokeWidth="0.6" />
          <line x1="745" y1="428" x2="745" y2="429" stroke="#4B3621" strokeWidth="0.8" />
          {/* Chimney smoke */}
          <ellipse cx="808" cy="390" rx="3" ry="5" fill="#B0B0B0" opacity="0.6" />
          <ellipse cx="810" cy="383" rx="4" ry="6" fill="#B0B0B0" opacity="0.5" />
          <ellipse cx="812" cy="375" rx="5" ry="7" fill="#B0B0B0" opacity="0.4" />
          {/* Building label */}
          <g>
            <rect x="740" y="455" width="80" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="780" y="465" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Kuchyňka</text>
          </g>
        </g>

        {/* 5. Diary Building - Secret Chest */}
        <g
          onClick={() => { const building = getBuildingById("diary"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('diary')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'diary' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'diary' ? 0.5 : 1}
        >
          {/* Tree providing shade */}
          <polygon points="530,240 545,240 548,270 527,270" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
          <ellipse cx="537" cy="225" rx="25" ry="28" fill="#4CAF50" opacity="0.8" />
          <ellipse cx="540" cy="227" rx="20" ry="23" fill="#66BB6A" opacity="0.7" />
          {/* Chest - front */}
          <polygon points="540,265 580,265 580,285 540,285" fill="#8B4513" stroke="#4B3621" strokeWidth="1.5" />
          {/* Chest - side */}
          <polygon points="580,265 595,258 595,278 580,285" fill="#704214" stroke="#4B3621" strokeWidth="1.5" />
          {/* Chest - top (open) */}
          <polygon points="540,265 580,265 595,258 555,258" fill="#A0522D" stroke="#4B3621" strokeWidth="1.5" />
          {/* Metal bands */}
          <rect x="542" y="270" width="36" height="2" fill="#4A4A4A" />
          <rect x="542" y="278" width="36" height="2" fill="#4A4A4A" />
          {/* Lock */}
          <rect x="558" y="274" width="4" height="5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.6" />
          <circle cx="560" cy="276" r="1" fill="#8B6914" />
          {/* Glow from inside */}
          <ellipse cx="567" cy="268" rx="15" ry="5" fill="#FFD700" opacity="0.5" />
          <ellipse cx="567" cy="267" rx="12" ry="4" fill="#FFF" opacity="0.4" />
          {/* Moss on chest */}
          <ellipse cx="545" cy="284" rx="4" ry="2" fill="#4CAF50" opacity="0.7" />
          <ellipse cx="575" cy="283" rx="3" ry="1.5" fill="#4CAF50" opacity="0.7" />
          {/* Flowers nearby */}
          <circle cx="530" cy="285" r="2" fill="#E91E63" />
          <circle cx="535" cy="287" r="1.5" fill="#F06292" />
          <circle cx="590" cy="280" r="2" fill="#9C27B0" />
          {/* Falling leaves */}
          <ellipse cx="550" cy="250" rx="2" ry="3" fill="#CDDC39" opacity="0.7" transform="rotate(30 550 250)" />
          <ellipse cx="570" cy="255" rx="2" ry="3" fill="#FFC107" opacity="0.7" transform="rotate(-20 570 255)" />
          {/* Building label */}
          <g>
            <rect x="500" y="290" width="90" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="545" y="300" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Tajný deníček</text>
          </g>
        </g>

        {/* 6. Habits Building - Training Meadow */}
        <g
          onClick={() => { const building = getBuildingById("habits"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('habits')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'habits' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'habits' ? 0.5 : 1}
        >
          {/* Meadow circle */}
          <ellipse cx="120" cy="600" rx="45" ry="20" fill="#9CCC65" opacity="0.5" />
          {/* Log bench - front */}
          <rect x="100" y="595" width="40" height="8" fill="#8B7355" stroke="#4B3621" strokeWidth="1.2" rx="2" />
          {/* Log bench - side */}
          <polygon points="140,595 145,592 145,600 140,603" fill="#6F5F4F" stroke="#4B3621" strokeWidth="1.2" />
          {/* Log bench - top */}
          <polygon points="100,595 140,595 145,592 105,592" fill="#A0826D" stroke="#4B3621" strokeWidth="1.2" />
          {/* Wood rings */}
          <circle cx="105" cy="595" r="2" fill="none" stroke="#4B3621" strokeWidth="0.5" />
          <circle cx="135" cy="595" r="2" fill="none" stroke="#4B3621" strokeWidth="0.5" />
          {/* Weights - left */}
          <rect x="90" y="600" width="3" height="12" fill="#704214" />
          <circle cx="91.5" cy="602" r="4" fill="#6F5F4F" stroke="#4B3621" strokeWidth="0.8" />
          <circle cx="91.5" cy="610" r="4" fill="#6F5F4F" stroke="#4B3621" strokeWidth="0.8" />
          {/* Weights - right */}
          <rect x="147" y="600" width="3" height="12" fill="#704214" />
          <circle cx="148.5" cy="602" r="4" fill="#6F5F4F" stroke="#4B3621" strokeWidth="0.8" />
          <circle cx="148.5" cy="610" r="4" fill="#6F5F4F" stroke="#4B3621" strokeWidth="0.8" />
          {/* Target on tree */}
          <ellipse cx="100" cy="565" rx="2" ry="15" fill="#5D4037" opacity="0.5" />
          <circle cx="100" cy="570" r="10" fill="#FFF" stroke="#000" strokeWidth="1" />
          <circle cx="100" cy="570" r="7" fill="#E57373" />
          <circle cx="100" cy="570" r="4" fill="#FFF" />
          <circle cx="100" cy="570" r="1.5" fill="#E57373" />
          {/* Rope ladder hanging from tree */}
          <line x1="145" y1="565" x2="145" y2="590" stroke="#8B7355" strokeWidth="1.2" />
          <line x1="155" y1="565" x2="155" y2="590" stroke="#8B7355" strokeWidth="1.2" />
          <line x1="145" y1="570" x2="155" y2="570" stroke="#8B7355" strokeWidth="1" />
          <line x1="145" y1="577" x2="155" y2="577" stroke="#8B7355" strokeWidth="1" />
          <line x1="145" y1="584" x2="155" y2="584" stroke="#8B7355" strokeWidth="1" />
          {/* Stone border */}
          <circle cx="80" cy="605" r="3" fill="#8B8680" stroke="#5D5D5D" strokeWidth="0.6" />
          <circle cx="90" cy="615" r="2.5" fill="#8B8680" stroke="#5D5D5D" strokeWidth="0.6" />
          <circle cx="160" cy="608" r="3" fill="#8B8680" stroke="#5D5D5D" strokeWidth="0.6" />
          <circle cx="150" cy="617" r="2.5" fill="#8B8680" stroke="#5D5D5D" strokeWidth="0.6" />
          {/* Building label */}
          <g>
            <rect x="70" y="622" width="100" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="120" y="632" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Tréninková loučka</text>
          </g>
        </g>

        {/* 7. Learning Building - Knowledge Cave */}
        <g
          onClick={() => { const building = getBuildingById("learning"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('learning')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'learning' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'learning' ? 0.5 : 1}
        >
          {/* Rock formation - front */}
          <polygon points="940,600 980,600 990,640 930,640" fill="#78716C" stroke="#57534E" strokeWidth="2" />
          {/* Rock formation - side */}
          <polygon points="980,600 1000,590 1010,630 990,640" fill="#A8A29E" stroke="#57534E" strokeWidth="2" />
          {/* Rock formation - top */}
          <polygon points="930,600 980,600 1000,590 950,590" fill="#D4C5B9" stroke="#57534E" strokeWidth="2" />
          {/* Stone texture */}
          <polygon points="935,610 945,610 945,620 935,620" fill="#57534E" opacity="0.3" />
          <polygon points="950,615 960,615 960,625 950,625" fill="#57534E" opacity="0.3" />
          <polygon points="965,608 975,608 975,618 965,618" fill="#57534E" opacity="0.3" />
          {/* Cave entrance */}
          <ellipse cx="960" cy="625" rx="15" ry="20" fill="#1A1A1A" />
          <ellipse cx="960" cy="625" rx="12" ry="17" fill="#0A0908" />
          {/* Stalactites */}
          <polygon points="950,610 952,620 948,620" fill="#8B8680" />
          <polygon points="970,608 972,618 968,618" fill="#8B8680" />
          {/* Torches - left */}
          <rect x="940" y="618" width="2" height="15" fill="#4B3621" />
          <ellipse cx="941" cy="618" rx="3" ry="4" fill="#FF6B35" opacity="0.8" />
          <ellipse cx="941" cy="616" rx="2.5" ry="3" fill="#FFA500" opacity="0.9" />
          <ellipse cx="941" cy="614" rx="2" ry="2.5" fill="#FFFF00" opacity="0.7" />
          {/* Torches - right */}
          <rect x="978" y="615" width="2" height="15" fill="#4B3621" />
          <ellipse cx="979" cy="615" rx="3" ry="4" fill="#FF6B35" opacity="0.8" />
          <ellipse cx="979" cy="613" rx="2.5" ry="3" fill="#FFA500" opacity="0.9" />
          <ellipse cx="979" cy="611" rx="2" ry="2.5" fill="#FFFF00" opacity="0.7" />
          {/* Mysterious glow from cave */}
          <ellipse cx="960" cy="625" rx="18" ry="22" fill="#9CCC65" opacity="0.2" />
          <ellipse cx="960" cy="625" rx="15" ry="18" fill="#CDDC39" opacity="0.15" />
          {/* Moss on rocks */}
          <ellipse cx="935" cy="635" rx="5" ry="2" fill="#4CAF50" opacity="0.7" />
          <ellipse cx="985" cy="638" rx="4" ry="2" fill="#4CAF50" opacity="0.7" />
          {/* Building label */}
          <g>
            <rect x="915" y="645" width="90" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="960" y="655" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Jeskyně poznání</text>
          </g>
        </g>

        {/* 8. Home Building - Treehouse */}
        <g
          onClick={() => { const building = getBuildingById("home"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('home')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'home' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'home' ? 0.5 : 1}
        >
          {/* Tree trunk */}
          <polygon points="650,690 670,690 680,740 640,740" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />
          <polygon points="670,690 685,685 695,735 680,740" fill="#4E342E" stroke="#3E2723" strokeWidth="2" />
          {/* Tree roots */}
          <path d="M 640,740 Q 630,745 625,740" stroke="#4E342E" strokeWidth="2" fill="none" />
          <path d="M 680,740 Q 690,745 695,740" stroke="#4E342E" strokeWidth="2" fill="none" />
          {/* House - front wall */}
          <polygon points="640,680 680,680 680,710 640,710" fill="#D2B48C" stroke="#8B7355" strokeWidth="1.5" />
          {/* House - side wall */}
          <polygon points="680,680 700,670 700,700 680,710" fill="#BEA58D" stroke="#8B7355" strokeWidth="1.5" />
          {/* Roof - front */}
          <polygon points="630,680 690,680 690,665 630,665" fill="#C62828" stroke="#B71C1C" strokeWidth="1.5" />
          {/* Roof - side */}
          <polygon points="690,680 710,670 710,655 690,665" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1.5" />
          {/* Shingles */}
          <line x1="635" y1="670" x2="685" y2="670" stroke="#B71C1C" strokeWidth="0.8" />
          <line x1="635" y1="675" x2="685" y2="675" stroke="#B71C1C" strokeWidth="0.8" />
          {/* Door */}
          <rect x="655" y="692" width="10" height="16" fill="#8B4513" stroke="#4B3621" strokeWidth="0.8" />
          <circle cx="663" cy="700" r="1" fill="#FFD700" />
          {/* Windows */}
          <rect x="643" y="688" width="8" height="8" fill="#FFE082" stroke="#8B7355" strokeWidth="0.8" opacity="0.9" />
          <line x1="647" y1="688" x2="647" y2="696" stroke="#8B7355" strokeWidth="0.6" />
          <line x1="643" y1="692" x2="651" y2="692" stroke="#8B7355" strokeWidth="0.6" />
          <rect x="669" y="688" width="8" height="8" fill="#FFE082" stroke="#8B7355" strokeWidth="0.8" opacity="0.9" />
          <line x1="673" y1="688" x2="673" y2="696" stroke="#8B7355" strokeWidth="0.6" />
          <line x1="669" y1="692" x2="677" y2="692" stroke="#8B7355" strokeWidth="0.6" />
          {/* Balcony */}
          <polygon points="635,710 685,710 685,715 635,715" fill="#A0826D" stroke="#8B7355" strokeWidth="1" />
          <polygon points="685,710 705,700 705,705 685,715" fill="#8B7355" stroke="#8B7355" strokeWidth="1" />
          {/* Balcony railing */}
          <line x1="638" y1="705" x2="638" y2="710" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="648" y1="705" x2="648" y2="710" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="660" y1="705" x2="660" y2="710" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="672" y1="705" x2="672" y2="710" stroke="#8B7355" strokeWidth="1.5" />
          <line x1="682" y1="705" x2="682" y2="710" stroke="#8B7355" strokeWidth="1.5" />
          {/* Flower pots */}
          <rect x="637" y="711" width="4" height="3" fill="#8B4513" />
          <ellipse cx="639" cy="710" rx="2.5" ry="2" fill="#E91E63" />
          <circle cx="638" cy="709" r="0.8" fill="#F06292" />
          <circle cx="640" cy="709" r="0.8" fill="#F06292" />
          <rect x="679" y="711" width="4" height="3" fill="#8B4513" />
          <ellipse cx="681" cy="710" rx="2.5" ry="2" fill="#9C27B0" />
          <circle cx="680" cy="709" r="0.8" fill="#BA68C8" />
          <circle cx="682" cy="709" r="0.8" fill="#BA68C8" />
          {/* Ladder/stairs spiral */}
          <path d="M 630,710 L 640,715" stroke="#8B7355" strokeWidth="2" />
          <path d="M 632,720 L 642,725" stroke="#8B7355" strokeWidth="2" />
          <path d="M 634,730 L 644,735" stroke="#8B7355" strokeWidth="2" />
          {/* Tree crown */}
          <ellipse cx="660" cy="650" rx="35" ry="30" fill="#388E3C" opacity="0.8" />
          <ellipse cx="665" cy="655" rx="30" ry="25" fill="#4CAF50" opacity="0.7" />
          {/* Building label */}
          <g>
            <rect x="620" y="745" width="80" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="660" y="755" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Chaloupka</text>
          </g>
        </g>

        {/* 9. Health Building - Herbalist */}
        <g
          onClick={() => { const building = getBuildingById("health"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('health')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'health' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'health' ? 0.5 : 1}
        >
          {/* Small hut - front */}
          <polygon points="405,640 435,640 435,660 405,660" fill="#6F5F4F" stroke="#4B3621" strokeWidth="1.5" />
          {/* Hut - side */}
          <polygon points="435,640 450,633 450,653 435,660" fill="#5D4E3E" stroke="#4B3621" strokeWidth="1.5" />
          {/* Mossy roof - front */}
          <polygon points="400,640 440,640 440,630 400,630" fill="#689F38" stroke="#558B2F" strokeWidth="1.2" />
          {/* Roof - side */}
          <polygon points="440,640 455,633 455,623 440,630" fill="#7CB342" stroke="#558B2F" strokeWidth="1.2" />
          {/* Moss texture */}
          <circle cx="410" cy="634" r="2" fill="#4CAF50" opacity="0.7" />
          <circle cx="420" cy="636" r="1.5" fill="#4CAF50" opacity="0.7" />
          <circle cx="430" cy="633" r="2" fill="#4CAF50" opacity="0.7" />
          {/* Door */}
          <rect x="415" y="648" width="8" height="11" fill="#4E342E" stroke="#3E2723" strokeWidth="0.8" />
          {/* Window */}
          <rect x="427" y="648" width="5" height="5" fill="#FFE082" stroke="#4B3621" strokeWidth="0.6" opacity="0.8" />
          {/* Cart with herbs */}
          <rect x="390" y="658" width="12" height="6" fill="#8B7355" stroke="#4B3621" strokeWidth="0.8" />
          <circle cx="392" cy="664" r="2" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.6" />
          <circle cx="400" cy="664" r="2" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.6" />
          {/* Herbs in cart */}
          <ellipse cx="396" cy="656" rx="4" ry="3" fill="#7CB342" />
          <ellipse cx="398" cy="655" rx="3" ry="2" fill="#9C27B0" />
          <ellipse cx="394" cy="654" rx="3" ry="2" fill="#CDDC39" />
          {/* Cauldron with fire */}
          <ellipse cx="455" cy="660" rx="6" ry="3" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="0.8" />
          <path d="M 449,660 Q 455,668 461,660" stroke="#2C2C2C" strokeWidth="1.5" fill="none" />
          {/* Fire under cauldron */}
          <polygon points="455,663 452,667 458,667" fill="#FF6B35" opacity="0.8" />
          <polygon points="455,661 453,665 457,665" fill="#FFA500" opacity="0.9" />
          {/* Smoke */}
          <ellipse cx="455" cy="653" rx="3" ry="4" fill="#B0B0B0" opacity="0.5" />
          <ellipse cx="456" cy="648" rx="4" ry="5" fill="#B0B0B0" opacity="0.4" />
          {/* Drying herbs on string */}
          <line x1="405" y1="635" x2="450" y2="628" stroke="#8B7355" strokeWidth="0.8" />
          <rect x="415" y="633" width="2" height="4" fill="#7CB342" />
          <rect x="425" y="631" width="2" height="4" fill="#9C27B0" />
          <rect x="435" y="630" width="2" height="4" fill="#CDDC39" />
          {/* Trees around */}
          <ellipse cx="395" cy="635" rx="10" ry="12" fill="#4CAF50" opacity="0.6" />
          <ellipse cx="460" cy="630" rx="8" ry="10" fill="#4CAF50" opacity="0.6" />
          {/* Building label */}
          <g>
            <rect x="380" y="668" width="80" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="420" y="678" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Bylinkářka</text>
          </g>
        </g>

        {/* 10. Relationships Building - Mailbox with Owl */}
        <g
          onClick={() => { const building = getBuildingById("relationships"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('relationships')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'relationships' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'relationships' ? 0.5 : 1}
        >
          {/* Post */}
          <rect x="838" y="320" width="4" height="40" fill="#704214" stroke="#4B3621" strokeWidth="1" />
          {/* Mailbox - front */}
          <rect x="825" y="305" width="30" height="18" rx="2" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1.2" />
          {/* Mailbox - side */}
          <polygon points="855,305 865,300 865,318 855,323" fill="#C62828" stroke="#B71C1C" strokeWidth="1.2" />
          {/* Mailbox - top (curved) */}
          <ellipse cx="840" cy="305" rx="15" ry="4" fill="#E57373" stroke="#B71C1C" strokeWidth="1" />
          {/* Mailbox opening */}
          <rect x="830" y="312" width="20" height="8" fill="#1A1A1A" opacity="0.8" />
          {/* Carvings */}
          <circle cx="835" cy="318" r="1" fill="#FFCDD2" opacity="0.6" />
          <circle cx="845" cy="317" r="1" fill="#FFCDD2" opacity="0.6" />
          {/* Owl sitting on top */}
          <ellipse cx="840" cy="298" rx="5" ry="6" fill="#8B7355" stroke="#4B3621" strokeWidth="0.8" />
          {/* Owl head */}
          <circle cx="840" cy="295" r="4.5" fill="#A0826D" stroke="#4B3621" strokeWidth="0.8" />
          {/* Big eyes */}
          <circle cx="838" cy="295" r="2" fill="#FFF" stroke="#4B3621" strokeWidth="0.6" />
          <circle cx="838" cy="295" r="1" fill="#1A1A1A" />
          <circle cx="842" cy="295" r="2" fill="#FFF" stroke="#4B3621" strokeWidth="0.6" />
          <circle cx="842" cy="295" r="1" fill="#1A1A1A" />
          {/* Beak */}
          <polygon points="840,296 838,298 842,298" fill="#FFA500" />
          {/* Ear tufts */}
          <polygon points="836,292 835,289 837,291" fill="#8B7355" />
          <polygon points="844,292 845,289 843,291" fill="#8B7355" />
          {/* Wings */}
          <ellipse cx="835" cy="298" rx="2" ry="3" fill="#8B7355" opacity="0.8" />
          <ellipse cx="845" cy="298" rx="2" ry="3" fill="#8B7355" opacity="0.8" />
          {/* Flying letters */}
          <g opacity="0.8">
            <rect x="855" y="295" width="8" height="10" fill="#FFF" stroke="#BDBDBD" strokeWidth="0.6" />
            <line x1="857" y1="298" x2="861" y2="298" stroke="#BDBDBD" strokeWidth="0.4" />
            <line x1="857" y1="300" x2="861" y2="300" stroke="#BDBDBD" strokeWidth="0.4" />
          </g>
          <g opacity="0.7" transform="rotate(-15 825 310)">
            <rect x="820" y="305" width="7" height="9" fill="#FFF" stroke="#BDBDBD" strokeWidth="0.6" />
            <line x1="822" y1="308" x2="825" y2="308" stroke="#BDBDBD" strokeWidth="0.4" />
            <line x1="822" y1="310" x2="825" y2="310" stroke="#BDBDBD" strokeWidth="0.4" />
          </g>
          {/* Flowers at base */}
          <circle cx="835" cy="320" r="2" fill="#FF6F61" />
          <circle cx="845" cy="320" r="1.5" fill="#9C27B0" />
          {/* Building label */}
          <g>
            <rect x="795" y="325" width="90" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="840" y="335" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Poštovní budka</text>
          </g>
        </g>

        {/* 11. Insurance Building - Guard Tower */}
        <g
          onClick={() => { const building = getBuildingById("insurance"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('insurance')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'insurance' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'insurance' ? 0.5 : 1}
        >
          {/* Tower base - front */}
          <polygon points="225,370 255,370 255,400 225,400" fill="#8B8680" stroke="#57534E" strokeWidth="1.5" />
          {/* Tower base - side */}
          <polygon points="255,370 270,363 270,393 255,400" fill="#78716C" stroke="#57534E" strokeWidth="1.5" />
          {/* Stone texture */}
          <polygon points="228,375 238,375 238,385 228,385" fill="#57534E" opacity="0.2" />
          <polygon points="240,380 250,380 250,390 240,390" fill="#57534E" opacity="0.2" />
          {/* Tower level 2 - front */}
          <polygon points="227,350 253,350 253,370 227,370" fill="#A8A29E" stroke="#57534E" strokeWidth="1.5" />
          {/* Tower level 2 - side */}
          <polygon points="253,350 268,343 268,363 253,370" fill="#8B8680" stroke="#57534E" strokeWidth="1.5" />
          {/* Windows level 2 */}
          <rect x="232" y="356" width="5" height="8" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.6" />
          <rect x="245" y="356" width="5" height="8" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.6" />
          {/* Tower level 3 - front */}
          <polygon points="229,330 251,330 251,350 229,350" fill="#D4C5B9" stroke="#57534E" strokeWidth="1.5" />
          {/* Tower level 3 - side */}
          <polygon points="251,330 266,323 266,343 251,350" fill="#A8A29E" stroke="#57534E" strokeWidth="1.5" />
          {/* Window level 3 */}
          <rect x="236" y="337" width="6" height="9" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.6" />
          {/* Battlements */}
          <rect x="229" y="326" width="5" height="6" fill="#8B8680" stroke="#57534E" strokeWidth="0.8" />
          <rect x="239" y="326" width="5" height="6" fill="#8B8680" stroke="#57534E" strokeWidth="0.8" />
          <rect x="247" y="326" width="4" height="6" fill="#8B8680" stroke="#57534E" strokeWidth="0.8" />
          {/* Flag */}
          <line x1="240" y1="330" x2="240" y2="315" stroke="#4B3621" strokeWidth="1.5" />
          <polygon points="240,318 252,321 240,324" fill="#1976D2" />
          {/* Ivy growing */}
          <path d="M 228,380 Q 230,375 228,370 Q 226,365 228,360" stroke="#4CAF50" strokeWidth="1.5" fill="none" opacity="0.7" />
          <ellipse cx="229" cy="375" rx="2" ry="3" fill="#66BB6A" opacity="0.7" />
          <ellipse cx="227" cy="365" rx="2" ry="3" fill="#66BB6A" opacity="0.7" />
          <path d="M 255,390 Q 258,385 256,380 Q 254,375 256,370" stroke="#4CAF50" strokeWidth="1.5" fill="none" opacity="0.7" />
          <ellipse cx="257" cy="385" rx="2" ry="3" fill="#66BB6A" opacity="0.7" />
          <ellipse cx="255" cy="375" rx="2" ry="3" fill="#66BB6A" opacity="0.7" />
          {/* Building label */}
          <g>
            <rect x="200" y="405" width="80" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="240" y="415" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Strážní věž</text>
          </g>
        </g>

        {/* 12. Travel Building - Travel Post */}
        <g
          onClick={() => { const building = getBuildingById("travel"); if (building) handleBuildingClick(building); }}
          onMouseEnter={() => setHoveredBuilding('travel')}
          onMouseLeave={() => setHoveredBuilding(null)}
          style={{ cursor: 'pointer' }}
          filter={hoveredBuilding === 'travel' ? 'url(#glow)' : undefined}
          opacity={animatingTo && animatingTo !== 'travel' ? 0.5 : 1}
        >
          {/* Main post */}
          <rect x="1018" y="420" width="4" height="50" fill="#704214" stroke="#4B3621" strokeWidth="1.2" />
          {/* Wood texture */}
          <line x1="1018" y1="430" x2="1022" y2="430" stroke="#4B3621" strokeWidth="0.5" />
          <line x1="1018" y1="440" x2="1022" y2="440" stroke="#4B3621" strokeWidth="0.5" />
          <line x1="1018" y1="450" x2="1022" y2="450" stroke="#4B3621" strokeWidth="0.5" />
          <line x1="1018" y1="460" x2="1022" y2="460" stroke="#4B3621" strokeWidth="0.5" />
          {/* Sign 1 (top) - pointing right */}
          <polygon points="1022,425 1055,425 1058,427 1058,433 1055,435 1022,435" fill="#8B7355" stroke="#4B3621" strokeWidth="1" />
          <polygon points="1055,425 1058,427 1058,433 1055,435" fill="#6F5F4F" stroke="#4B3621" strokeWidth="1" />
          <text x="1037" y="432" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">Praha</text>
          {/* Sign 2 - pointing left */}
          <polygon points="1018,440 985,440 982,442 982,448 985,450 1018,450" fill="#A0826D" stroke="#4B3621" strokeWidth="1" />
          <polygon points="985,440 982,442 982,448 985,450" fill="#8B7355" stroke="#4B3621" strokeWidth="1" />
          <text x="1000" y="447" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">Brno</text>
          {/* Sign 3 - pointing right */}
          <polygon points="1022,455 1060,455 1063,457 1063,463 1060,465 1022,465" fill="#8B4513" stroke="#4B3621" strokeWidth="1" />
          <polygon points="1060,455 1063,457 1063,463 1060,465" fill="#704214" stroke="#4B3621" strokeWidth="1" />
          <text x="1042" y="462" fontSize="7" fontWeight="bold" fill="#FFF" textAnchor="middle">Moře</text>
          {/* Backpack leaning on post */}
          <ellipse cx="1010" cy="468" rx="8" ry="10" fill="#5C6BC0" stroke="#3F51B5" strokeWidth="1" />
          <rect x="1006" y="463" width="8" height="6" fill="#3F51B5" stroke="#303F9F" strokeWidth="0.8" />
          {/* Backpack straps */}
          <path d="M 1008,463 Q 1006,458 1008,456" stroke="#303F9F" strokeWidth="1" fill="none" />
          <path d="M 1012,463 Q 1014,458 1012,456" stroke="#303F9F" strokeWidth="1" fill="none" />
          {/* Backpack buckle */}
          <rect x="1009" y="465" width="2" height="2" fill="#FFD700" />
          {/* Stones around base */}
          <ellipse cx="1012" cy="470" rx="4" ry="2" fill="#8B8680" />
          <circle cx="1025" cy="471" r="2" fill="#8B8680" stroke="#5D5D5D" strokeWidth="0.5" />
          <circle cx="1005" cy="471" r="2.5" fill="#8B8680" stroke="#5D5D5D" strokeWidth="0.5" />
          {/* Building label */}
          <g>
            <rect x="970" y="475" width="100" height="16" rx="8" fill="white" opacity="0.95" stroke="#76B947" strokeWidth="1.5" />
            <text x="1020" y="485" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Cestovatelský kůl</text>
          </g>
        </g>

        {/* Lístka Character - Forest Guardian Spirit */}
        <g
          style={{
            transform: `translate(${listkaPosition.x}px, ${listkaPosition.y}px)`,
            transition: `transform ${ANIMATION_DURATION_MS}ms ease-in-out`,
          }}
        >
          {/* Shadow */}
          <ellipse cx="0" cy="25" rx="15" ry="5" fill="#000" opacity="0.2" />
          
          {/* Body - leaf cloak */}
          <ellipse cx="0" cy="10" rx="12" ry="15" fill="#76B947" opacity="0.9" />
          <ellipse cx="-5" cy="8" rx="6" ry="10" fill="#9CCC65" opacity="0.8" />
          <ellipse cx="5" cy="8" rx="6" ry="10" fill="#9CCC65" opacity="0.8" />
          
          {/* Head */}
          <circle cx="0" cy="-5" r="10" fill="#A8D67A" stroke="#76B947" strokeWidth="0.8" />
          
          {/* Elf ears */}
          <ellipse cx="-8" cy="-5" rx="3" ry="5" fill="#A8D67A" stroke="#76B947" strokeWidth="0.6" />
          <polygon points="-8,-5 -11,-3 -8,-7" fill="#A8D67A" />
          <ellipse cx="8" cy="-5" rx="3" ry="5" fill="#A8D67A" stroke="#76B947" strokeWidth="0.6" />
          <polygon points="8,-5 11,-3 8,-7" fill="#A8D67A" />
          
          {/* Hair - green */}
          <ellipse cx="-4" cy="-10" rx="7" ry="8" fill="#4F8D3E" />
          <ellipse cx="4" cy="-10" rx="7" ry="8" fill="#4F8D3E" />
          <ellipse cx="0" cy="-12" rx="8" ry="6" fill="#4F8D3E" />
          
          {/* Hair flowers */}
          <circle cx="-5" cy="-11" r="2" fill="#FFF" />
          <circle cx="-5" cy="-11" r="1" fill="#FFE082" />
          <circle cx="5" cy="-11" r="2" fill="#FFF" />
          <circle cx="5" cy="-11" r="1" fill="#FFE082" />
          
          {/* Eyes - big green eyes */}
          <ellipse cx="-3" cy="-5" rx="2.5" ry="3" fill="#FFF" />
          <circle cx="-3" cy="-4.5" r="1.8" fill="#76B947" />
          <circle cx="-3" cy="-5" r="1" fill="#1A1A1A" />
          <circle cx="-2.5" cy="-5.5" r="0.5" fill="#FFF" opacity="0.8" />
          
          <ellipse cx="3" cy="-5" rx="2.5" ry="3" fill="#FFF" />
          <circle cx="3" cy="-4.5" r="1.8" fill="#76B947" />
          <circle cx="3" cy="-5" r="1" fill="#1A1A1A" />
          <circle cx="3.5" cy="-5.5" r="0.5" fill="#FFF" opacity="0.8" />
          
          {/* Smile */}
          <path d="M -3,-2 Q 0,0 3,-2" stroke="#4F8D3E" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          
          {/* Arms */}
          <ellipse cx="-10" cy="8" rx="3" ry="6" fill="#A8D67A" transform="rotate(-20 -10 8)" />
          <ellipse cx="10" cy="8" rx="3" ry="6" fill="#A8D67A" transform="rotate(20 10 8)" />
          
          {/* Leaf details on cloak */}
          <path d="M -5,10 Q -6,15 -5,18" stroke="#558B2F" strokeWidth="1" fill="none" />
          <path d="M 0,12 Q 0,16 0,20" stroke="#558B2F" strokeWidth="1" fill="none" />
          <path d="M 5,10 Q 6,15 5,18" stroke="#558B2F" strokeWidth="1" fill="none" />

          {/* Floating orb when not animating */}
          {isListkaIdle && (
            <g opacity="0.8">
              <circle cx="15" cy="-10" r="5" fill="#FFD700" opacity="0.6" />
              <circle cx="15" cy="-10" r="3" fill="#FFF" opacity="0.8" />
              <circle cx="15" cy="-10" r="1.5" fill="#FFE082" opacity="0.9" />
            </g>
          )}

          {/* Speech bubble - only show when not animating */}
          {isListkaIdle && (
            <g transform="translate(0, -50)">
              <rect x="-60" y="-20" width="120" height="30" rx="15" fill="white" stroke="#76B947" strokeWidth="2" />
              <polygon points="0,10 -8,5 8,5" fill="white" />
              <polygon points="0,10 -6,6 6,6" fill="white" stroke="#76B947" strokeWidth="2" />
              <text x="0" y="-2" fontSize="10" fontWeight="600" fill="#2E7D32" textAnchor="middle">
                {greetings[dayPeriod]}
              </text>
            </g>
          )}
        </g>

        {/* Sunlight rays (only during day/morning) */}
        {(dayPeriod === 'day' || dayPeriod === 'morning') && (
          <g opacity="0.15">
            <polygon points="200,0 210,200 190,200" fill="#FFD700" />
            <polygon points="500,0 510,250 490,250" fill="#FFD700" />
            <polygon points="800,0 810,220 790,220" fill="#FFD700" />
            <polygon points="1000,0 1010,200 990,200" fill="#FFD700" />
          </g>
        )}

        {/* Stars and moon (only at night) */}
        {dayPeriod === 'night' && (
          <g>
            {/* Moon */}
            <circle cx="1000" cy="100" r="30" fill="#FFF" opacity="0.9" />
            <circle cx="1010" cy="95" r="28" fill="#191970" opacity="0.3" />
            {/* Stars */}
            <circle cx="200" cy="80" r="2" fill="#FFF" opacity="0.9" />
            <circle cx="350" cy="120" r="1.5" fill="#FFF" opacity="0.8" />
            <circle cx="500" cy="90" r="2" fill="#FFF" opacity="0.9" />
            <circle cx="650" cy="110" r="1.5" fill="#FFF" opacity="0.8" />
            <circle cx="800" cy="70" r="2" fill="#FFF" opacity="0.9" />
            <circle cx="900" cy="130" r="1.5" fill="#FFF" opacity="0.8" />
            <circle cx="150" cy="150" r="1.5" fill="#FFF" opacity="0.8" />
            <circle cx="1050" cy="160" r="2" fill="#FFF" opacity="0.9" />
            {/* Twinkling effect */}
            <circle cx="300" cy="100" r="1" fill="#FFD700" opacity="0.7" />
            <circle cx="700" cy="140" r="1" fill="#FFD700" opacity="0.7" />
          </g>
        )}

        {/* Building lights at night */}
        {isDark && (
          <g opacity="0.8">
            {/* Home windows lit */}
            <rect x="643" y="688" width="8" height="8" fill="#FFE082" opacity="0.9" />
            <rect x="669" y="688" width="8" height="8" fill="#FFE082" opacity="0.9" />
            {/* Food hut window */}
            <rect x="765" y="418" width="7" height="7" fill="#FFE082" opacity="0.9" />
            {/* Tower windows */}
            <rect x="232" y="356" width="5" height="8" fill="#FFE082" opacity="0.7" />
            <rect x="245" y="356" width="5" height="8" fill="#FFE082" opacity="0.7" />
            <rect x="236" y="337" width="6" height="9" fill="#FFE082" opacity="0.7" />
            {/* Relationships mailbox window glow */}
            <rect x="427" y="648" width="5" height="5" fill="#FFE082" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};

