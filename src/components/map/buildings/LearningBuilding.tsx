import React from 'react';

export const LearningBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 140 150"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="70" cy="140" rx="60" ry="8" fill="#000" opacity="0.2" />
      
      {/* Cave entrance - main structure */}
      <g>
        {/* Rocky cave mouth */}
        <path 
          d="M 20 130 Q 10 110 15 90 Q 20 70 35 55 Q 50 45 70 45 Q 90 45 105 55 Q 120 70 125 90 Q 130 110 120 130 Z"
          fill="#78716C"
          stroke="#5D5B58"
          strokeWidth="2"
        />
        
        {/* Inner dark cave */}
        <path 
          d="M 30 125 Q 25 110 28 95 Q 32 80 42 68 Q 55 58 70 58 Q 85 58 98 68 Q 108 80 112 95 Q 115 110 110 125 Z"
          fill="#2D1B0E"
        />
        
        {/* Deepest darkness */}
        <path 
          d="M 40 120 Q 38 108 40 96 Q 44 85 52 77 Q 60 71 70 71 Q 80 71 88 77 Q 96 85 100 96 Q 102 108 100 120 Z"
          fill="#0A0908"
        />
        
        {/* Rock texture - stalagmites at bottom */}
        <path d="M 35 130 L 40 120 L 45 130 Z" fill="#9CA3AF" opacity="0.7" />
        <path d="M 50 130 L 53 118 L 56 130 Z" fill="#9CA3AF" opacity="0.7" />
        <path d="M 85 130 L 88 118 L 91 130 Z" fill="#9CA3AF" opacity="0.7" />
        <path d="M 95 130 L 100 120 L 105 130 Z" fill="#9CA3AF" opacity="0.7" />
      </g>
      
      {/* Torches on sides */}
      <g>
        {/* Left torch */}
        <rect x="10" y="80" width="4" height="35" fill="#5D3410" rx="1" />
        <rect x="11" y="80" width="2" height="35" fill="#704214" rx="0.5" />
        
        {/* Flame */}
        <polygon points="12,80 8,72 16,72" fill="#FF6B35" opacity="0.9" />
        <polygon points="12,76 9,69 15,69" fill="#FFA500" opacity="0.8" />
        <polygon points="12,73 10,67 14,67" fill="#FFD700" opacity="0.7" />
        
        {/* Glow effect */}
        <circle cx="12" cy="72" r="8" fill="#FFA500" opacity="0.2" />
        <circle cx="12" cy="72" r="12" fill="#FFD700" opacity="0.1" />
        
        {/* Right torch */}
        <rect x="126" y="80" width="4" height="35" fill="#5D3410" rx="1" />
        <rect x="127" y="80" width="2" height="35" fill="#704214" rx="0.5" />
        
        {/* Flame */}
        <polygon points="128,80 124,72 132,72" fill="#FF6B35" opacity="0.9" />
        <polygon points="128,76 125,69 131,69" fill="#FFA500" opacity="0.8" />
        <polygon points="128,73 126,67 130,67" fill="#FFD700" opacity="0.7" />
        
        {/* Glow effect */}
        <circle cx="128" cy="72" r="8" fill="#FFA500" opacity="0.2" />
        <circle cx="128" cy="72" r="12" fill="#FFD700" opacity="0.1" />
      </g>
      
      {/* Moss on rocks */}
      <g opacity="0.6">
        <ellipse cx="25" cy="85" rx="8" ry="5" fill="#6BAA52" />
        <ellipse cx="115" cy="90" rx="9" ry="6" fill="#6BAA52" />
        <ellipse cx="35" cy="120" rx="6" ry="4" fill="#7AB85B" />
        <ellipse cx="105" cy="118" rx="7" ry="4" fill="#7AB85B" />
      </g>
      
      {/* Mysterious inner glow */}
      <g opacity="0.3">
        <ellipse cx="70" cy="90" rx="20" ry="15" fill="#A4C639" />
        <ellipse cx="70" cy="90" rx="15" ry="10" fill="#CCFF99" />
      </g>
      
      {/* Cave ground stones */}
      <g>
        <ellipse cx="30" cy="135" rx="8" ry="4" fill="#9CA3AF" opacity="0.5" />
        <ellipse cx="50" cy="137" rx="6" ry="3" fill="#9CA3AF" opacity="0.5" />
        <ellipse cx="90" cy="137" rx="6" ry="3" fill="#9CA3AF" opacity="0.5" />
        <ellipse cx="110" cy="135" rx="8" ry="4" fill="#9CA3AF" opacity="0.5" />
      </g>
      
      {/* Small crystals/knowledge symbols */}
      <g opacity="0.4">
        <polygon points="65,85 63,90 67,90" fill="#87CEEB" />
        <polygon points="75,88 73,93 77,93" fill="#87CEEB" />
        <polygon points="70,95 68,100 72,100" fill="#9CA3AF" />
      </g>
      
      {/* Mysterious runes on cave entrance */}
      <g opacity="0.5">
        <circle cx="45" cy="65" r="2" fill="#CCFF99" />
        <circle cx="95" cy="65" r="2" fill="#CCFF99" />
        <path d="M 40 75 L 45 70 L 50 75" fill="none" stroke="#CCFF99" strokeWidth="1" />
        <path d="M 90 75 L 95 70 L 100 75" fill="none" stroke="#CCFF99" strokeWidth="1" />
      </g>
    </svg>
  );
};
