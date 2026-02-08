import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import type { ListkaState } from '../../types';

const LISTKA_EMOJIS: Record<ListkaState, string> = {
  happy: '😊',
  sleepy: '😴',
  sad: '😢',
  excited: '🎉',
  shining: '🌟',
  determined: '💪',
};

const LISTKA_MESSAGES: Record<ListkaState, string> = {
  happy: 'Jsi skvělý!',
  sleepy: 'Dneska už jsi odpočívala...',
  sad: 'Chybíš mi...',
  excited: 'Wow! To bylo úžasné!',
  shining: 'Perfektní den!',
  determined: 'Vítej zpátky! Jdeme na to!',
};

export const ListkaAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const { listkaState, level } = useGameStore();
  
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24 md:w-32 md:h-32',
  };
  
  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizeClasses[size]} rounded-full bg-white flex items-center justify-center shadow-lg`}
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <img 
          src="/dashboard/listka-avatar.png" 
          alt="Lístka" 
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <p className="mt-2 text-sm text-gray-600 text-center">
        {LISTKA_MESSAGES[listkaState]}
      </p>
      <p className="text-xs text-gray-500">Level {level}</p>
    </div>
  );
};
