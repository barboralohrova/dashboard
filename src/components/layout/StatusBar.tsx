import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useTaskStore } from '../../stores/taskStore';
import { ListkaAvatar } from '../gamification/ListkaAvatar';
import { XPBar } from '../gamification/XPBar';

export const StatusBar: React.FC = () => {
  const { streak_aktualni, level } = useGameStore();
  const { tasks } = useTaskStore();
  
  const todayTasks = tasks.filter((t) => t.stav === 'aktivni').length;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md border-b border-matcha-light/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile - Stacked Layout */}
        <div className="md:hidden flex flex-col space-y-4">
          {/* Avatar and Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <img 
                  src="/dashboard/listka-avatar.png" 
                  alt="Lístka" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm text-gray-600">Level {level}</div>
              </div>
            </div>
            
            {/* Quick stats pills */}
            <div className="flex gap-2">
              <div className="bg-matcha-light text-matcha-dark px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                🔥 {streak_aktualni}
              </div>
              <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                📋 {todayTasks}
              </div>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="w-full">
            <XPBar />
          </div>
        </div>
        
        {/* Desktop - Horizontal Layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 items-center">
          {/* Lístka Avatar */}
          <div className="col-span-2 flex justify-center">
            <ListkaAvatar size="md" />
          </div>
          
          {/* XP Bar */}
          <div className="col-span-6 flex items-center">
            <div className="w-full">
              <XPBar />
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="col-span-4 flex gap-3 justify-end">
            <div className="bg-blue-50 rounded-kawaii px-4 py-3 text-center shadow-md min-w-[100px]">
              <div className="text-2xl font-bold text-blue-600">{todayTasks}</div>
              <div className="text-xs text-gray-600">Úkolů dnes</div>
            </div>
            <div className="bg-orange-50 rounded-kawaii px-4 py-3 text-center shadow-md min-w-[100px]">
              <div className="text-2xl font-bold text-orange-600">{streak_aktualni} 🔥</div>
              <div className="text-xs text-gray-600">Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
