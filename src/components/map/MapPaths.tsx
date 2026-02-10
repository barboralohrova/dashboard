import React from 'react';

interface Building {
  id: string;
  position: { x: string; y: string };
}

interface MapPathsProps {
  buildings: Building[];
  centerX?: number;
  centerY?: number;
}

export const MapPaths: React.FC<MapPathsProps> = ({ 
  buildings, 
  centerX = 50, 
  centerY = 50 
}) => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 0 }}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Shadow filter for paths */}
        <filter id="pathShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="1" dy="2" result="offsetblur"/>
          <feFlood floodColor="#4B3621" floodOpacity="0.3"/>
          <feComposite in2="offsetblur" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Gradient for path - lighter center, darker edges */}
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D2B48C" />
          <stop offset="50%" stopColor="#C4A882" />
          <stop offset="100%" stopColor="#B8956A" />
        </linearGradient>
      </defs>
      
      {/* Paths from center to each building */}
      {buildings.map((building, index) => {
        const startX = centerX;
        const startY = centerY;
        // Parse percentage values for path calculations
        const endX = parseFloat(building.position.x);
        const endY = parseFloat(building.position.y);
        
        // Create curved path with organic offset based on index
        const offset = (index % 2 === 0 ? 8 : -8);
        const controlX1 = (startX + endX) / 2 + offset;
        const controlY1 = (startY + endY) / 2 + offset * (index % 3 === 0 ? 1.5 : 1);
        
        // Sometimes add a second control point for more organic curves
        const useDoubleControl = index % 3 === 0;
        let pathD;
        
        if (useDoubleControl) {
          const controlX2 = (startX + endX) / 2 - offset * 0.7;
          const controlY2 = (startY + endY) / 2 + offset * 0.5;
          pathD = `M ${startX}% ${startY}% C ${controlX1}% ${controlY1}%, ${controlX2}% ${controlY2}%, ${endX}% ${endY}%`;
        } else {
          pathD = `M ${startX}% ${startY}% Q ${controlX1}% ${controlY1}%, ${endX}% ${endY}%`;
        }
        
        return (
          <g key={`path-${building.id}`}>
            {/* Path shadow/dark edge */}
            <path
              d={pathD}
              stroke="#8B7355"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
            
            {/* Main path body */}
            <path
              d={pathD}
              stroke="#C4A882"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            
            {/* Lighter center highlight */}
            <path
              d={pathD}
              stroke="#D2B48C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            
            {/* Dashed/dotted texture for forest path effect */}
            <path
              d={pathD}
              stroke="#B8956A"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,8"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>
        );
      })}
      
      {/* Center point decoration - small clearing */}
      <g opacity="0.7">
        <ellipse 
          cx={`${centerX}%`} 
          cy={`${centerY}%`} 
          rx="25" 
          ry="20" 
          fill="#D2B48C" 
          opacity="0.3"
        />
        <ellipse 
          cx={`${centerX}%`} 
          cy={`${centerY}%`} 
          rx="18" 
          ry="15" 
          fill="#C4A882" 
          opacity="0.4"
        />
      </g>
    </svg>
  );
};
