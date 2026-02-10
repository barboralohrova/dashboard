import React from 'react';

export const RelationshipsBuilding: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="60" cy="150" rx="30" ry="6" fill="#000" opacity="0.2" />
      
      {/* Wooden post/pole */}
      <g>
        <rect x="52" y="70" width="16" height="80" fill="#704214" rx="2" />
        <rect x="54" y="70" width="12" height="80" fill="#8B4513" rx="1.5" />
        
        {/* Wood grain */}
        <line x1="56" y1="80" x2="64" y2="85" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="55" y1="100" x2="63" y2="105" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="56" y1="120" x2="64" y2="125" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
        <line x1="55" y1="140" x2="63" y2="145" stroke="#5D3410" strokeWidth="1" opacity="0.4" />
      </g>
      
      {/* Post base */}
      <ellipse cx="60" cy="150" rx="18" ry="5" fill="#5D3410" />
      
      {/* Mailbox/postal box on top of post */}
      <g>
        {/* Box body */}
        <rect x="35" y="45" width="50" height="30" fill="#8B4513" stroke="#5D3410" strokeWidth="2" rx="3" />
        <rect x="37" y="47" width="46" height="26" fill="#A0522D" rx="2" />
        
        {/* Curved top/lid */}
        <path d="M 35 45 Q 60 30 85 45" fill="#704214" stroke="#5D3410" strokeWidth="2" />
        <path d="M 35 45 Q 60 32 85 45" fill="#8B4513" />
        
        {/* Opening slot */}
        <rect x="45" y="55" width="30" height="4" fill="#2D1B0E" stroke="#1A0F08" strokeWidth="1" rx="1" />
        
        {/* Metal details */}
        <rect x="80" y="58" width="3" height="10" fill="#78716C" rx="0.5" />
        
        {/* Wood planks detail */}
        <line x1="35" y1="55" x2="85" y2="55" stroke="#704214" strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="65" x2="85" y2="65" stroke="#704214" strokeWidth="1" opacity="0.5" />
      </g>
      
      {/* Kawaii owl sitting on mailbox */}
      <g>
        {/* Body */}
        <ellipse cx="60" cy="25" rx="15" ry="18" fill="#8B7355" stroke="#5D3410" strokeWidth="1.5" />
        <ellipse cx="60" cy="25" rx="12" ry="15" fill="#A0895C" />
        
        {/* Belly */}
        <ellipse cx="60" cy="28" rx="9" ry="11" fill="#D4A574" />
        
        {/* Wings */}
        <ellipse cx="48" cy="25" rx="6" ry="10" fill="#8B7355" opacity="0.8" />
        <ellipse cx="72" cy="25" rx="6" ry="10" fill="#8B7355" opacity="0.8" />
        
        {/* Face - big anime eyes */}
        <g>
          {/* Left eye */}
          <circle cx="55" cy="22" r="5" fill="#FFF" />
          <circle cx="55" cy="22" r="4" fill="#4A4A3F" />
          <circle cx="56" cy="21" r="2" fill="#FFF" />
          <circle cx="55.5" cy="22.5" r="0.8" fill="#FFF" opacity="0.7" />
          
          {/* Right eye */}
          <circle cx="65" cy="22" r="5" fill="#FFF" />
          <circle cx="65" cy="22" r="4" fill="#4A4A3F" />
          <circle cx="66" cy="21" r="2" fill="#FFF" />
          <circle cx="65.5" cy="22.5" r="0.8" fill="#FFF" opacity="0.7" />
        </g>
        
        {/* Beak */}
        <polygon points="60,26 57,28 63,28" fill="#FFA500" stroke="#704214" strokeWidth="0.5" />
        
        {/* Ear tufts */}
        <path d="M 48 15 L 50 10 L 52 15" fill="#704214" />
        <path d="M 72 15 L 70 10 L 68 15" fill="#704214" />
        
        {/* Feet */}
        <path d="M 55 42 L 53 46 M 55 42 L 57 46" fill="none" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 65 42 L 63 46 M 65 42 L 67 46" fill="none" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      
      {/* Flying letters/envelopes */}
      <g>
        {/* Letter 1 - left side */}
        <g transform="rotate(-15 25 80)">
          <rect x="20" y="75" width="10" height="7" fill="#FFFEF7" stroke="#4A4A3F" strokeWidth="0.5" rx="0.5" />
          <path d="M 20 75 L 25 79 L 30 75" fill="none" stroke="#4A4A3F" strokeWidth="0.5" />
          <line x1="22" y1="78" x2="28" y2="78" stroke="#F4A4A4" strokeWidth="0.3" />
        </g>
        
        {/* Letter 2 - right side */}
        <g transform="rotate(20 95 65)">
          <rect x="90" y="60" width="10" height="7" fill="#FEF9E7" stroke="#4A4A3F" strokeWidth="0.5" rx="0.5" />
          <path d="M 90 60 L 95 64 L 100 60" fill="none" stroke="#4A4A3F" strokeWidth="0.5" />
          <line x1="92" y1="63" x2="98" y2="63" stroke="#C4B5E0" strokeWidth="0.3" />
        </g>
        
        {/* Letter 3 - floating up */}
        <g transform="rotate(10 75 95)">
          <rect x="70" y="90" width="10" height="7" fill="#FFFEF7" stroke="#4A4A3F" strokeWidth="0.5" rx="0.5" />
          <path d="M 70 90 L 75 94 L 80 90" fill="none" stroke="#4A4A3F" strokeWidth="0.5" />
          <line x1="72" y1="93" x2="78" y2="93" stroke="#FFD700" strokeWidth="0.3" />
        </g>
        
        {/* Heart on one envelope */}
        <circle cx="95" cy="63" r="1.5" fill="#F4A4A4" opacity="0.6" />
      </g>
      
      {/* Small birds flying */}
      <g opacity="0.5">
        <path d="M 15 40 Q 18 38 21 40" fill="none" stroke="#4A4A3F" strokeWidth="1" strokeLinecap="round" />
        <path d="M 105 50 Q 108 48 111 50" fill="none" stroke="#4A4A3F" strokeWidth="1" strokeLinecap="round" />
      </g>
      
      {/* Grass at base */}
      <g>
        <path d="M 50 148 Q 52 140 54 148" fill="#6BAA52" opacity="0.7" />
        <path d="M 66 148 Q 68 140 70 148" fill="#6BAA52" opacity="0.7" />
      </g>
    </svg>
  );
};
