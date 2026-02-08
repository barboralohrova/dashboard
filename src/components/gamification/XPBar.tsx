import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { ProgressBar } from '../ui';

export const XPBar: React.FC = () => {
  const { xp, xpForNextLevel, level } = useGameStore();
  
  return (
    <div className="bg-white rounded-kawaii p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-matcha-dark">Level {level}</span>
        <span className="text-xs text-gray-600">
          {xp} / {xpForNextLevel} XP
        </span>
      </div>
      <ProgressBar current={xp} max={xpForNextLevel} color="primary" />
    </div>
  );
};
