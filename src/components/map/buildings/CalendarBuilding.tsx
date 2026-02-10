import React from 'react';

export const CalendarBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tree trunk */}
      <g>
        <rect x="50" y="80" width="20" height="80" fill="#704214" rx="3" />
        <rect x="52" y="80" width="16" height="80" fill="#8B4513" rx="2" />
        
        {/* Bark texture */}
        <line x1="55" y1="90" x2="65" y2="95" stroke="#5D3410" strokeWidth="1" opacity="0.5" />
        <line x1="54" y1="105" x2="64" y2="110" stroke="#5D3410" strokeWidth="1" opacity="0.5" />
        <line x1="56" y1="120" x2="66" y2="125" stroke="#5D3410" strokeWidth="1" opacity="0.5" />
        <line x1="54" y1="135" x2="64" y2="140" stroke="#5D3410" strokeWidth="1" opacity="0.5" />
      </g>
      
      {/* Tree crown - leafy background */}
      <g>
        <circle cx="35" cy="50" r="20" fill="#4F8D3E" opacity="0.8" />
        <circle cx="60" cy="40" r="25" fill="#5A9D47" opacity="0.85" />
        <circle cx="85" cy="50" r="20" fill="#4F8D3E" opacity="0.8" />
        <circle cx="50" cy="60" r="18" fill="#6BAA52" opacity="0.8" />
        <circle cx="70" cy="60" r="18" fill="#6BAA52" opacity="0.8" />
      </g>
      
      {/* Watchtower platform - main structure */}
      <g>
        {/* Support beams from tree */}
        <rect x="30" y="50" width="4" height="25" fill="#704214" />
        <rect x="86" y="50" width="4" height="25" fill="#704214" />
        
        {/* Platform base */}
        <rect x="25" y="70" width="70" height="5" fill="#8B4513" />
        <rect x="25" y="70" width="70" height="3" fill="#A0522D" opacity="0.7" />
        
        {/* Tower walls */}
        <rect x="30" y="35" width="60" height="40" fill="#D4A574" stroke="#704214" strokeWidth="2" rx="2" />
        
        {/* Wooden planks detail */}
        <line x1="30" y1="45" x2="90" y2="45" stroke="#A0895C" strokeWidth="1" />
        <line x1="30" y1="55" x2="90" y2="55" stroke="#A0895C" strokeWidth="1" />
        <line x1="30" y1="65" x2="90" y2="65" stroke="#A0895C" strokeWidth="1" />
        
        {/* Window openings */}
        <rect x="40" y="42" width="15" height="12" fill="#4A4A3F" stroke="#704214" strokeWidth="1" rx="1" />
        <rect x="65" y="42" width="15" height="12" fill="#4A4A3F" stroke="#704214" strokeWidth="1" rx="1" />
        <line x1="47.5" y1="42" x2="47.5" y2="54" stroke="#704214" strokeWidth="1" />
        <line x1="72.5" y1="42" x2="72.5" y2="54" stroke="#704214" strokeWidth="1" />
        <line x1="40" y1="48" x2="55" y2="48" stroke="#704214" strokeWidth="1" />
        <line x1="65" y1="48" x2="80" y2="48" stroke="#704214" strokeWidth="1" />
      </g>
      
      {/* Roof/stříška */}
      <g>
        <polygon points="60,20 20,40 100,40" fill="#8B4513" />
        <polygon points="60,20 20,40 100,40" fill="#A0522D" opacity="0.6" />
        
        {/* Shingles */}
        <line x1="30" y1="30" x2="50" y2="37" stroke="#704214" strokeWidth="1" />
        <line x1="50" y1="32" x2="70" y2="37" stroke="#704214" strokeWidth="1" />
        <line x1="70" y1="32" x2="90" y2="37" stroke="#704214" strokeWidth="1" />
        
        {/* Small flag on top */}
        <line x1="60" y1="20" x2="60" y2="8" stroke="#704214" strokeWidth="1.5" />
        <polygon points="60,8 60,15 68,11.5" fill="#F4A4A4" stroke="#704214" strokeWidth="0.5" />
      </g>
      
      {/* Ladder */}
      <g>
        <line x1="45" y1="75" x2="45" y2="130" stroke="#704214" strokeWidth="2" />
        <line x1="52" y1="75" x2="52" y2="130" stroke="#704214" strokeWidth="2" />
        
        {/* Rungs */}
        <line x1="45" y1="80" x2="52" y2="80" stroke="#704214" strokeWidth="2" />
        <line x1="45" y1="90" x2="52" y2="90" stroke="#704214" strokeWidth="2" />
        <line x1="45" y1="100" x2="52" y2="100" stroke="#704214" strokeWidth="2" />
        <line x1="45" y1="110" x2="52" y2="110" stroke="#704214" strokeWidth="2" />
        <line x1="45" y1="120" x2="52" y2="120" stroke="#704214" strokeWidth="2" />
      </g>
      
      {/* Leaves in front for depth */}
      <g opacity="0.6">
        <circle cx="25" cy="65" r="12" fill="#6BAA52" />
        <circle cx="95" cy="65" r="12" fill="#6BAA52" />
      </g>
    </svg>
  );
};
