import React, { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { Button } from '../ui';

export const TaskList: React.FC = () => {
  const { tasks, filter, setFilter, addTask, completeTask } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Filter tasks
  let filteredTasks = tasks.filter((task) => {
    if (!filter.showCompleted && task.stav === 'splneno') return false;
    
    if (filter.type === 'denni' && task.opakovani !== 'denní') return false;
    if (filter.type === 'tydeni' && task.opakovani !== 'týdenní') return false;
    if (filter.type === 'jednorazove' && task.opakovani !== 'jednorázový') return false;
    
    return true;
  });
  
  // Sort tasks
  filteredTasks = [...filteredTasks].sort((a, b) => {
    if (filter.sort === 'deadline') {
      if (!a.datum_deadline) return 1;
      if (!b.datum_deadline) return -1;
      return new Date(a.datum_deadline).getTime() - new Date(b.datum_deadline).getTime();
    }
    
    if (filter.sort === 'slozitost') {
      const order = { legendarni: 5, epicky: 4, narocny: 3, stredni: 2, snadny: 1 };
      return order[b.slozitost] - order[a.slozitost];
    }
    
    if (filter.sort === 'modul') {
      return a.modul.localeCompare(b.modul);
    }
    
    return 0;
  });
  
  // Group by status
  const activeTasks = filteredTasks.filter((t) => t.stav === 'aktivni');
  const completedTasks = filteredTasks.filter((t) => t.stav === 'splneno');
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">📋 Úkoly & To-do</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový úkol
        </Button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-kawaii p-4 mb-6 shadow-md">
        <div className="flex flex-wrap gap-4">
          {/* Type filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">Typ</label>
            <div className="flex gap-2">
              {(['vse', 'denni', 'tydeni', 'jednorazove'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter({ type })}
                  className={`px-3 py-1.5 rounded-kawaii text-sm ${
                    filter.type === type
                      ? 'bg-matcha-dark text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'vse' && 'Vše'}
                  {type === 'denni' && 'Denní'}
                  {type === 'tydeni' && 'Týdenní'}
                  {type === 'jednorazove' && 'Jednorázové'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Sort */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">Řazení</label>
            <select
              value={filter.sort}
              onChange={(e) => setFilter({ sort: e.target.value as any })}
              className="w-full px-3 py-1.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
            >
              <option value="deadline">Podle deadlinu</option>
              <option value="slozitost">Podle složitosti</option>
              <option value="modul">Podle modulu</option>
            </select>
          </div>
          
          {/* Show completed */}
          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filter.showCompleted}
                onChange={(e) => setFilter({ showCompleted: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-matcha-dark"
              />
              <span className="text-sm">Zobrazit splněné</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Aktivní ({activeTasks.length})</h3>
          {activeTasks.map((task) => (
            <TaskCard key={task.id} task={task} onComplete={completeTask} />
          ))}
        </div>
      )}
      
      {/* Completed Tasks */}
      {filter.showCompleted && completedTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-500">Splněné ({completedTasks.length})</h3>
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onComplete={completeTask} />
          ))}
        </div>
      )}
      
      {/* Empty state */}
      {activeTasks.length === 0 && (!filter.showCompleted || completedTasks.length === 0) && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-xl text-gray-600 mb-4">(◕ᴗ◕✿) Žádné úkoly</p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Vytvořit první úkol
          </Button>
        </div>
      )}
      
      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={addTask}
      />
    </div>
  );
};
