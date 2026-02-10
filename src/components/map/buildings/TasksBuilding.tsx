import React from 'react';

export const TasksBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stone well base */}
      <ellipse cx="60" cy="120" rx="35" ry="10" fill="#8B8680" opacity="0.3" />
      
      {/* Stone well body */}
      <g>
        {/* Well cylinder */}
        <ellipse cx="60" cy="95" rx="30" ry="8" fill="#9CA3AF" />
        <rect x="30" y="95" width="60" height="25" fill="#A8A29E" />
        
        {/* Stone texture lines */}
        <line x1="30" y1="100" x2="90" y2="100" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="105" x2="90" y2="105" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="110" x2="90" y2="110" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="115" x2="90" y2="115" stroke="#78716C" strokeWidth="1" opacity="0.5" />
        
        {/* Well bottom */}
        <ellipse cx="60" cy="120" rx="30" ry="8" fill="#78716C" />
        
        {/* Dark well opening */}
        <ellipse cx="60" cy="95" rx="20" ry="6" fill="#1C1917" />
        <ellipse cx="60" cy="95" rx="16" ry="4" fill="#0A0908" />
      </g>
      
      {/* Wooden roof structure */}
      <g>
        {/* Support posts */}
        <rect x="35" y="50" width="5" height="45" fill="#704214" />
        <rect x="80" y="50" width="5" height="45" fill="#704214" />
        
        {/* Roof */}
        <polygon points="60,35 20,55 100,55" fill="#8B4513" />
        <polygon points="60,35 20,55 100,55" fill="#A0522D" opacity="0.7" />
        
        {/* Roof shingles detail */}
        <line x1="30" y1="45" x2="50" y2="52" stroke="#704214" strokeWidth="1.5" />
        <line x1="50" y1="48" x2="70" y2="52" stroke="#704214" strokeWidth="1.5" />
        <line x1="70" y1="48" x2="90" y2="52" stroke="#704214" strokeWidth="1.5" />
      </g>
      
      {/* Bulletin board on roof */}
      <g>
        {/* Board background */}
        <rect x="40" y="40" width="40" height="30" fill="#D4A574" stroke="#704214" strokeWidth="2" rx="2" />
        
        {/* Paper notes */}
        <rect x="44" y="44" width="12" height="10" fill="#FFFEF7" stroke="#4A4A3F" strokeWidth="0.5" />
        <rect x="58" y="46" width="10" height="8" fill="#FEF9E7" stroke="#4A4A3F" strokeWidth="0.5" />
        <rect x="46" y="56" width="11" height="9" fill="#FFFEF7" stroke="#4A4A3F" strokeWidth="0.5" />
        <rect x="59" y="57" width="10" height="8" fill="#FEF9E7" stroke="#4A4A3F" strokeWidth="0.5" />
        
        {/* Lines on papers */}
        <line x1="45" y1="47" x2="54" y2="47" stroke="#4A4A3F" strokeWidth="0.3" />
        <line x1="45" y1="49" x2="54" y2="49" stroke="#4A4A3F" strokeWidth="0.3" />
        <line x1="45" y1="51" x2="54" y2="51" stroke="#4A4A3F" strokeWidth="0.3" />
        
        <line x1="59" y1="48" x2="66" y2="48" stroke="#4A4A3F" strokeWidth="0.3" />
        <line x1="59" y1="50" x2="66" y2="50" stroke="#4A4A3F" strokeWidth="0.3" />
        <line x1="59" y1="52" x2="66" y2="52" stroke="#4A4A3F" strokeWidth="0.3" />
      </g>
      
      {/* Stone pavement around well */}
      <g>
        <ellipse cx="60" cy="122" rx="40" ry="12" fill="#D1D5DB" opacity="0.4" />
        {/* Individual stones */}
        <ellipse cx="35" cy="120" rx="6" ry="4" fill="#9CA3AF" opacity="0.6" />
        <ellipse cx="50" cy="122" rx="5" ry="3" fill="#9CA3AF" opacity="0.6" />
        <ellipse cx="70" cy="122" rx="6" ry="4" fill="#9CA3AF" opacity="0.6" />
        <ellipse cx="85" cy="120" rx="5" ry="3" fill="#9CA3AF" opacity="0.6" />
      </g>
      
      {/* Bucket on rope */}
      <g>
        <line x1="60" y1="95" x2="75" y2="80" stroke="#704214" strokeWidth="1.5" />
        <rect x="72" y="78" width="8" height="10" fill="#8B7355" stroke="#704214" strokeWidth="1" rx="1" />
        <line x1="73" y1="80" x2="79" y2="80" stroke="#704214" strokeWidth="0.5" />
        <line x1="73" y1="84" x2="79" y2="84" stroke="#704214" strokeWidth="0.5" />
      </g>
    </svg>
  );
};
