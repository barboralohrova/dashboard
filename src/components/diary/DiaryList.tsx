import React, { useState } from 'react';
import { useDiaryStore } from '../../stores/diaryStore';
import { DiaryCard } from './DiaryCard';
import { DiaryForm } from './DiaryForm';
import { Button, Modal } from '../ui';
import type { DenikEntry, DenikMood } from '../../types';

const MOOD_FILTERS: { value: DenikMood | 'vse'; emoji: string; label: string }[] = [
  { value: 'vse', emoji: '✨', label: 'Vše' },
  { value: 'skvele', emoji: '🤩', label: 'Skvěle' },
  { value: 'dobre', emoji: '😊', label: 'Dobře' },
  { value: 'ok', emoji: '😐', label: 'OK' },
  { value: 'spatne', emoji: '😔', label: 'Špatně' },
  { value: 'hrozne', emoji: '😢', label: 'Hrozně' },
];

export const DiaryList: React.FC = () => {
  const { entries, addEntry, deleteEntry, isLoading } = useDiaryStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DenikEntry | null>(null);
  const [moodFilter, setMoodFilter] = useState<DenikMood | 'vse'>('vse');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter entries
  let filteredEntries = entries.filter((entry) => {
    if (moodFilter !== 'vse' && entry.nalada !== moodFilter) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        entry.nazev.toLowerCase().includes(query) ||
        entry.obsah.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort by date (newest first)
  filteredEntries = [...filteredEntries].sort((a, b) => {
    return new Date(b.datum).getTime() - new Date(a.datum).getTime();
  });
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">📝 Tajný deníček</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový zápis
        </Button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-kawaii p-4 mb-6 shadow-md">
        <div className="space-y-4">
          {/* Mood filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Nálada</label>
            <div className="flex flex-wrap gap-2">
              {MOOD_FILTERS.map(({ value, emoji, label }) => (
                <button
                  key={value}
                  onClick={() => setMoodFilter(value)}
                  className={`px-3 py-1.5 rounded-kawaii text-sm flex items-center space-x-1 ${
                    moodFilter === value
                      ? 'bg-matcha-dark text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Hledat</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat v názvech a obsahu..."
              className="w-full px-4 py-2 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
            />
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4 animate-bounce-gentle">⏳</div>
          <p className="text-gray-600">(◕‿◕) Načítám záznamy...</p>
        </div>
      )}
      
      {/* Entries list */}
      {!isLoading && filteredEntries.length > 0 && (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <DiaryCard
              key={entry.id}
              entry={entry}
              onDelete={deleteEntry}
              onClick={setSelectedEntry}
            />
          ))}
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && filteredEntries.length === 0 && entries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📖</div>
          <p className="text-xl text-gray-600 mb-2">(◕ᴗ◕✿) Zatím žádné záznamy</p>
          <p className="text-gray-500 mb-6">Začni psát svůj deník a získej +10 XP za každý zápis!</p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Vytvořit první zápis
          </Button>
        </div>
      )}
      
      {/* Empty search results */}
      {!isLoading && filteredEntries.length === 0 && entries.length > 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600 mb-2">(・_・?) Žádné výsledky</p>
          <p className="text-gray-500">Zkus změnit filtr nebo hledaný výraz</p>
        </div>
      )}
      
      {/* Form Modal */}
      <DiaryForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={addEntry}
      />
      
      {/* Detail Modal */}
      {selectedEntry && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEntry(null)}
          title={selectedEntry.nazev}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {new Date(selectedEntry.datum).toLocaleDateString('cs-CZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="text-3xl">
                {MOOD_FILTERS.find(m => m.value === selectedEntry.nalada)?.emoji}
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-gray-700">{selectedEntry.obsah}</p>
            </div>
            
            {selectedEntry.tagy.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                {selectedEntry.tagy.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-matcha-light text-matcha-dark rounded-kawaii text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={() => setSelectedEntry(null)}>
                Zavřít
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
