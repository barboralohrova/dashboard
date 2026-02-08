import React, { useState } from 'react';
import { useTravelStore } from '../../stores/travelStore';
import { TravelCard } from './TravelCard';
import { TravelForm } from './TravelForm';
import { Button } from '../ui';
import type { TripStatus } from '../../types';

const STATUS_FILTERS: { value: TripStatus | 'vse'; emoji: string; label: string }[] = [
  { value: 'vse', emoji: '✨', label: 'Vše' },
  { value: 'planovany', emoji: '📋', label: 'Plánovaný' },
  { value: 'probihajici', emoji: '🌍', label: 'Probíhající' },
  { value: 'dokonceny', emoji: '✅', label: 'Dokončený' },
  { value: 'zruseny', emoji: '❌', label: 'Zrušený' },
];

const STATUS_ORDER: Record<TripStatus, number> = {
  probihajici: 1,
  planovany: 2,
  dokonceny: 3,
  zruseny: 4,
};

export const TravelList: React.FC = () => {
  const { entries, addEntry, deleteEntry, getTotalBudget, isLoading } = useTravelStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TripStatus | 'vse'>('vse');
  
  const budget = getTotalBudget();
  
  // Filter entries
  let filteredEntries = entries.filter((entry) => {
    if (statusFilter !== 'vse' && entry.stav !== statusFilter) return false;
    return true;
  });
  
  // Sort: probíhající first, then plánovaný, then dokončený, then zrušený
  filteredEntries = [...filteredEntries].sort((a, b) => {
    return STATUS_ORDER[a.stav] - STATUS_ORDER[b.stav];
  });
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">✈️ Cestování</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový výlet
        </Button>
      </div>
      
      {/* Budget overview */}
      <div className="bg-gradient-to-r from-matcha-light to-[#C5D8B5] rounded-kawaii p-6 mb-6 shadow-md">
        <h3 className="text-lg font-semibold text-matcha-dark mb-3">Přehled rozpočtu</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Celkový rozpočet</p>
            <p className="text-2xl font-bold text-matcha-dark">{budget.total} Kč</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Utraceno</p>
            <p className="text-2xl font-bold text-matcha-dark">{budget.spent} Kč</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Zbývá</p>
            <p className={`text-2xl font-bold ${budget.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {budget.remaining} Kč
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-kawaii p-4 mb-6 shadow-md">
        <div>
          <label className="block text-sm font-medium mb-2">Stav</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map(({ value, emoji, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`px-3 py-1.5 rounded-kawaii text-sm flex items-center space-x-1 ${
                  statusFilter === value
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
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-2">⏳</div>
          <p className="text-gray-600">Načítám výlety...</p>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && filteredEntries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-kawaii shadow-md">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-xl font-bold text-matcha-dark mb-2">
            Zatím žádné výlety
          </h3>
          <p className="text-gray-600 mb-4">
            Začni plánovat svá dobrodružství!
          </p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            + Přidat první výlet
          </Button>
        </div>
      )}
      
      {/* Entries grid */}
      {!isLoading && filteredEntries.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredEntries.map((entry) => (
            <TravelCard
              key={entry.id}
              entry={entry}
              onDelete={deleteEntry}
            />
          ))}
        </div>
      )}
      
      {/* Form Modal */}
      <TravelForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={async (entry) => {
          await addEntry(entry);
        }}
      />
    </div>
  );
};
