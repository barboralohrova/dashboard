import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover-wobble';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-matcha-dark to-[#8BAA7E] text-white rounded-full shadow-sticker-dark hover:shadow-[5px_5px_0px_#7C9A6E]',
    secondary: 'bg-matcha-light text-matcha-dark rounded-2xl shadow-sticker hover:shadow-[5px_5px_0px_#B4D4A0]',
    accent: 'bg-accent text-white rounded-2xl shadow-sticker-accent hover:shadow-[5px_5px_0px_#D4A574]',
    outline: 'border-[3px] border-matcha-dark text-matcha-dark bg-white rounded-2xl hover:bg-matcha-dark hover:text-white shadow-sticker',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
