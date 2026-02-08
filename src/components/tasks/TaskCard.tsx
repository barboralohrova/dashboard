import React from 'react';
import type { Task, TaskComplexity } from '../../types';
import { getBaseXPForComplexity } from '../../utils/xpCalculator';
import { formatDate } from '../../utils/helpers';
import { Card } from '../ui';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
}

const COMPLEXITY_COLORS: Record<TaskComplexity, { bg: string; text: string; icon: string }> = {
  snadny: { bg: 'bg-green-100', text: 'text-green-700', icon: '🟢' },
  stredni: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🔵' },
  narocny: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '🟡' },
  epicky: { bg: 'bg-red-100', text: 'text-red-700', icon: '🔴' },
  legendarni: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '💎' },
};

const COMPLEXITY_LABELS: Record<TaskComplexity, string> = {
  snadny: 'Snadný',
  stredni: 'Střední',
  narocny: 'Náročný',
  epicky: 'Epický',
  legendarni: 'Legendární',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const complexity = COMPLEXITY_COLORS[task.slozitost];
  const xp = getBaseXPForComplexity(task.slozitost);
  const isCompleted = task.stav === 'splneno';
  
  return (
    <Card className={`${isCompleted ? 'opacity-60' : ''} relative`}>
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => !isCompleted && onComplete(task.id)}
          disabled={isCompleted}
          className="w-6 h-6 rounded-md border-2 border-matcha-dark mt-1 cursor-pointer"
        />
        
        {/* Task Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through' : ''}`}>
              {task.nazev}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-matcha-dark">+{xp} XP</span>
            </div>
          </div>
          
          {task.popis && (
            <p className="text-sm text-gray-600 mb-3">{task.popis}</p>
          )}
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Složitost */}
            <span className={`px-3 py-1 rounded-kawaii text-xs font-medium ${complexity.bg} ${complexity.text}`}>
              {complexity.icon} {COMPLEXITY_LABELS[task.slozitost]}
            </span>
            
            {/* Opakovani */}
            {task.opakovani !== 'jednorázový' && (
              <span className="px-3 py-1 rounded-kawaii text-xs font-medium bg-gray-100 text-gray-700">
                🔄 {task.opakovani}
              </span>
            )}
            
            {/* Modul */}
            {task.modul && (
              <span className="px-3 py-1 rounded-kawaii text-xs font-medium bg-matcha-light text-matcha-dark">
                {task.modul}
              </span>
            )}
            
            {/* Deadline */}
            {task.datum_deadline && !isCompleted && (
              <span className="px-3 py-1 rounded-kawaii text-xs font-medium bg-accent bg-opacity-20 text-accent">
                ⏰ {formatDate(task.datum_deadline)}
              </span>
            )}
          </div>
          
          {isCompleted && task.datum_splneni && (
            <div className="mt-2 text-xs text-green-600">
              ✅ Splněno {formatDate(task.datum_splneni)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
