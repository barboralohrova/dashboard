import React from 'react';

export const HealthBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 150 150"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="75" cy="142" rx="50" ry="8" fill="#000" opacity="0.2" />
      
      {/* Dense forest background */}
      <g opacity="0.5">
        <circle cx="20" cy="50" r="20" fill="#4F8D3E" />
        <circle cx="130" cy="60" r="18" fill="#4F8D3E" />
        <circle cx="15" cy="80" r="15" fill="#5A9D47" />
        <circle cx="135" cy="90" r="15" fill="#5A9D47" />
      </g>
      
      {/* Small hut */}
      <g>
        {/* Walls */}
        <rect x="50" y="75" width="50" height="45" fill="#D4A574" stroke="#704214" strokeWidth="2" rx="2" />
        
        {/* Wooden planks */}
        <line x1="50" y1="85" x2="100" y2="85" stroke="#A0895C" strokeWidth="1" />
        <line x1="50" y1="95" x2="100" y2="95" stroke="#A0895C" strokeWidth="1" />
        <line x1="50" y1="105" x2="100" y2="105" stroke="#A0895C" strokeWidth="1" />
        <line x1="50" y1="115" x2="100" y2="115" stroke="#A0895C" strokeWidth="1" />
        
        {/* Door */}
        <rect x="62" y="95" width="18" height="25" fill="#8B4513" stroke="#5D3410" strokeWidth="1.5" rx="2" />
        <circle cx="75" cy="107" r="1.5" fill="#704214" />
        
        {/* Window */}
        <rect x="85" y="85" width="10" height="10" fill="#87CEEB" stroke="#704214" strokeWidth="1" rx="1" />
        <line x1="90" y1="85" x2="90" y2="95" stroke="#704214" strokeWidth="0.8" />
        <line x1="85" y1="90" x2="95" y2="90" stroke="#704214" strokeWidth="0.8" />
      </g>
      
      {/* Thatched/wooden roof */}
      <g>
        <polygon points="75,50 40,75 110,75" fill="#8B4513" />
        <polygon points="75,50 40,75 110,75" fill="#A0522D" opacity="0.6" />
        
        {/* Thatch texture */}
        <line x1="45" y1="63" x2="60" y2="72" stroke="#8B7355" strokeWidth="1" opacity="0.7" />
        <line x1="60" y1="60" x2="75" y2="72" stroke="#8B7355" strokeWidth="1" opacity="0.7" />
        <line x1="75" y1="60" x2="90" y2="72" stroke="#8B7355" strokeWidth="1" opacity="0.7" />
        <line x1="90" y1="63" x2="105" y2="72" stroke="#8B7355" strokeWidth="1" opacity="0.7" />
      </g>
      
      {/* Herb cart in front */}
      <g>
        {/* Cart body */}
        <rect x="15" y="110" width="30" height="15" fill="#8B4513" stroke="#5D3410" strokeWidth="1.5" rx="2" />
        <rect x="17" y="112" width="26" height="11" fill="#A0522D" />
        
        {/* Wheels */}
        <circle cx="23" cy="125" r="5" fill="#704214" stroke="#5D3410" strokeWidth="1" />
        <circle cx="23" cy="125" r="2" fill="#5D3410" />
        <circle cx="37" cy="125" r="5" fill="#704214" stroke="#5D3410" strokeWidth="1" />
        <circle cx="37" cy="125" r="2" fill="#5D3410" />
        
        {/* Herbs in cart */}
        <circle cx="20" cy="108" r="3" fill="#6BAA52" />
        <circle cx="26" cy="106" r="3" fill="#7AB85B" />
        <circle cx="32" cy="107" r="3" fill="#8BC653" />
        <circle cx="38" cy="105" r="3" fill="#6BAA52" />
        
        {/* Herb stems */}
        <line x1="20" y1="111" x2="20" y2="108" stroke="#4F8D3E" strokeWidth="1" />
        <line x1="26" y1="109" x2="26" y2="106" stroke="#4F8D3E" strokeWidth="1" />
        <line x1="32" y1="110" x2="32" y2="107" stroke="#4F8D3E" strokeWidth="1" />
      </g>
      
      {/* Fireplace with cauldron */}
      <g>
        {/* Stone circle */}
        <ellipse cx="115" cy="125" rx="15" ry="5" fill="#78716C" />
        <path d="M 100 125 L 100 115 L 130 115 L 130 125" fill="#9CA3AF" stroke="#5D3410" strokeWidth="1" />
        
        {/* Fire */}
        <polygon points="115,115 110,108 120,108" fill="#FF6B35" opacity="0.8" />
        <polygon points="115,110 112,105 118,105" fill="#FFA500" opacity="0.7" />
        <polygon points="115,108 113,103 117,103" fill="#FFD700" opacity="0.6" />
        
        {/* Cauldron */}
        <ellipse cx="115" cy="105" rx="10" ry="3" fill="#2D1B0E" stroke="#4A4A3F" strokeWidth="1" />
        <path d="M 105 105 Q 105 115 115 116 Q 125 115 125 105" fill="#3D2209" stroke="#4A4A3F" strokeWidth="1" />
        
        {/* Steam with herbs */}
        <circle cx="113" cy="98" r="2" fill="#D1D5DB" opacity="0.5" />
        <circle cx="117" cy="95" r="2.5" fill="#D1D5DB" opacity="0.4" />
        <path d="M 114 94 L 114 91 L 116 91" fill="none" stroke="#6BAA52" strokeWidth="1" opacity="0.5" />
      </g>
      
      {/* Drying herbs on line */}
      <g>
        {/* Line/rope */}
        <line x1="45" y1="70" x2="105" y2="70" stroke="#8B7355" strokeWidth="1.5" />
        
        {/* Hanging herb bundles */}
        <g>
          <line x1="55" y1="70" x2="55" y2="75" stroke="#8B7355" strokeWidth="0.8" />
          <circle cx="55" cy="77" r="3" fill="#6BAA52" />
          <circle cx="55" cy="79" r="2.5" fill="#7AB85B" />
        </g>
        
        <g>
          <line x1="70" y1="70" x2="70" y2="73" stroke="#8B7355" strokeWidth="0.8" />
          <circle cx="70" cy="75" r="3" fill="#8BC653" />
          <circle cx="70" cy="77" r="2.5" fill="#6BAA52" />
        </g>
        
        <g>
          <line x1="85" y1="70" x2="85" y2="75" stroke="#8B7355" strokeWidth="0.8" />
          <circle cx="85" cy="77" r="3" fill="#7AB85B" />
          <circle cx="85" cy="79" r="2.5" fill="#8BC653" />
        </g>
        
        <g>
          <line x1="95" y1="70" x2="95" y2="73" stroke="#8B7355" strokeWidth="0.8" />
          <circle cx="95" cy="75" r="3" fill="#6BAA52" />
          <circle cx="95" cy="77" r="2.5" fill="#7AB85B" />
        </g>
      </g>
      
      {/* Forest plants around */}
      <g>
        {/* Ferns */}
        <path d="M 10 130 Q 15 120 20 130" fill="#6BAA52" opacity="0.7" />
        <path d="M 15 132 Q 20 122 25 132" fill="#6BAA52" opacity="0.7" />
        <path d="M 125 130 Q 130 120 135 130" fill="#6BAA52" opacity="0.7" />
        <path d="M 130 132 Q 135 122 140 132" fill="#6BAA52" opacity="0.7" />
        
        {/* Small flowers */}
        <circle cx="12" cy="128" r="2" fill="#C4B5E0" />
        <circle cx="138" cy="128" r="2" fill="#F4A4A4" />
      </g>
    </svg>
  );
};
