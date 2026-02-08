import React, { useState } from 'react';
import type { Predmet } from '../../types';
import { useLearningStore } from '../../stores/learningStore';
import { LearningCard } from './LearningCard';
import { LearningForm } from './LearningForm';
import { Button } from '../ui';

type FilterType = 'vse' | 'aktivni' | 'ukoncene' | 'neukoncene';

export const LearningList: React.FC = () => {
  const { subjects, isLoading, deleteSubject } = useLearningStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('vse');
  
  const filteredSubjects = subjects.filter(s => {
    if (filter === 'vse') return true;
    if (filter === 'aktivni') return s.stav === 'aktivni';
    if (filter === 'ukoncene') return s.stav === 'ukoncen';
    if (filter === 'neukoncene') return s.stav === 'neukoncen';
    return true;
  });
  
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    return b.semestr.localeCompare(a.semestr);
  });
  
  const totalCredits = subjects.reduce((sum, s) => sum + s.kredity, 0);
  const activeCount = subjects.filter(s => s.stav === 'aktivni').length;
  
  const handleAddSubject = async (subjectData: Omit<Predmet, 'id'>) => {
    try {
      await useLearningStore.getState().addSubject(subjectData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add subject:', error);
      alert('Nepodařilo se vytvořit předmět. Zkuste to prosím znovu.');
    }
  };
  
  const handleDeleteSubject = async (id: string) => {
    try {
      await deleteSubject(id);
    } catch (error) {
      console.error('Failed to delete subject:', error);
      alert('Nepodařilo se smazat předmět. Zkuste to prosím znovu.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-xl text-gray-600">Načítám předměty...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">🎓 VŠ / Učení</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový předmět
        </Button>
      </div>
      
      {/* Summary card */}
      {subjects.length > 0 && (
        <div className="bg-gradient-to-r from-matcha-dark to-matcha-light text-white rounded-kawaii p-6 mb-6 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm opacity-90">Celkový počet kreditů</div>
              <div className="text-3xl font-bold">{totalCredits}</div>
            </div>
            <div>
              <div className="text-sm opacity-90">Aktivní předměty</div>
              <div className="text-3xl font-bold">{activeCount}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('vse')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            filter === 'vse'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Vše
        </button>
        <button
          onClick={() => setFilter('aktivni')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            filter === 'aktivni'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Aktivní
        </button>
        <button
          onClick={() => setFilter('ukoncene')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            filter === 'ukoncene'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Ukončené
        </button>
        <button
          onClick={() => setFilter('neukoncene')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            filter === 'neukoncene'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Neukončené
        </button>
      </div>
      
      {/* Subjects list */}
      {sortedSubjects.length > 0 ? (
        <div className="space-y-4">
          {sortedSubjects.map((subject) => (
            <LearningCard
              key={subject.id}
              subject={subject}
              onDelete={handleDeleteSubject}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-xl text-gray-600 mb-2">Zatím žádné předměty</p>
          <p className="text-gray-500 mb-6">
            Začni sledovat své studium a přidej první předmět!
          </p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Vytvořit první předmět
          </Button>
        </div>
      )}
      
      {/* Learning Form Modal */}
      <LearningForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddSubject}
      />
    </div>
  );
};
