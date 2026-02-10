import React from 'react';

export const FoodBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 140 150"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="70" cy="142" rx="55" ry="8" fill="#000" opacity="0.2" />
      
      {/* Main hut */}
      <g>
        {/* Walls */}
        <rect x="35" y="70" width="50" height="50" fill="#D4A574" stroke="#704214" strokeWidth="2" rx="2" />
        
        {/* Wooden planks */}
        <line x1="35" y1="80" x2="85" y2="80" stroke="#A0895C" strokeWidth="1" />
        <line x1="35" y1="95" x2="85" y2="95" stroke="#A0895C" strokeWidth="1" />
        <line x1="35" y1="110" x2="85" y2="110" stroke="#A0895C" strokeWidth="1" />
        
        {/* Door */}
        <rect x="50" y="90" width="20" height="30" fill="#8B4513" stroke="#5D3410" strokeWidth="1.5" rx="2" />
        <circle cx="65" cy="105" r="1.5" fill="#704214" />
        
        {/* Window */}
        <rect x="40" y="75" width="12" height="12" fill="#87CEEB" stroke="#704214" strokeWidth="1" rx="1" />
        <line x1="46" y1="75" x2="46" y2="87" stroke="#704214" strokeWidth="1" />
        <line x1="40" y1="81" x2="52" y2="81" stroke="#704214" strokeWidth="1" />
      </g>
      
      {/* Shingle roof */}
      <g>
        <polygon points="60,45 25,70 95,70" fill="#8B4513" />
        <polygon points="60,45 25,70 95,70" fill="#A0522D" opacity="0.6" />
        
        {/* Shingles detail */}
        <line x1="30" y1="58" x2="50" y2="67" stroke="#704214" strokeWidth="1" />
        <line x1="50" y1="55" x2="70" y2="67" stroke="#704214" strokeWidth="1" />
        <line x1="70" y1="55" x2="90" y2="67" stroke="#704214" strokeWidth="1" />
        
        {/* Chimney */}
        <rect x="70" y="50" width="8" height="20" fill="#78716C" stroke="#5D3410" strokeWidth="1" />
        <rect x="68" y="48" width="12" height="3" fill="#9CA3AF" />
        
        {/* Smoke */}
        <circle cx="74" cy="42" r="3" fill="#D1D5DB" opacity="0.6" />
        <circle cx="76" cy="36" r="3.5" fill="#D1D5DB" opacity="0.5" />
        <circle cx="72" cy="30" r="3" fill="#D1D5DB" opacity="0.4" />
      </g>
      
      {/* Outdoor kitchen shelter */}
      <g>
        {/* Support posts */}
        <rect x="90" y="85" width="4" height="40" fill="#704214" />
        <rect x="125" y="85" width="4" height="40" fill="#704214" />
        
        {/* Roof */}
        <polygon points="85,85 88,75 130,75 133,85" fill="#8B4513" />
        <polygon points="85,85 133,85 133,87 85,87" fill="#A0522D" />
        
        {/* Table/counter */}
        <rect x="95" y="105" width="30" height="4" fill="#8B4513" />
        <rect x="95" y="105" width="30" height="2" fill="#A0522D" opacity="0.7" />
        <line x1="100" y1="109" x2="100" y2="125" stroke="#704214" strokeWidth="2" />
        <line x1="120" y1="109" x2="120" y2="125" stroke="#704214" strokeWidth="2" />
        
        {/* Hanging pots */}
        <line x1="102" y1="78" x2="102" y2="88" stroke="#5D3410" strokeWidth="0.8" />
        <ellipse cx="102" cy="90" rx="4" ry="3" fill="#78716C" stroke="#4A4A3F" strokeWidth="0.8" />
        
        <line x1="115" y1="78" x2="115" y2="85" stroke="#5D3410" strokeWidth="0.8" />
        <circle cx="115" cy="87" r="3" fill="#78716C" stroke="#4A4A3F" strokeWidth="0.8" />
      </g>
      
      {/* Stone hearth/fireplace */}
      <g>
        <ellipse cx="110" cy="125" rx="12" ry="4" fill="#78716C" />
        <path d="M 98 125 L 98 115 L 122 115 L 122 125" fill="#9CA3AF" stroke="#5D3410" strokeWidth="1" />
        
        {/* Fire */}
        <polygon points="110,115 105,108 115,108" fill="#FF6B35" opacity="0.8" />
        <polygon points="110,110 107,105 113,105" fill="#FFA500" opacity="0.7" />
        <polygon points="110,108 109,103 111,103" fill="#FFD700" opacity="0.6" />
        
        {/* Cauldron over fire */}
        <ellipse cx="110" cy="105" rx="8" ry="3" fill="#2D1B0E" stroke="#4A4A3F" strokeWidth="1" />
        <path d="M 102 105 Q 102 115 110 116 Q 118 115 118 105" fill="#3D2209" stroke="#4A4A3F" strokeWidth="1" />
        
        {/* Steam */}
        <circle cx="108" cy="98" r="2" fill="#D1D5DB" opacity="0.5" />
        <circle cx="112" cy="95" r="2.5" fill="#D1D5DB" opacity="0.4" />
      </g>
      
      {/* Barrels/storage */}
      <g>
        <ellipse cx="25" cy="120" rx="8" ry="5" fill="#8B4513" stroke="#5D3410" strokeWidth="1" />
        <rect x="17" y="115" width="16" height="12" fill="#A0522D" stroke="#5D3410" strokeWidth="1" />
        <ellipse cx="25" cy="127" rx="8" ry="5" fill="#704214" stroke="#5D3410" strokeWidth="1" />
        <line x1="17" y1="121" x2="33" y2="121" stroke="#5D3410" strokeWidth="0.8" />
      </g>
    </svg>
  );
};
