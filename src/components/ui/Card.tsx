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
  const baseClasses = 'bg-warm-card rounded-kawaii p-6 shadow-md border border-matcha-light/20';
  const hoverClasses = hover
    ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer'
    : '';
  
  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      style={{ boxShadow: '0 4px 6px -1px rgba(124, 154, 110, 0.1), 0 2px 4px -1px rgba(124, 154, 110, 0.06)' }}
    >
      {children}
    </div>
  );
};
