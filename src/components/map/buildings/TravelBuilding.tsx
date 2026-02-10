import React from 'react';

export const TravelBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="60" cy="150" rx="35" ry="6" fill="#000" opacity="0.2" />
      
      {/* Wooden signpost pole */}
      <g>
        <rect x="54" y="50" width="12" height="100" fill="#704214" rx="2" />
        <rect x="56" y="50" width="8" height="100" fill="#8B4513" rx="1.5" />
        
        {/* Wood grain */}
        <line x1="57" y1="60" x2="63" y2="65" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="58" y1="80" x2="64" y2="85" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="57" y1="100" x2="63" y2="105" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="58" y1="120" x2="64" y2="125" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="57" y1="140" x2="63" y2="145" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
      </g>
      
      {/* Ground base */}
      <ellipse cx="60" cy="150" rx="20" ry="5" fill="#5D3410" />
      
      {/* Direction signs - multiple arrows */}
      <g>
        {/* Top sign - pointing right */}
        <g>
          <path d="M 45 55 L 95 55 L 100 60 L 95 65 L 45 65 Z" 
                fill="#D4A574" stroke="#704214" strokeWidth="2" />
          <text x="52" y="63" fontSize="8" fill="#4A4A3F" fontWeight="bold" fontFamily="Arial">Praha</text>
        </g>
        
        {/* Second sign - pointing left */}
        <g>
          <path d="M 75 75 L 25 75 L 20 80 L 25 85 L 75 85 Z" 
                fill="#D4A574" stroke="#704214" strokeWidth="2" />
          <text x="28" y="83" fontSize="8" fill="#4A4A3F" fontWeight="bold" fontFamily="Arial">Paříž</text>
        </g>
        
        {/* Third sign - pointing right */}
        <g>
          <path d="M 45 95 L 95 95 L 100 100 L 95 105 L 45 105 Z" 
                fill="#D4A574" stroke="#704214" strokeWidth="2" />
          <text x="50" y="103" fontSize="8" fill="#4A4A3F" fontWeight="bold" fontFamily="Arial">Tokio</text>
        </g>
        
        {/* Fourth sign - pointing left */}
        <g>
          <path d="M 75 115 L 25 115 L 20 120 L 25 125 L 75 125 Z" 
                fill="#D4A574" stroke="#704214" strokeWidth="2" />
          <text x="28" y="123" fontSize="7" fill="#4A4A3F" fontWeight="bold" fontFamily="Arial">New York</text>
        </g>
        
        {/* Bottom sign - pointing right */}
        <g>
          <path d="M 45 135 L 90 135 L 95 140 L 90 145 L 45 145 Z" 
                fill="#D4A574" stroke="#704214" strokeWidth="2" />
          <text x="50" y="143" fontSize="8" fill="#4A4A3F" fontWeight="bold" fontFamily="Arial">Bali</text>
        </g>
      </g>
      
      {/* Nails/screws on signs */}
      <g>
        <circle cx="48" cy="60" r="1.5" fill="#4A4A3F" />
        <circle cx="92" cy="60" r="1.5" fill="#4A4A3F" />
        
        <circle cx="28" cy="80" r="1.5" fill="#4A4A3F" />
        <circle cx="72" cy="80" r="1.5" fill="#4A4A3F" />
        
        <circle cx="48" cy="100" r="1.5" fill="#4A4A3F" />
        <circle cx="92" cy="100" r="1.5" fill="#4A4A3F" />
        
        <circle cx="28" cy="120" r="1.5" fill="#4A4A3F" />
        <circle cx="72" cy="120" r="1.5" fill="#4A4A3F" />
        
        <circle cx="48" cy="140" r="1.5" fill="#4A4A3F" />
        <circle cx="87" cy="140" r="1.5" fill="#4A4A3F" />
      </g>
      
      {/* Backpack leaning against pole */}
      <g>
        {/* Main bag body */}
        <rect x="25" y="120" width="22" height="28" fill="#8B4513" stroke="#5D3410" strokeWidth="1.5" rx="3" />
        <rect x="27" y="122" width="18" height="24" fill="#A0522D" rx="2" />
        
        {/* Straps */}
        <path d="M 30 120 Q 28 115 30 110" fill="none" stroke="#704214" strokeWidth="2" />
        <path d="M 42 120 Q 44 115 42 110" fill="none" stroke="#704214" strokeWidth="2" />
        
        {/* Front pocket */}
        <rect x="30" y="128" width="12" height="10" fill="#704214" stroke="#5D3410" strokeWidth="1" rx="1.5" />
        
        {/* Buckles */}
        <rect x="34" y="132" width="4" height="2" fill="#B8860B" stroke="#8B6914" strokeWidth="0.5" />
        
        {/* Side pocket */}
        <ellipse cx="24" cy="135" rx="3" ry="8" fill="#8B7355" stroke="#5D3410" strokeWidth="1" />
      </g>
      
      {/* Travel items scattered */}
      <g>
        {/* Rolled map */}
        <rect x="70" y="145" width="4" height="12" fill="#FEF9E7" stroke="#704214" strokeWidth="1" rx="1" />
        <line x1="70" y1="148" x2="74" y2="148" stroke="#F4A4A4" strokeWidth="0.5" />
        <line x1="70" y1="152" x2="74" y2="152" stroke="#C4B5E0" strokeWidth="0.5" />
        
        {/* Compass */}
        <circle cx="82" cy="148" r="5" fill="#B8860B" stroke="#8B6914" strokeWidth="1" />
        <circle cx="82" cy="148" r="3" fill="#FFFEF7" />
        <line x1="82" y1="145" x2="82" y2="148" stroke="#F4A4A4" strokeWidth="1" />
        <text x="81" y="150" fontSize="4" fill="#4A4A3F" fontWeight="bold">N</text>
      </g>
      
      {/* Path/stones leading away */}
      <g opacity="0.5">
        <ellipse cx="90" cy="152" rx="6" ry="3" fill="#9CA3AF" />
        <ellipse cx="100" cy="155" rx="5" ry="2.5" fill="#9CA3AF" />
        <ellipse cx="108" cy="157" rx="4" ry="2" fill="#9CA3AF" />
        <ellipse cx="10" cy="152" rx="5" ry="2.5" fill="#9CA3AF" />
        <ellipse cx="18" cy="155" rx="4" ry="2" fill="#9CA3AF" />
      </g>
      
      {/* Grass tufts */}
      <g>
        <path d="M 15 148 Q 17 140 19 148" fill="#6BAA52" opacity="0.7" />
        <path d="M 25 150 Q 27 142 29 150" fill="#6BAA52" opacity="0.7" />
        <path d="M 95 148 Q 97 140 99 148" fill="#6BAA52" opacity="0.7" />
        <path d="M 105 150 Q 107 142 109 150" fill="#6BAA52" opacity="0.7" />
      </g>
      
      {/* Small flowers */}
      <g>
        <circle cx="20" cy="145" r="2" fill="#FFA500" />
        <circle cx="100" cy="145" r="2" fill="#F4A4A4" />
        <circle cx="110" cy="148" r="1.5" fill="#C4B5E0" />
      </g>
      
      {/* Decorative bird */}
      <g opacity="0.6">
        <path d="M 90 40 Q 93 38 96 40" fill="none" stroke="#4A4A3F" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="93" cy="39" r="1" fill="#4A4A3F" />
      </g>
    </svg>
  );
};
