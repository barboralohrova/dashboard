import React from 'react';

export const HabitsBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 150 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grass meadow base */}
      <g>
        <ellipse cx="75" cy="130" rx="70" ry="10" fill="#7AB85B" opacity="0.6" />
        <ellipse cx="75" cy="130" rx="60" ry="8" fill="#8BC653" opacity="0.5" />
        
        {/* Grass tufts */}
        <path d="M 10 125 Q 12 115 14 125" fill="#6BAA52" />
        <path d="M 20 127 Q 22 117 24 127" fill="#6BAA52" />
        <path d="M 130 125 Q 132 115 134 125" fill="#6BAA52" />
        <path d="M 140 127 Q 142 117 144 127" fill="#6BAA52" />
        <path d="M 50 128 Q 52 118 54 128" fill="#7AB85B" />
        <path d="M 100 128 Q 102 118 104 128" fill="#7AB85B" />
      </g>
      
      {/* Tree with rope ladder in background */}
      <g>
        <rect x="120" y="40" width="15" height="95" fill="#704214" rx="2" />
        <rect x="122" y="40" width="11" height="95" fill="#8B4513" rx="1" />
        
        {/* Tree crown */}
        <circle cx="127" cy="35" r="18" fill="#4F8D3E" opacity="0.8" />
        <circle cx="115" cy="45" r="15" fill="#6BAA52" opacity="0.7" />
        
        {/* Rope ladder on tree */}
        <line x1="118" y1="50" x2="118" y2="110" stroke="#8B7355" strokeWidth="1.5" />
        <line x1="125" y1="50" x2="125" y2="110" stroke="#8B7355" strokeWidth="1.5" />
        <line x1="118" y1="60" x2="125" y2="60" stroke="#8B7355" strokeWidth="2" />
        <line x1="118" y1="75" x2="125" y2="75" stroke="#8B7355" strokeWidth="2" />
        <line x1="118" y1="90" x2="125" y2="90" stroke="#8B7355" strokeWidth="2" />
        <line x1="118" y1="105" x2="125" y2="105" stroke="#8B7355" strokeWidth="2" />
      </g>
      
      {/* Wooden dumbbells */}
      <g>
        {/* Dumbbell bar */}
        <rect x="25" y="100" width="30" height="3" fill="#704214" />
        <rect x="25" y="100" width="30" height="2" fill="#8B4513" />
        
        {/* Weights (logs) */}
        <ellipse cx="25" cy="101" rx="5" ry="8" fill="#5D3410" stroke="#4A4A3F" strokeWidth="1" />
        <ellipse cx="25" cy="101" rx="4" ry="6" fill="#704214" />
        <ellipse cx="55" cy="101" rx="5" ry="8" fill="#5D3410" stroke="#4A4A3F" strokeWidth="1" />
        <ellipse cx="55" cy="101" rx="4" ry="6" fill="#704214" />
        
        {/* Wood rings */}
        <circle cx="25" cy="101" r="3" fill="none" stroke="#5D3410" strokeWidth="0.5" />
        <circle cx="55" cy="101" r="3" fill="none" stroke="#5D3410" strokeWidth="0.5" />
      </g>
      
      {/* Log bench */}
      <g>
        {/* Main log */}
        <ellipse cx="75" cy="115" rx="25" ry="6" fill="#8B4513" stroke="#5D3410" strokeWidth="1.5" />
        <rect x="50" y="110" width="50" height="10" fill="#A0522D" />
        <ellipse cx="75" cy="110" rx="25" ry="6" fill="#8B4513" stroke="#5D3410" strokeWidth="1.5" />
        
        {/* Wood grain */}
        <ellipse cx="75" cy="110" rx="20" ry="4" fill="none" stroke="#704214" strokeWidth="0.8" opacity="0.5" />
        <ellipse cx="75" cy="110" rx="15" ry="3" fill="none" stroke="#704214" strokeWidth="0.6" opacity="0.4" />
        
        {/* Support logs */}
        <ellipse cx="55" cy="125" rx="4" ry="6" fill="#704214" stroke="#5D3410" strokeWidth="1" />
        <rect x="51" y="120" width="8" height="10" fill="#8B4513" />
        
        <ellipse cx="95" cy="125" rx="4" ry="6" fill="#704214" stroke="#5D3410" strokeWidth="1" />
        <rect x="91" y="120" width="8" height="10" fill="#8B4513" />
      </g>
      
      {/* Target on tree */}
      <g>
        <circle cx="127" cy="80" r="12" fill="#F5F5DC" stroke="#4A4A3F" strokeWidth="1" />
        <circle cx="127" cy="80" r="9" fill="#F4A4A4" />
        <circle cx="127" cy="80" r="6" fill="#F5F5DC" />
        <circle cx="127" cy="80" r="3" fill="#F4A4A4" />
        <circle cx="127" cy="80" r="1" fill="#4A4A3F" />
        
        {/* Arrow in target */}
        <line x1="120" y1="77" x2="127" y2="80" stroke="#704214" strokeWidth="1.5" />
        <polygon points="120,77 118,76 118,78" fill="#8B7355" />
      </g>
      
      {/* Branch exercise bar */}
      <g>
        <rect x="10" y="55" width="45" height="4" fill="#704214" rx="2" />
        <rect x="10" y="55" width="45" height="3" fill="#8B4513" rx="1.5" />
        
        {/* Support ropes */}
        <line x1="15" y1="55" x2="15" y2="45" stroke="#8B7355" strokeWidth="1.5" />
        <line x1="50" y1="55" x2="50" y2="45" stroke="#8B7355" strokeWidth="1.5" />
        
        {/* Attached to tree branch above */}
        <rect x="10" y="42" width="45" height="5" fill="#4F8D3E" opacity="0.7" />
      </g>
      
      {/* Water bottle (natural gourd) */}
      <g>
        <ellipse cx="85" cy="125" rx="4" ry="6" fill="#D4A574" stroke="#704214" strokeWidth="1" />
        <ellipse cx="85" cy="122" rx="3" ry="2" fill="#8B7355" />
        <line x1="85" y1="120" x2="85" y2="118" stroke="#704214" strokeWidth="1" />
      </g>
      
      {/* Small flowers on meadow */}
      <g>
        <circle cx="35" cy="125" r="2" fill="#FFA500" />
        <circle cx="45" cy="128" r="1.5" fill="#C4B5E0" />
        <circle cx="105" cy="125" r="2" fill="#F4A4A4" />
        <circle cx="95" cy="127" r="1.5" fill="#FFD700" />
      </g>
    </svg>
  );
};
