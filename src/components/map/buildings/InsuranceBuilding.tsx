import React from 'react';

export const InsuranceBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 130 180"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="65" cy="170" rx="45" ry="8" fill="#000" opacity="0.2" />
      
      {/* Tower base/ground floor - slightly tilted */}
      <g transform="translate(5, 0) rotate(2 65 120)">
        <rect x="35" y="120" width="60" height="50" fill="#9CA3AF" stroke="#5D5B58" strokeWidth="2" rx="2" />
        <rect x="37" y="122" width="56" height="46" fill="#A8A29E" />
        
        {/* Stone texture */}
        <line x1="35" y1="135" x2="95" y2="135" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="150" x2="95" y2="150" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        
        {/* Door */}
        <rect x="52" y="140" width="26" height="30" fill="#5D3410" stroke="#3D2209" strokeWidth="1.5" rx="3" />
        <path d="M 52 140 Q 65 135 78 140" fill="none" stroke="#3D2209" strokeWidth="1.5" />
        <circle cx="70" cy="155" r="2" fill="#B8860B" />
      </g>
      
      {/* Middle floor */}
      <g transform="translate(5, 0) rotate(2 65 120)">
        <rect x="38" y="85" width="54" height="40" fill="#A8A29E" stroke="#5D5B58" strokeWidth="2" rx="1" />
        
        {/* Stone layers */}
        <line x1="38" y1="95" x2="92" y2="95" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="38" y1="105" x2="92" y2="105" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="38" y1="115" x2="92" y2="115" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        
        {/* Windows */}
        <rect x="48" y="95" width="12" height="14" fill="#4A4A3F" stroke="#5D5B58" strokeWidth="1" rx="1" />
        <line x1="54" y1="95" x2="54" y2="109" stroke="#5D5B58" strokeWidth="1" />
        <line x1="48" y1="102" x2="60" y2="102" stroke="#5D5B58" strokeWidth="1" />
        
        <rect x="70" y="95" width="12" height="14" fill="#4A4A3F" stroke="#5D5B58" strokeWidth="1" rx="1" />
        <line x1="76" y1="95" x2="76" y2="109" stroke="#5D5B58" strokeWidth="1" />
        <line x1="70" y1="102" x2="82" y2="102" stroke="#5D5B58" strokeWidth="1" />
      </g>
      
      {/* Top floor */}
      <g transform="translate(5, 0) rotate(2 65 120)">
        <rect x="42" y="50" width="46" height="40" fill="#9CA3AF" stroke="#5D5B58" strokeWidth="2" rx="1" />
        
        {/* Stone texture */}
        <line x1="42" y1="60" x2="88" y2="60" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="42" y1="70" x2="88" y2="70" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="42" y1="80" x2="88" y2="80" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        
        {/* Window */}
        <rect x="57" y="62" width="16" height="18" fill="#4A4A3F" stroke="#5D5B58" strokeWidth="1" rx="1" />
        <line x1="65" y1="62" x2="65" y2="80" stroke="#5D5B58" strokeWidth="1" />
        <line x1="57" y1="71" x2="73" y2="71" stroke="#5D5B58" strokeWidth="1" />
      </g>
      
      {/* Battlements/cimbuří at top */}
      <g transform="translate(5, 0) rotate(2 65 120)">
        <rect x="42" y="45" width="8" height="8" fill="#9CA3AF" stroke="#5D5B58" strokeWidth="1" />
        <rect x="54" y="45" width="8" height="8" fill="#9CA3AF" stroke="#5D5B58" strokeWidth="1" />
        <rect x="66" y="45" width="8" height="8" fill="#9CA3AF" stroke="#5D5B58" strokeWidth="1" />
        <rect x="78" y="45" width="8" height="8" fill="#9CA3AF" stroke="#5D5B58" strokeWidth="1" />
      </g>
      
      {/* Flag at top */}
      <g transform="translate(5, 0) rotate(2 65 120)">
        <line x1="65" y1="45" x2="65" y2="25" stroke="#5D3410" strokeWidth="2" />
        <polygon points="65,25 65,35 78,30" fill="#F4A4A4" stroke="#704214" strokeWidth="0.8" />
        
        {/* Shield emblem on flag */}
        <path d="M 69 28 L 69 32 Q 71 33 73 32 L 73 28 Q 71 27 69 28 Z" fill="#FFD700" stroke="#704214" strokeWidth="0.3" />
      </g>
      
      {/* Ivy/climbing plants */}
      <g opacity="0.7">
        <path d="M 30 170 Q 32 160 35 150 Q 37 140 40 130 Q 42 120 45 110 Q 47 100 50 90" 
              fill="none" stroke="#4F8D3E" strokeWidth="3" />
        <circle cx="32" cy="165" r="4" fill="#6BAA52" />
        <circle cx="34" cy="155" r="3.5" fill="#6BAA52" />
        <circle cx="37" cy="145" r="4" fill="#7AB85B" />
        <circle cx="40" cy="135" r="3" fill="#6BAA52" />
        <circle cx="43" cy="125" r="3.5" fill="#7AB85B" />
        <circle cx="45" cy="115" r="3" fill="#6BAA52" />
        <circle cx="48" cy="105" r="4" fill="#7AB85B" />
        <circle cx="50" cy="95" r="3" fill="#6BAA52" />
        
        {/* Right side ivy */}
        <path d="M 100 165 Q 98 155 95 145 Q 93 135 90 125" 
              fill="none" stroke="#4F8D3E" strokeWidth="2.5" />
        <circle cx="99" cy="160" r="3.5" fill="#6BAA52" />
        <circle cx="97" cy="150" r="3" fill="#7AB85B" />
        <circle cx="94" cy="140" r="3.5" fill="#6BAA52" />
        <circle cx="91" cy="130" r="3" fill="#7AB85B" />
      </g>
      
      {/* Small windows with light */}
      <g opacity="0.6">
        <rect x="48" y="132" width="8" height="10" fill="#FFA500" stroke="#5D5B58" strokeWidth="0.8" rx="0.5" />
        <rect x="74" y="132" width="8" height="10" fill="#FFA500" stroke="#5D5B58" strokeWidth="0.8" rx="0.5" />
      </g>
      
      {/* Ground vegetation */}
      <g>
        <path d="M 25 168 Q 27 160 29 168" fill="#6BAA52" opacity="0.7" />
        <path d="M 101 168 Q 103 160 105 168" fill="#6BAA52" opacity="0.7" />
      </g>
    </svg>
  );
};
