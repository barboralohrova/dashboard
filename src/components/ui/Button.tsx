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
  const baseClasses = 'rounded-kawaii font-medium transition-all duration-200 hover:scale-105 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-matcha-dark to-[#8BAA7E] text-white hover:shadow-lg',
    secondary: 'bg-matcha-light text-text-dark hover:bg-opacity-90',
    accent: 'bg-accent text-white hover:bg-opacity-90 hover:shadow-md',
    outline: 'border-2 border-matcha-dark text-matcha-dark hover:bg-matcha-dark hover:text-white',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
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
