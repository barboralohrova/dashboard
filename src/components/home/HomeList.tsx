import React, { useState } from 'react';
import type { DomacnostEntry } from '../../types';
import { useHomeStore } from '../../stores/homeStore';
import { HomeCard } from './HomeCard';
import { HomeForm } from './HomeForm';
import { Button } from '../ui';

type FilterType = 'vse' | 'uklid' | 'udrzba' | 'nakup' | 'oprava' | 'zahrada' | 'ostatni';
type RoomFilterType = 'vse' | 'kuchyn' | 'koupelna' | 'obyvak' | 'loznice' | 'chodba' | 'venku';

export const HomeList: React.FC = () => {
  const { entries, getOverdueEntries, isLoading, completeEntry, deleteEntry } = useHomeStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<FilterType>('vse');
  const [roomFilter, setRoomFilter] = useState<RoomFilterType>('vse');
  
  const overdueEntries = getOverdueEntries();
  
  const filteredEntries = entries.filter(e => {
    if (typeFilter !== 'vse' && e.typ !== typeFilter) return false;
    if (roomFilter !== 'vse') {
      const roomMap: Record<RoomFilterType, string> = {
        'vse': '',
        'kuchyn': 'Kuchyň',
        'koupelna': 'Koupelna',
        'obyvak': 'Obývák',
        'loznice': 'Ložnice',
        'chodba': 'Chodba',
        'venku': 'Venku',
      };
      if (e.mistnost !== roomMap[roomFilter]) return false;
    }
    return true;
  });
  
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    // Sort by priority first
    const priorityOrder = { 'vysoká': 0, 'střední': 1, 'nízká': 2 };
    const priorityDiff = priorityOrder[a.priorita] - priorityOrder[b.priorita];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by due date
    if (a.dalsi_termin && b.dalsi_termin) {
      return new Date(a.dalsi_termin).getTime() - new Date(b.dalsi_termin).getTime();
    }
    if (a.dalsi_termin) return -1;
    if (b.dalsi_termin) return 1;
    return 0;
  });
  
  const handleAddEntry = async (entryData: Omit<DomacnostEntry, 'id' | 'vytvoreno'>) => {
    try {
      await useHomeStore.getState().addEntry(entryData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add home entry:', error);
      alert('Nepodařilo se vytvořit úkol. Zkuste to prosím znovu.');
    }
  };
  
  const handleCompleteEntry = async (id: string) => {
    try {
      await completeEntry(id);
    } catch (error) {
      console.error('Failed to complete home entry:', error);
      alert('Nepodařilo se dokončit úkol. Zkuste to prosím znovu.');
    }
  };
  
  const handleDeleteEntry = async (id: string) => {
    try {
      await deleteEntry(id);
    } catch (error) {
      console.error('Failed to delete home entry:', error);
      alert('Nepodařilo se smazat úkol. Zkuste to prosím znovu.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <p className="text-xl text-gray-600">Načítám domácnost...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">🏠 Domácnost</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový úkol
        </Button>
      </div>
      
      {/* Type filter buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Typ</label>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setTypeFilter('vse')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              typeFilter === 'vse'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Vše
          </button>
          <button
            onClick={() => setTypeFilter('uklid')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              typeFilter === 'uklid'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            🧹 Úklid
          </button>
          <button
            onClick={() => setTypeFilter('udrzba')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              typeFilter === 'udrzba'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            🔧 Údržba
          </button>
          <button
            onClick={() => setTypeFilter('nakup')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              typeFilter === 'nakup'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            🛒 Nákup
          </button>
          <button
            onClick={() => setTypeFilter('oprava')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              typeFilter === 'oprava'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            🔨 Oprava
          </button>
          <button
            onClick={() => setTypeFilter('zahrada')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              typeFilter === 'zahrada'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            🌱 Zahrada
          </button>
          <button
            onClick={() => setTypeFilter('ostatni')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              typeFilter === 'ostatni'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            📋 Ostatní
          </button>
        </div>
      </div>
      
      {/* Room filter buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Místnost</label>
        <div className="flex flex-wrap gap-2 mb-6">
          {(['vse', 'kuchyn', 'koupelna', 'obyvak', 'loznice', 'chodba', 'venku'] as RoomFilterType[]).map((room) => (
            <button
              key={room}
              onClick={() => setRoomFilter(room)}
              className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
                roomFilter === room
                  ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {room === 'vse' ? 'Vše' : 
               room === 'kuchyn' ? 'Kuchyň' :
               room === 'koupelna' ? 'Koupelna' :
               room === 'obyvak' ? 'Obývák' :
               room === 'loznice' ? 'Ložnice' :
               room === 'chodba' ? 'Chodba' :
               'Venku'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Overdue entries */}
      {overdueEntries.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-red-600 mb-4">
            ⚠️ K vyřízení
          </h3>
          <div className="space-y-4">
            {overdueEntries.map((entry) => (
              <HomeCard
                key={entry.id}
                entry={entry}
                onComplete={handleCompleteEntry}
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
            Všechny úkoly
          </h3>
          
          {sortedEntries.map((entry) => (
            <HomeCard
              key={entry.id}
              entry={entry}
              onComplete={handleCompleteEntry}
              onDelete={handleDeleteEntry}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <p className="text-xl text-gray-600 mb-2">Zatím žádné úkoly</p>
          <p className="text-gray-500 mb-6">
            Začni organizovat svou domácnost a vytvoř první úkol!
          </p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Vytvořit první úkol
          </Button>
        </div>
      )}
      
      {/* Home Form Modal */}
      <HomeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddEntry}
      />
    </div>
  );
};
