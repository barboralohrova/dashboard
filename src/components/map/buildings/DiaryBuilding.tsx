import React from 'react';

export const DiaryBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tree trunk in background */}
      <g>
        <rect x="15" y="30" width="25" height="110" fill="#704214" rx="3" />
        <rect x="17" y="30" width="21" height="110" fill="#8B4513" rx="2" />
        
        {/* Bark texture */}
        <line x1="20" y1="40" x2="25" y2="50" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="32" y1="55" x2="27" y2="65" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="21" y1="80" x2="26" y2="90" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
      </g>
      
      {/* Tree roots */}
      <g>
        <ellipse cx="27" cy="138" rx="30" ry="8" fill="#5D3410" opacity="0.6" />
        <path d="M 10 135 Q 15 125 27 130" fill="none" stroke="#704214" strokeWidth="3" />
        <path d="M 44 135 Q 39 125 27 130" fill="none" stroke="#704214" strokeWidth="3" />
      </g>
      
      {/* Grass tuft around tree */}
      <g>
        <path d="M 8 130 Q 10 120 12 130" fill="#6BAA52" opacity="0.7" />
        <path d="M 12 132 Q 14 122 16 132" fill="#6BAA52" opacity="0.7" />
        <path d="M 42 130 Q 44 120 46 130" fill="#6BAA52" opacity="0.7" />
        <path d="M 38 132 Q 40 122 42 132" fill="#6BAA52" opacity="0.7" />
      </g>
      
      {/* Secret wooden chest */}
      <g>
        {/* Shadow */}
        <ellipse cx="75" cy="130" rx="28" ry="6" fill="#000" opacity="0.2" />
        
        {/* Chest body */}
        <rect x="50" y="100" width="50" height="30" fill="#8B4513" stroke="#5D3410" strokeWidth="2" rx="2" />
        <rect x="52" y="102" width="46" height="26" fill="#A0522D" stroke="#704214" strokeWidth="1" rx="1" />
        
        {/* Wood planks */}
        <line x1="50" y1="110" x2="100" y2="110" stroke="#704214" strokeWidth="1" />
        <line x1="50" y1="120" x2="100" y2="120" stroke="#704214" strokeWidth="1" />
        
        {/* Chest lid */}
        <ellipse cx="75" cy="100" rx="25" ry="8" fill="#704214" />
        <ellipse cx="75" cy="98" rx="25" ry="8" fill="#8B4513" />
        <ellipse cx="75" cy="98" rx="23" ry="6" fill="#A0522D" />
        
        {/* Lock */}
        <rect x="72" y="113" width="6" height="10" fill="#B8860B" stroke="#8B6914" strokeWidth="1" rx="1" />
        <circle cx="75" cy="116" r="2" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
        <rect x="74" y="118" width="2" height="4" fill="#B8860B" />
        
        {/* Metal bands */}
        <rect x="48" y="108" width="54" height="2" fill="#78716C" opacity="0.7" />
        <rect x="48" y="120" width="54" height="2" fill="#78716C" opacity="0.7" />
      </g>
      
      {/* Moss on chest */}
      <g opacity="0.6">
        <circle cx="55" cy="105" r="4" fill="#6BAA52" />
        <circle cx="95" cy="108" r="5" fill="#6BAA52" />
        <circle cx="58" cy="125" r="3" fill="#7AB85B" />
        <circle cx="92" cy="122" r="4" fill="#7AB85B" />
      </g>
      
      {/* Dandelions and flowers on meadow */}
      <g>
        {/* Dandelion 1 */}
        <line x1="15" y1="135" x2="15" y2="125" stroke="#6BAA52" strokeWidth="1" />
        <circle cx="15" cy="123" r="3" fill="#FFF" opacity="0.8" />
        <circle cx="15" cy="123" r="2" fill="#FFFEF7" />
        
        {/* Dandelion 2 */}
        <line x1="105" y1="132" x2="105" y2="122" stroke="#6BAA52" strokeWidth="1" />
        <circle cx="105" cy="120" r="3" fill="#FFF" opacity="0.8" />
        
        {/* Small flowers */}
        <circle cx="110" cy="128" r="2" fill="#F4A4A4" />
        <circle cx="20" cy="128" r="2" fill="#C4B5E0" />
        <circle cx="115" cy="130" r="1.5" fill="#FFA500" />
      </g>
      
      {/* Mysterious glow effect */}
      <g opacity="0.3">
        <ellipse cx="75" cy="115" rx="15" ry="10" fill="#FFD700" />
        <ellipse cx="75" cy="115" rx="10" ry="7" fill="#FFFEF7" />
      </g>
      
      {/* Tree leaves in foreground */}
      <g opacity="0.7">
        <circle cx="20" cy="50" r="15" fill="#4F8D3E" />
        <circle cx="35" cy="45" r="12" fill="#6BAA52" />
        <circle cx="10" cy="65" r="13" fill="#5A9D47" />
      </g>
    </svg>
  );
};
