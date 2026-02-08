import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={`relative bg-card-bg rounded-3xl shadow-sticker-dark border-[3px] border-matcha-light w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b-[3px] border-matcha-light/30">
            <h2 className="text-2xl font-bold text-matcha-dark">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-salmon/20 text-salmon hover:bg-salmon hover:text-white transition-all text-xl font-bold hover-wobble"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
