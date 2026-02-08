import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useTaskStore } from '../../stores/taskStore';
import { ListkaAvatar } from '../gamification/ListkaAvatar';
import { XPBar } from '../gamification/XPBar';

export const StatusBar: React.FC = () => {
  const { streak_aktualni } = useGameStore();
  const { tasks } = useTaskStore();
  
  const todayTasks = tasks.filter((t) => t.stav === 'aktivni').length;
  
  return (
    <div className="bg-white shadow-md p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lístka Avatar */}
          <div className="flex justify-center md:justify-start">
            <ListkaAvatar size="md" />
          </div>
          
          {/* XP Bar */}
          <div className="flex items-center">
            <div className="w-full">
              <XPBar />
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-matcha-light rounded-kawaii p-4 text-center">
              <div className="text-2xl font-bold text-matcha-dark">{todayTasks}</div>
              <div className="text-sm text-gray-600">Úkolů dnes</div>
            </div>
            <div className="bg-accent bg-opacity-20 rounded-kawaii p-4 text-center">
              <div className="text-2xl font-bold text-accent">{streak_aktualni} 🔥</div>
              <div className="text-sm text-gray-600">Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
