import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useTaskStore } from '../../stores/taskStore';
import { ListkaAvatar } from '../gamification/ListkaAvatar';
import { XPBar } from '../gamification/XPBar';

export const StatusBar: React.FC = () => {
  const { streak_aktualni, level } = useGameStore();
  const { tasks } = useTaskStore();
  const [avatarError, setAvatarError] = useState(false);
  
  const todayTasks = tasks.filter((t) => t.stav === 'aktivni').length;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm border-b-[3px] border-matcha-light/30 py-4 md:py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile - Stacked Layout */}
        <div className="md:hidden flex flex-col space-y-4">
          {/* Avatar and Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-16 h-16 rounded-full bg-white border-[3px] border-matcha-light shadow-sticker flex items-center justify-center animate-float"
              >
                {!avatarError ? (
                  <img 
                    src="/dashboard/listka-avatar.png" 
                    alt="Lístka" 
                    className="w-full h-full rounded-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span className="text-4xl">🌿</span>
                )}
              </div>
              <div className="bg-matcha-light border-[2px] border-matcha-dark px-3 py-1.5 rounded-full shadow-sticker">
                <div className="text-sm font-bold text-matcha-dark flex items-center space-x-1">
                  <span>🌟</span>
                  <span>Lv. {level}</span>
                </div>
              </div>
            </div>
            
            {/* Quick stats pills */}
            <div className="flex gap-2">
              <div className="bg-orange-100 border-[2px] border-orange-300 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-[3px_3px_0px_#FED7AA] flex items-center space-x-1">
                <span>🔥</span>
                <span>{streak_aktualni}</span>
              </div>
              <div className="bg-blue-50 border-[2px] border-blue-200 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-[3px_3px_0px_#BFDBFE]">
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
            <div className="bg-blue-50 border-[3px] border-blue-200 rounded-3xl px-4 py-3 text-center shadow-[4px_4px_0px_#BFDBFE] min-w-[100px]">
              <div className="text-2xl font-bold text-blue-600">{todayTasks}</div>
              <div className="text-xs text-gray-600 font-medium">Úkolů dnes</div>
            </div>
            <div className="bg-orange-50 border-[3px] border-orange-300 rounded-3xl px-4 py-3 text-center shadow-[4px_4px_0px_#FED7AA] min-w-[100px]">
              <div className="text-2xl font-bold text-orange-600 flex items-center justify-center space-x-1">
                <span>{streak_aktualni}</span>
                <span>🔥</span>
              </div>
              <div className="text-xs text-gray-600 font-medium">Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
