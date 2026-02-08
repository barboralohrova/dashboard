import React from 'react';
import type { Navyk } from '../../types';
import { Card } from '../ui';

interface HabitCardProps {
  habit: Navyk;
  completed: boolean;
  streak: number;
  onToggle: (habitId: string) => void;
}

const DIFFICULTY_XP = {
  easy: 5,
  medium: 10,
  hard: 15,
};

const DIFFICULTY_COLORS = {
  easy: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  hard: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
};

export const HabitCard: React.FC<HabitCardProps> = ({ habit, completed, streak, onToggle }) => {
  const colors = DIFFICULTY_COLORS[habit.obtiznost];
  const xp = DIFFICULTY_XP[habit.obtiznost];
  
  return (
    <Card className={`relative transition-all duration-200 ${completed ? 'bg-matcha-light bg-opacity-20' : ''}`}>
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="text-4xl flex-shrink-0">
          {habit.ikona}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg font-semibold ${completed ? 'line-through text-gray-500' : 'text-text-dark'}`}>
              {habit.nazev}
            </h3>
            
            {/* XP Badge */}
            <div className={`px-3 py-1 rounded-kawaii text-xs font-bold ${colors.bg} ${colors.text}`}>
              +{xp} XP
            </div>
          </div>
          
          {/* Goal info */}
          <p className="text-sm text-gray-600 mb-3">
            {habit.cilova_hodnota} {habit.jednotka} • {habit.frekvence === 'denni' ? 'Denně' : 'Týdně'}
          </p>
          
          <div className="flex items-center justify-between">
            {/* Streak */}
            <div className="flex items-center space-x-2">
              {streak > 0 && (
                <div className="flex items-center space-x-1">
                  <span className="text-xl">{streak >= 3 ? '🔥' : '⭐'}</span>
                  <span className="text-sm font-semibold text-accent">
                    {streak} {streak === 1 ? 'den' : 'dní'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Complete Button */}
            <button
              onClick={() => onToggle(habit.id)}
              className={`px-6 py-2.5 rounded-kawaii font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                completed
                  ? 'bg-matcha-dark text-white'
                  : 'bg-white border-2 border-matcha-dark text-matcha-dark hover:bg-matcha-light'
              }`}
            >
              {completed ? '✓ Hotovo' : 'Splnit'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
