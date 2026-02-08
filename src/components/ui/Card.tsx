import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-card-bg rounded-3xl p-4 md:p-6 border-[3px] border-matcha-light shadow-sticker';
  const hoverClasses = hover
    ? 'hover:shadow-[5px_5px_0px_#B4D4A0] hover:scale-105 transition-all duration-200 cursor-pointer'
    : '';
  
  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
