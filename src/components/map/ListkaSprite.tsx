import React from 'react';

interface ListkaSpriteProps {
  className?: string;
  showOrb?: boolean;
}

export const ListkaSprite: React.FC<ListkaSpriteProps> = ({ className = '', showOrb = true }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for orb glow */}
        <radialGradient id="orbGlow">
          <stop offset="0%" stopColor="#CCFF99" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#A4C639" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#A4C639" stopOpacity="0.2" />
        </radialGradient>
        
        {/* Gradient for skin */}
        <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B8E086" />
          <stop offset="100%" stopColor="#A8D67A" />
        </linearGradient>
        
        {/* Gradient for hair */}
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5FA347" />
          <stop offset="100%" stopColor="#4F8D3E" />
        </linearGradient>
      </defs>
      
      {/* Chibi body - 2-head tall proportions */}
      
      {/* Leaf cloak/cape */}
      <g>
        {/* Main cloak body */}
        <ellipse cx="50" cy="75" rx="22" ry="18" fill="#5A9D47" opacity="0.9" />
        <ellipse cx="50" cy="73" rx="22" ry="18" fill="#6BAA52" opacity="0.95" />
        
        {/* Cloak details - overlapping leaves */}
        <ellipse cx="40" cy="70" rx="10" ry="12" fill="#4F8D3E" opacity="0.8" />
        <ellipse cx="60" cy="70" rx="10" ry="12" fill="#4F8D3E" opacity="0.8" />
        <ellipse cx="35" cy="78" rx="8" ry="10" fill="#5A9D47" opacity="0.8" />
        <ellipse cx="65" cy="78" rx="8" ry="10" fill="#5A9D47" opacity="0.8" />
        
        {/* Leaf veins */}
        <line x1="40" y1="67" x2="40" y2="75" stroke="#4F8D3E" strokeWidth="0.5" opacity="0.6" />
        <line x1="60" y1="67" x2="60" y2="75" stroke="#4F8D3E" strokeWidth="0.5" opacity="0.6" />
      </g>
      
      {/* Inner tunika with wavy edges */}
      <g>
        <path d="M 40 70 Q 45 75 50 75 Q 55 75 60 70 L 60 85 Q 50 87 40 85 Z" 
              fill="#8BC653" opacity="0.9" />
        <path d="M 40 70 Q 45 75 50 75 Q 55 75 60 70" 
              fill="none" stroke="#6BAA52" strokeWidth="1" />
      </g>
      
      {/* Braided brown belt with acorn buckle */}
      <g>
        <ellipse cx="50" cy="75" rx="18" ry="3" fill="#704214" />
        <ellipse cx="50" cy="75" rx="16" ry="2.5" fill="#8B4513" />
        
        {/* Braided texture */}
        <line x1="35" y1="75" x2="65" y2="75" stroke="#5D3410" strokeWidth="0.5" opacity="0.7" />
        
        {/* Acorn buckle */}
        <ellipse cx="50" cy="75" rx="3" ry="4" fill="#8B4513" stroke="#5D3410" strokeWidth="0.8" />
        <ellipse cx="50" cy="73" rx="2.5" ry="2" fill="#704214" />
      </g>
      
      {/* Green broche/brooch at neck */}
      <circle cx="50" cy="60" r="3" fill="#4F8D3E" stroke="#3D7330" strokeWidth="0.8" />
      <circle cx="50" cy="60" r="1.5" fill="#6BAA52" opacity="0.7" />
      
      {/* Head - chibi proportions (large) */}
      <g>
        {/* Face */}
        <circle cx="50" cy="45" r="18" fill="url(#skinGradient)" stroke="#8DBE61" strokeWidth="1.5" />
        
        {/* Rosy cheeks */}
        <ellipse cx="38" cy="48" rx="4" ry="3" fill="#8DBE61" opacity="0.6" />
        <ellipse cx="62" cy="48" rx="4" ry="3" fill="#8DBE61" opacity="0.6" />
        
        {/* Big anime eyes */}
        <g>
          {/* Left eye */}
          <ellipse cx="43" cy="44" rx="5" ry="6" fill="#FFF" />
          <ellipse cx="43" cy="45" rx="4" ry="5" fill="#76B947" />
          <ellipse cx="43" cy="45" rx="3" ry="4" fill="#4F8D3E" />
          <circle cx="44" cy="43" r="2" fill="#FFF" opacity="0.9" />
          <circle cx="42" cy="46" r="0.8" fill="#FFF" opacity="0.7" />
          
          {/* Eyelashes - upper */}
          <path d="M 38 41 Q 40 40 42 41" fill="none" stroke="#3D7330" strokeWidth="0.8" strokeLinecap="round" />
          
          {/* Right eye */}
          <ellipse cx="57" cy="44" rx="5" ry="6" fill="#FFF" />
          <ellipse cx="57" cy="45" rx="4" ry="5" fill="#76B947" />
          <ellipse cx="57" cy="45" rx="3" ry="4" fill="#4F8D3E" />
          <circle cx="58" cy="43" r="2" fill="#FFF" opacity="0.9" />
          <circle cx="56" cy="46" r="0.8" fill="#FFF" opacity="0.7" />
          
          {/* Eyelashes - upper */}
          <path d="M 58 41 Q 56 40 54 41" fill="none" stroke="#3D7330" strokeWidth="0.8" strokeLinecap="round" />
        </g>
        
        {/* Simple kawaii smile */}
        <path d="M 45 52 Q 50 54 55 52" fill="none" stroke="#6BAA52" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Tiny nose */}
        <circle cx="50" cy="49" r="0.8" fill="#8DBE61" opacity="0.5" />
      </g>
      
      {/* Elf ears - horizontal/pointed */}
      <g>
        {/* Left ear */}
        <ellipse cx="32" cy="45" rx="4" ry="6" fill="url(#skinGradient)" stroke="#8DBE61" strokeWidth="1" 
                 transform="rotate(-10 32 45)" />
        <ellipse cx="31" cy="45" rx="2" ry="3" fill="#A8D67A" opacity="0.6" />
        
        {/* Right ear */}
        <ellipse cx="68" cy="45" rx="4" ry="6" fill="url(#skinGradient)" stroke="#8DBE61" strokeWidth="1" 
                 transform="rotate(10 68 45)" />
        <ellipse cx="69" cy="45" rx="2" ry="3" fill="#A8D67A" opacity="0.6" />
      </g>
      
      {/* Voluminous leafy hair */}
      <g>
        {/* Main hair mass - wavy, leaf-like strands */}
        <circle cx="50" cy="35" r="20" fill="url(#hairGradient)" opacity="0.95" />
        <ellipse cx="35" cy="38" rx="12" ry="15" fill="#4F8D3E" opacity="0.9" />
        <ellipse cx="65" cy="38" rx="12" ry="15" fill="#4F8D3E" opacity="0.9" />
        
        {/* Wavy strands */}
        <path d="M 32 35 Q 30 40 32 45" fill="#5A9D47" opacity="0.8" />
        <path d="M 68 35 Q 70 40 68 45" fill="#5A9D47" opacity="0.8" />
        <path d="M 50 25 Q 48 30 50 35" fill="#6BAA52" opacity="0.7" />
        
        {/* Cat ear shapes integrated into hair */}
        <ellipse cx="38" cy="28" rx="8" ry="12" fill="#63A34A" 
                 transform="rotate(-15 38 28)" />
        <ellipse cx="62" cy="28" rx="8" ry="12" fill="#63A34A" 
                 transform="rotate(15 62 28)" />
        
        {/* Inner ear detail */}
        <ellipse cx="38" cy="30" rx="4" ry="6" fill="#7AB85B" opacity="0.7" 
                 transform="rotate(-15 38 30)" />
        <ellipse cx="62" cy="30" rx="4" ry="6" fill="#7AB85B" opacity="0.7" 
                 transform="rotate(15 62 30)" />
      </g>
      
      {/* Jasmine flowers in hair */}
      <g>
        {/* Flower 1 */}
        <circle cx="42" cy="32" r="3" fill="#FFF" stroke="#FFD700" strokeWidth="0.5" />
        <circle cx="42" cy="32" r="1.5" fill="#FFD700" />
        
        {/* Flower 2 */}
        <circle cx="58" cy="30" r="2.5" fill="#FFF" stroke="#FFD700" strokeWidth="0.5" />
        <circle cx="58" cy="30" r="1.2" fill="#FFD700" />
        
        {/* Flower 3 - larger */}
        <circle cx="50" cy="28" r="3.5" fill="#FFF" stroke="#FFD700" strokeWidth="0.5" />
        <circle cx="50" cy="28" r="1.8" fill="#FFD700" />
        
        {/* Small buds */}
        <circle cx="47" cy="25" r="1.5" fill="#FFFEF7" opacity="0.8" />
        <circle cx="54" cy="26" r="1.5" fill="#FFFEF7" opacity="0.8" />
        
        {/* Tiny leaves */}
        <ellipse cx="45" cy="30" rx="2" ry="3" fill="#6BAA52" opacity="0.7" 
                 transform="rotate(20 45 30)" />
        <ellipse cx="56" cy="32" rx="2" ry="3" fill="#6BAA52" opacity="0.7" 
                 transform="rotate(-20 56 32)" />
      </g>
      
      {/* Chibi feet (barely visible under cloak) */}
      <g opacity="0.8">
        <ellipse cx="45" cy="88" rx="4" ry="3" fill="#A8D67A" />
        <ellipse cx="55" cy="88" rx="4" ry="3" fill="#A8D67A" />
      </g>
      
      {/* Magical orb in hands */}
      {showOrb && (
        <g>
          {/* Glow effect */}
          <circle cx="50" cy="68" r="10" fill="url(#orbGlow)" opacity="0.4" />
          <circle cx="50" cy="68" r="8" fill="url(#orbGlow)" opacity="0.5" />
          
          {/* Orb itself */}
          <circle cx="50" cy="68" r="6" fill="#CCFF99" opacity="0.8" stroke="#A4C639" strokeWidth="1" />
          <circle cx="50" cy="68" r="5" fill="#E0FFB3" opacity="0.6" />
          
          {/* Inner glow */}
          <circle cx="52" cy="66" r="2" fill="#FFF" opacity="0.8" />
          
          {/* Sparkles around orb */}
          <circle cx="44" cy="65" r="1" fill="#CCFF99" opacity="0.9">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="56" cy="70" r="0.8" fill="#CCFF99" opacity="0.9">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="48" cy="72" r="1" fill="#FFD700" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="54" cy="64" r="0.7" fill="#FFD700" opacity="0.8">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite" />
          </circle>
          
          {/* Small star sparkles */}
          <path d="M 43 70 L 43.5 70.5 L 43 71 L 42.5 70.5 Z" fill="#CCFF99" opacity="0.9">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
          </path>
          <path d="M 57 66 L 57.5 66.5 L 57 67 L 56.5 66.5 Z" fill="#FFD700" opacity="0.9">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite" />
          </path>
        </g>
      )}
    </svg>
  );
};
