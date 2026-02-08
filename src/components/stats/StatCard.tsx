import React from 'react';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subtitle, trend }) => {
  const trendEmoji = trend === 'up' ? '📈' : trend === 'down' ? '📉' : '';
  
  return (
    <div className="bg-white rounded-kawaii p-6 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl">{icon}</span>
        {trend && <span className="text-xl">{trendEmoji}</span>}
      </div>
      
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-3xl font-bold text-matcha-dark mb-2">{value}</div>
      
      {subtitle && (
        <div className="text-xs text-gray-500">{subtitle}</div>
      )}
    </div>
  );
};
