import React, { useState } from 'react';
import type { HealthEntryType, ZdraviEntry } from '../../types';
import { useHealthStore } from '../../stores/healthStore';
import { HealthCard } from './HealthCard';
import { HealthForm } from './HealthForm';
import { Button } from '../ui';

export const HealthList: React.FC = () => {
  const { entries, getUpcomingAppointments, isLoading, deleteEntry } = useHealthStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<HealthEntryType | 'vse'>('vse');
  
  const upcomingAppointments = getUpcomingAppointments();
  
  const filteredEntries = selectedType === 'vse' 
    ? entries 
    : entries.filter(e => e.typ === selectedType);
  
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    return new Date(b.datum).getTime() - new Date(a.datum).getTime();
  });
  
  const handleAddEntry = async (entryData: Omit<ZdraviEntry, 'id' | 'vytvoreno'>) => {
    try {
      await useHealthStore.getState().addEntry(entryData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add health entry:', error);
      alert('Nepodařilo se vytvořit záznam. Zkuste to prosím znovu.');
    }
  };
  
  const handleDeleteEntry = async (id: string) => {
    try {
      await deleteEntry(id);
    } catch (error) {
      console.error('Failed to delete health entry:', error);
      alert('Nepodařilo se smazat záznam. Zkuste to prosím znovu.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-bounce-gentle">🏥</div>
          <p className="text-xl text-gray-600">(◕‿◕) Načítám zdravotní záznamy...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">🏥 Zdraví</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový záznam
        </Button>
      </div>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedType('vse')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            selectedType === 'vse'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Vše
        </button>
        <button
          onClick={() => setSelectedType('prohlidka')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            selectedType === 'prohlidka'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          🏥 Prohlídka
        </button>
        <button
          onClick={() => setSelectedType('lek')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            selectedType === 'lek'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          💊 Lék
        </button>
        <button
          onClick={() => setSelectedType('mereni')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            selectedType === 'mereni'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          📏 Měření
        </button>
        <button
          onClick={() => setSelectedType('ockovani')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            selectedType === 'ockovani'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          💉 Očkování
        </button>
        <button
          onClick={() => setSelectedType('alergie')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            selectedType === 'alergie'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          🤧 Alergie
        </button>
        <button
          onClick={() => setSelectedType('ostatni')}
          className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
            selectedType === 'ostatni'
              ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          📋 Ostatní
        </button>
      </div>
      
      {/* Upcoming appointments */}
      {upcomingAppointments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            📅 Nadcházející termíny
          </h3>
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 3).map((entry) => (
              <HealthCard
                key={entry.id}
                entry={entry}
                onDelete={handleDeleteEntry}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* All entries */}
      {sortedEntries.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Všechny záznamy
          </h3>
          
          {sortedEntries.map((entry) => (
            <HealthCard
              key={entry.id}
              entry={entry}
              onDelete={handleDeleteEntry}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏥</div>
          <p className="text-xl text-gray-600 mb-2">Zatím žádné zdravotní záznamy</p>
          <p className="text-gray-500 mb-6">
            Začni sledovat své zdraví a vytvoř první záznam!
          </p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Vytvořit první záznam
          </Button>
        </div>
      )}
      
      {/* Health Form Modal */}
      <HealthForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddEntry}
      />
    </div>
  );
};
