import React, { useState } from 'react';
import type { Navyk } from '../../types';
import { useHabitStore } from '../../stores/habitStore';
import { HabitCard } from './HabitCard';
import { HabitForm } from './HabitForm';
import { Button } from '../ui';

export const HabitList: React.FC = () => {
  const { addHabit, toggleHabitForToday, getHabitsForToday, isLoading } = useHabitStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const todayHabits = getHabitsForToday();
  const completedCount = todayHabits.filter(h => h.completed).length;
  const totalCount = todayHabits.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const handleAddHabit = async (habitData: Omit<Navyk, 'id' | 'datum_vytvoreni' | 'aktivni'>) => {
    try {
      await addHabit(habitData);
    } catch (error) {
      console.error('Failed to add habit:', error);
      alert('Nepodařilo se vytvořit návyk. Zkuste to prosím znovu.');
    }
  };
  
  const handleToggleHabit = async (habitId: string) => {
    try {
      await toggleHabitForToday(habitId);
    } catch (error) {
      console.error('Failed to toggle habit:', error);
      alert('Nepodařilo se aktualizovat návyk. Zkuste to prosím znovu.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-bounce-gentle">🏋️</div>
          <p className="text-xl text-gray-600">(◕‿◕) Načítám návyky...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">🏋️ Návyky</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový návyk
        </Button>
      </div>
      
      {/* Progress Card */}
      {totalCount > 0 && (
        <div className="bg-gradient-to-r from-matcha-dark to-matcha-light text-white rounded-kawaii p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold">Dnes</h3>
            <div className="text-2xl font-bold">
              {completedCount} / {totalCount}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-2">
            <div
              className="bg-white rounded-full h-4 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          
          <p className="text-sm opacity-90">
            {completionPercentage === 100 
              ? '(｡◕‿◕｡) Skvělá práce! Všechny návyky splněny! 🎉' 
              : `${completionPercentage}% hotovo - můžeš na to! 💪`}
          </p>
        </div>
      )}
      
      {/* Today's Habits */}
      {todayHabits.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Dnešní návyky
          </h3>
          
          {todayHabits.map(({ habit, completed, streak }) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completed={completed}
              streak={streak}
              onToggle={handleToggleHabit}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-xl text-gray-600 mb-2">(◕ᴗ◕✿) Zatím žádné návyky</p>
          <p className="text-gray-500 mb-6">
            Začni budovat zdravé návyky a sbírej XP každý den!
          </p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Vytvořit první návyk
          </Button>
        </div>
      )}
      
      {/* Habit Form Modal */}
      <HabitForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddHabit}
      />
    </div>
  );
};
