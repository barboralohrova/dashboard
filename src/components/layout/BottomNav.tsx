import React from 'react';

interface BottomNavProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const NAV_ITEMS = [
  { id: 'map', icon: '🗺️', label: 'Mapa' },
  { id: 'tasks', icon: '📋', label: 'Úkoly' },
  { id: 'calendar', icon: '📅', label: 'Kalendář' },
  { id: 'habits', icon: '🏋️', label: 'Návyky' },
  { id: 'more', icon: '≡', label: 'Více' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeModule, onModuleChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 md:hidden z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onModuleChange(item.id)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-kawaii transition-colors ${
              activeModule === item.id
                ? 'text-matcha-dark bg-matcha-light'
                : 'text-gray-500 hover:text-matcha-dark'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
