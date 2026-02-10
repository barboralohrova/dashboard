import React from 'react';

interface ForestDecorationsProps {
  dayPeriod: 'morning' | 'day' | 'evening' | 'night';
}

export const ForestDecorations: React.FC<ForestDecorationsProps> = ({ dayPeriod }) => {
  const isNight = dayPeriod === 'night';
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {/* Trees - various types and sizes */}
      <g opacity="0.6">
        {/* Large tree - top left */}
        <g transform="translate(50, 80)">
          <rect x="-8" y="0" width="16" height="80" fill="#704214" rx="3" />
          <circle cx="0" cy="-10" r="35" fill="#4F8D3E" />
          <circle cx="-20" cy="0" r="25" fill="#5A9D47" />
          <circle cx="20" cy="0" r="25" fill="#5A9D47" />
          <circle cx="0" cy="10" r="22" fill="#6BAA52" />
        </g>
        
        {/* Pine tree - top right */}
        <g transform="translate(1150, 100)">
          <rect x="-6" y="0" width="12" height="70" fill="#704214" rx="2" />
          <polygon points="0,-40 -25,0 25,0" fill="#4F8D3E" />
          <polygon points="0,-25 -20,10 20,10" fill="#5A9D47" />
          <polygon points="0,-10 -18,20 18,20" fill="#6BAA52" />
        </g>
        
        {/* Medium tree - left side */}
        <g transform="translate(120, 400)">
          <rect x="-6" y="0" width="12" height="60" fill="#704214" rx="2" />
          <circle cx="0" cy="-5" r="28" fill="#4F8D3E" />
          <circle cx="-15" cy="5" r="20" fill="#5A9D47" />
          <circle cx="15" cy="5" r="20" fill="#5A9D47" />
        </g>
        
        {/* Small tree - right side */}
        <g transform="translate(1100, 450)">
          <rect x="-4" y="0" width="8" height="45" fill="#704214" rx="1.5" />
          <circle cx="0" cy="0" r="20" fill="#6BAA52" />
          <circle cx="-10" cy="5" r="15" fill="#7AB85B" />
          <circle cx="10" cy="5" r="15" fill="#7AB85B" />
        </g>
      </g>
      
      {/* Bushes - low rounded shapes */}
      <g opacity="0.5">
        {/* Bush 1 */}
        <ellipse cx="200" cy="550" rx="40" ry="25" fill="#6BAA52" />
        <ellipse cx="190" cy="545" rx="25" ry="18" fill="#7AB85B" />
        <ellipse cx="210" cy="545" rx="25" ry="18" fill="#7AB85B" />
        
        {/* Bush 2 */}
        <ellipse cx="950" cy="530" rx="35" ry="22" fill="#6BAA52" />
        <ellipse cx="945" cy="525" rx="22" ry="16" fill="#7AB85B" />
        
        {/* Bush 3 */}
        <ellipse cx="450" cy="560" rx="30" ry="20" fill="#6BAA52" />
        
        {/* Bush 4 */}
        <ellipse cx="750" cy="540" rx="38" ry="24" fill="#6BAA52" />
        <ellipse cx="740" cy="535" rx="24" ry="17" fill="#7AB85B" />
      </g>
      
      {/* Mushrooms - fly agaric and brown mushrooms */}
      <g opacity="0.7">
        {/* Red mushroom with white dots - fly agaric */}
        <g transform="translate(300, 520)">
          <ellipse cx="0" cy="15" rx="8" ry="3" fill="#D4A574" opacity="0.4" />
          <rect x="-3" y="5" width="6" height="12" fill="#F5F5DC" rx="1" />
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#DC143C" />
          <ellipse cx="0" cy="0" rx="11" ry="7" fill="#FF6347" />
          <circle cx="-4" cy="-2" r="2" fill="#FFF" />
          <circle cx="3" cy="0" r="1.5" fill="#FFF" />
          <circle cx="0" cy="3" r="1.8" fill="#FFF" />
          <circle cx="-6" cy="2" r="1.5" fill="#FFF" />
        </g>
        
        {/* Brown mushroom */}
        <g transform="translate(850, 525)">
          <rect x="-2" y="8" width="4" height="10" fill="#F5F5DC" rx="1" />
          <ellipse cx="0" cy="5" rx="9" ry="6" fill="#8B4513" />
          <ellipse cx="0" cy="5" rx="8" ry="5" fill="#A0522D" />
        </g>
        
        {/* Small mushroom cluster */}
        <g transform="translate(580, 535)">
          <rect x="-1.5" y="6" width="3" height="8" fill="#F5F5DC" rx="0.5" />
          <ellipse cx="0" cy="3" rx="6" ry="4" fill="#CD853F" />
          
          <rect x="6" y="8" width="2" height="6" fill="#F5F5DC" rx="0.5" />
          <ellipse cx="7" cy="5" rx="4" ry="3" fill="#CD853F" />
          
          <rect x="-8" y="9" width="2" height="5" fill="#F5F5DC" rx="0.5" />
          <ellipse cx="-7" cy="6" rx="4" ry="3" fill="#CD853F" />
        </g>
      </g>
      
      {/* Stones - gray rounded stones */}
      <g opacity="0.6">
        {/* Large stone */}
        <ellipse cx="400" cy="545" rx="35" ry="18" fill="#9CA3AF" />
        <ellipse cx="400" cy="540" rx="30" ry="15" fill="#D1D5DB" />
        <ellipse cx="405" cy="535" rx="20" ry="10" fill="#E5E7EB" />
        
        {/* Medium stones */}
        <ellipse cx="680" cy="550" rx="25" ry="12" fill="#9CA3AF" />
        <ellipse cx="680" cy="547" rx="22" ry="10" fill="#D1D5DB" />
        
        <ellipse cx="250" cy="480" rx="20" ry="10" fill="#A8A29E" />
        <ellipse cx="250" cy="478" rx="18" ry="8" fill="#D1D5DB" />
        
        {/* Small stones */}
        <ellipse cx="520" cy="490" rx="15" ry="8" fill="#9CA3AF" />
        <ellipse cx="900" cy="485" rx="12" ry="6" fill="#A8A29E" />
      </g>
      
      {/* Moss on some stones */}
      <g opacity="0.5">
        <ellipse cx="390" cy="542" rx="15" ry="6" fill="#6BAA52" />
        <ellipse cx="675" cy="548" rx="10" ry="5" fill="#7AB85B" />
      </g>
      
      {/* Forest flowers - small colorful dots */}
      <g opacity="0.7">
        {/* Pink flowers */}
        <circle cx="180" cy="510" r="3" fill="#F4A4A4" />
        <circle cx="820" cy="495" r="2.5" fill="#F4A4A4" />
        <circle cx="350" cy="490" r="3" fill="#F4A4A4" />
        
        {/* Purple flowers */}
        <circle cx="270" cy="505" r="2.5" fill="#C4B5E0" />
        <circle cx="750" cy="500" r="3" fill="#C4B5E0" />
        
        {/* Yellow flowers */}
        <circle cx="480" cy="495" r="3" fill="#FFD700" />
        <circle cx="650" cy="508" r="2.5" fill="#FFA500" />
        <circle cx="920" cy="510" r="2.5" fill="#FFD700" />
        
        {/* White flowers */}
        <circle cx="550" cy="502" r="2.5" fill="#FFF" opacity="0.8" />
        <circle cx="380" cy="515" r="2" fill="#FFF" opacity="0.8" />
      </g>
      
      {/* Grass tufts - scattered around */}
      <g opacity="0.6">
        <path d="M 150 540 Q 152 530 154 540" fill="#6BAA52" />
        <path d="M 160 545 Q 162 535 164 545" fill="#6BAA52" />
        <path d="M 320 535 Q 322 525 324 535" fill="#7AB85B" />
        <path d="M 440 538 Q 442 528 444 538" fill="#6BAA52" />
        <path d="M 560 533 Q 562 523 564 533" fill="#7AB85B" />
        <path d="M 620 542 Q 622 532 624 542" fill="#6BAA52" />
        <path d="M 780 536 Q 782 526 784 536" fill="#7AB85B" />
        <path d="M 880 540 Q 882 530 884 540" fill="#6BAA52" />
        <path d="M 1000 538 Q 1002 528 1004 538" fill="#7AB85B" />
        <path d="M 1080 543 Q 1082 533 1084 543" fill="#6BAA52" />
      </g>
      
      {/* Animated butterflies */}
      <g opacity="0.8">
        {/* Butterfly 1 - orange */}
        <g transform="translate(600, 250)">
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="#FFA500" opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0; 15 0 0; 0 0 0; -15 0 0; 0 0 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="#FFD700" opacity="0.6" 
                   transform="scale(-1, 1)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0; -15 0 0; 0 0 0; 15 0 0; 0 0 0"
              dur="2s"
              repeatCount="indefinite"
              additive="sum"
            />
          </ellipse>
          <circle cx="0" cy="0" r="2" fill="#8B4513" />
          
          {/* Floating animation */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="600,250; 650,230; 700,260; 650,280; 600,250"
            dur="20s"
            repeatCount="indefinite"
          />
        </g>
        
        {/* Butterfly 2 - pink */}
        <g transform="translate(400, 300)">
          <ellipse cx="0" cy="0" rx="7" ry="4" fill="#F4A4A4" opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0; 12 0 0; 0 0 0; -12 0 0; 0 0 0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="0" cy="0" rx="7" ry="4" fill="#FFB6C1" opacity="0.6" 
                   transform="scale(-1, 1)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0; -12 0 0; 0 0 0; 12 0 0; 0 0 0"
              dur="1.8s"
              repeatCount="indefinite"
              additive="sum"
            />
          </ellipse>
          <circle cx="0" cy="0" r="1.5" fill="#8B4513" />
          
          {/* Floating animation */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="400,300; 350,280; 320,310; 370,330; 400,300"
            dur="25s"
            repeatCount="indefinite"
          />
        </g>
      </g>
      
      {/* Light rays (only during day) */}
      {!isNight && (
        <g opacity="0.15">
          <polygon points="200,0 220,0 280,600 260,600" fill="#FFD700" />
          <polygon points="500,0 520,0 580,600 560,600" fill="#FFD700" />
          <polygon points="800,0 820,0 880,600 860,600" fill="#FFD700" />
          <polygon points="1050,0 1070,0 1130,600 1110,600" fill="#FFD700" />
        </g>
      )}
      
      {/* Fireflies at night */}
      {isNight && (
        <g>
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={150 + i * 130}
              cy={200 + (i % 3) * 100}
              r="2"
              fill="#FFD700"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur={`${1.5 + i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${200 + (i % 3) * 100};${180 + (i % 3) * 100};${200 + (i % 3) * 100}`}
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
    </svg>
  );
};
