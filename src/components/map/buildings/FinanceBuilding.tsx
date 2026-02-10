import React from 'react';

export const FinanceBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 140 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="70" cy="150" rx="50" ry="8" fill="#000" opacity="0.2" />
      
      {/* Tree trunk - thick and old */}
      <g>
        <ellipse cx="70" cy="145" rx="32" ry="8" fill="#5D3410" />
        <rect x="38" y="80" width="64" height="65" fill="#704214" rx="4" />
        <rect x="42" y="80" width="56" height="65" fill="#8B4513" rx="3" />
        
        {/* Bark texture */}
        <line x1="45" y1="85" x2="50" y2="95" stroke="#5D3410" strokeWidth="2" opacity="0.4" />
        <line x1="90" y1="90" x2="85" y2="100" stroke="#5D3410" strokeWidth="2" opacity="0.4" />
        <line x1="48" y1="110" x2="53" y2="120" stroke="#5D3410" strokeWidth="2" opacity="0.4" />
        <line x1="88" y1="115" x2="83" y2="125" stroke="#5D3410" strokeWidth="2" opacity="0.4" />
        <line x1="50" y1="130" x2="55" y2="140" stroke="#5D3410" strokeWidth="2" opacity="0.4" />
        
        {/* Hollow/entrance to tree */}
        <ellipse cx="70" cy="110" rx="18" ry="25" fill="#2D1B0E" />
        <ellipse cx="70" cy="108" rx="15" ry="22" fill="#1A0F08" />
        
        {/* Door frame detail */}
        <path d="M 55 110 Q 55 95 70 90 Q 85 95 85 110 L 85 130 Q 85 135 70 135 Q 55 135 55 130 Z" 
              fill="none" stroke="#5D3410" strokeWidth="2" />
      </g>
      
      {/* Tree crown */}
      <g>
        <circle cx="40" cy="45" r="25" fill="#4F8D3E" opacity="0.85" />
        <circle cx="70" cy="30" r="32" fill="#5A9D47" opacity="0.9" />
        <circle cx="100" cy="45" r="25" fill="#4F8D3E" opacity="0.85" />
        <circle cx="55" cy="55" r="22" fill="#6BAA52" opacity="0.85" />
        <circle cx="85" cy="55" r="22" fill="#6BAA52" opacity="0.85" />
        <circle cx="70" cy="65" r="20" fill="#7AB85B" opacity="0.8" />
      </g>
      
      {/* Coins hanging from branches */}
      <g>
        {/* Coin 1 */}
        <line x1="45" y1="50" x2="45" y2="60" stroke="#8B7355" strokeWidth="0.8" />
        <circle cx="45" cy="62" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
        <text x="45" y="64" fontSize="6" fill="#B8860B" textAnchor="middle" fontWeight="bold">$</text>
        
        {/* Coin 2 */}
        <line x1="85" y1="52" x2="85" y2="65" stroke="#8B7355" strokeWidth="0.8" />
        <circle cx="85" cy="67" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
        <text x="85" y="69" fontSize="6" fill="#B8860B" textAnchor="middle" fontWeight="bold">€</text>
        
        {/* Coin 3 */}
        <line x1="60" y1="35" x2="60" y2="45" stroke="#8B7355" strokeWidth="0.8" />
        <circle cx="60" cy="47" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
        <circle cx="60" cy="47" r="3" fill="none" stroke="#B8860B" strokeWidth="0.5" />
      </g>
      
      {/* Money pouch at base */}
      <g>
        <ellipse cx="100" cy="140" rx="10" ry="12" fill="#8B7355" stroke="#5D3410" strokeWidth="1.5" />
        <path d="M 95 135 Q 100 130 105 135" fill="none" stroke="#5D3410" strokeWidth="1.5" />
        <line x1="100" y1="128" x2="100" y2="135" stroke="#A0895C" strokeWidth="1" />
        
        {/* Coins spilling out */}
        <circle cx="108" cy="142" r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
        <circle cx="112" cy="144" r="3" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
      </g>
      
      {/* Cellar entrance at ground */}
      <g>
        <rect x="10" y="135" width="25" height="20" fill="#5D3410" stroke="#3D2209" strokeWidth="2" rx="3" />
        <rect x="12" y="137" width="21" height="16" fill="#2D1B0E" rx="2" />
        
        {/* Door handle */}
        <circle cx="18" cy="145" r="2" fill="#8B7355" />
        
        {/* Stone frame */}
        <rect x="8" y="133" width="29" height="4" fill="#78716C" />
        <rect x="8" y="133" width="29" height="2" fill="#9CA3AF" />
      </g>
    </svg>
  );
};
