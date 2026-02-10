import React from 'react';

export const HomeBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 140 180"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tree trunk */}
      <g>
        <rect x="55" y="90" width="30" height="90" fill="#704214" rx="3" />
        <rect x="57" y="90" width="26" height="90" fill="#8B4513" rx="2" />
        
        {/* Bark texture */}
        <line x1="60" y1="100" x2="75" y2="105" stroke="#5D3410" strokeWidth="1.5" opacity="0.4" />
        <line x1="62" y1="120" x2="77" y2="125" stroke="#5D3410" strokeWidth="1.5" opacity="0.4" />
        <line x1="60" y1="140" x2="75" y2="145" stroke="#5D3410" strokeWidth="1.5" opacity="0.4" />
        <line x1="62" y1="160" x2="77" y2="165" stroke="#5D3410" strokeWidth="1.5" opacity="0.4" />
      </g>
      
      {/* Tree roots */}
      <g>
        <ellipse cx="70" cy="178" rx="35" ry="8" fill="#5D3410" opacity="0.6" />
      </g>
      
      {/* Spiral stairs around trunk */}
      <g>
        <path d="M 50 150 Q 45 148 48 145" fill="none" stroke="#704214" strokeWidth="3" />
        <path d="M 90 140 Q 95 138 92 135" fill="none" stroke="#704214" strokeWidth="3" />
        <path d="M 48 130 Q 43 128 46 125" fill="none" stroke="#704214" strokeWidth="3" />
        <path d="M 92 120 Q 97 118 94 115" fill="none" stroke="#704214" strokeWidth="3" />
        <path d="M 46 110 Q 41 108 44 105" fill="none" stroke="#704214" strokeWidth="3" />
        <path d="M 94 100 Q 99 98 96 95" fill="none" stroke="#704214" strokeWidth="3" />
      </g>
      
      {/* Tree house structure */}
      <g>
        {/* Platform base */}
        <ellipse cx="70" cy="75" rx="45" ry="8" fill="#704214" />
        <ellipse cx="70" cy="73" rx="45" ry="8" fill="#8B4513" />
        
        {/* House walls */}
        <rect x="35" y="35" width="70" height="40" fill="#D4A574" stroke="#704214" strokeWidth="2" rx="3" />
        
        {/* Wooden planks */}
        <line x1="35" y1="45" x2="105" y2="45" stroke="#A0895C" strokeWidth="1" />
        <line x1="35" y1="55" x2="105" y2="55" stroke="#A0895C" strokeWidth="1" />
        <line x1="35" y1="65" x2="105" y2="65" stroke="#A0895C" strokeWidth="1" />
        
        {/* Door */}
        <rect x="58" y="50" width="24" height="25" fill="#8B4513" stroke="#5D3410" strokeWidth="1.5" rx="2" />
        <circle cx="75" cy="62" r="1.5" fill="#704214" />
        
        {/* Window left */}
        <rect x="42" y="42" width="12" height="12" fill="#87CEEB" stroke="#704214" strokeWidth="1" rx="1" />
        <line x1="48" y1="42" x2="48" y2="54" stroke="#704214" strokeWidth="1" />
        <line x1="42" y1="48" x2="54" y2="48" stroke="#704214" strokeWidth="1" />
        
        {/* Window right */}
        <rect x="86" y="42" width="12" height="12" fill="#87CEEB" stroke="#704214" strokeWidth="1" rx="1" />
        <line x1="92" y1="42" x2="92" y2="54" stroke="#704214" strokeWidth="1" />
        <line x1="86" y1="48" x2="98" y2="48" stroke="#704214" strokeWidth="1" />
        
        {/* Flower boxes on windows */}
        <rect x="40" y="52" width="16" height="4" fill="#8B4513" />
        <circle cx="44" cy="51" r="2" fill="#F4A4A4" />
        <circle cx="48" cy="50" r="2" fill="#FFA500" />
        <circle cx="52" cy="51" r="2" fill="#C4B5E0" />
        
        <rect x="84" y="52" width="16" height="4" fill="#8B4513" />
        <circle cx="88" cy="51" r="2" fill="#FFD700" />
        <circle cx="92" cy="50" r="2" fill="#F4A4A4" />
        <circle cx="96" cy="51" r="2" fill="#FFA500" />
      </g>
      
      {/* Shingle roof */}
      <g>
        <polygon points="70,15 25,38 115,38" fill="#8B4513" />
        <polygon points="70,15 25,38 115,38" fill="#A0522D" opacity="0.6" />
        
        {/* Shingles detail */}
        <line x1="35" y1="27" x2="55" y2="35" stroke="#704214" strokeWidth="1" />
        <line x1="55" y1="25" x2="75" y2="35" stroke="#704214" strokeWidth="1" />
        <line x1="75" y1="25" x2="95" y2="35" stroke="#704214" strokeWidth="1" />
        <line x1="95" y1="27" x2="110" y2="35" stroke="#704214" strokeWidth="1" />
        
        {/* Chimney */}
        <rect x="85" y="20" width="8" height="18" fill="#78716C" stroke="#5D3410" strokeWidth="1" />
        <rect x="83" y="18" width="12" height="3" fill="#9CA3AF" />
        
        {/* Smoke */}
        <circle cx="89" cy="13" r="3" fill="#D1D5DB" opacity="0.6" />
        <circle cx="91" cy="8" r="3.5" fill="#D1D5DB" opacity="0.5" />
      </g>
      
      {/* Small balcony */}
      <g>
        <rect x="25" y="60" width="20" height="3" fill="#8B4513" />
        <rect x="25" y="60" width="20" height="2" fill="#A0522D" opacity="0.7" />
        
        {/* Railing */}
        <line x1="25" y1="60" x2="25" y2="50" stroke="#704214" strokeWidth="1" />
        <line x1="32" y1="60" x2="32" y2="50" stroke="#704214" strokeWidth="1" />
        <line x1="39" y1="60" x2="39" y2="50" stroke="#704214" strokeWidth="1" />
        <line x1="45" y1="60" x2="45" y2="50" stroke="#704214" strokeWidth="1" />
        <line x1="25" y1="50" x2="45" y2="50" stroke="#704214" strokeWidth="1.5" />
      </g>
      
      {/* Rope ladder from balcony */}
      <g opacity="0.7">
        <line x1="28" y1="63" x2="28" y2="90" stroke="#8B7355" strokeWidth="1" />
        <line x1="35" y1="63" x2="35" y2="90" stroke="#8B7355" strokeWidth="1" />
        <line x1="28" y1="70" x2="35" y2="70" stroke="#8B7355" strokeWidth="1.5" />
        <line x1="28" y1="80" x2="35" y2="80" stroke="#8B7355" strokeWidth="1.5" />
      </g>
      
      {/* Leaves around house */}
      <g opacity="0.6">
        <circle cx="20" cy="50" r="15" fill="#4F8D3E" />
        <circle cx="120" cy="50" r="15" fill="#4F8D3E" />
        <circle cx="30" cy="70" r="12" fill="#6BAA52" />
        <circle cx="110" cy="70" r="12" fill="#6BAA52" />
      </g>
    </svg>
  );
};
