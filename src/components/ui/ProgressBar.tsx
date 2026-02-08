import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'accent' | 'highlight';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  showPercentage = false,
  color = 'primary',
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    primary: 'bg-matcha-dark',
    accent: 'bg-accent',
    highlight: 'bg-highlight',
  };
  
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2 text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
