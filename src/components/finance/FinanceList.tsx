import React, { useState } from 'react';
import { useFinanceStore } from '../../stores/financeStore';
import { FinanceCard } from './FinanceCard';
import { FinanceForm } from './FinanceForm';
import { FinanceSummaryCard } from './FinanceSummaryCard';
import { Button } from '../ui';
import type { FinanceType } from '../../types';

export const FinanceList: React.FC = () => {
  const { entries, addEntry, deleteEntry, getSummary, isLoading } = useFinanceStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'vse' | FinanceType>('vse');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  
  const summary = getSummary();
  
  // Filter entries
  let filteredEntries = entries.filter((entry) => {
    if (typeFilter !== 'vse' && entry.typ !== typeFilter) return false;
    
    const entryMonth = entry.datum.substring(0, 7); // YYYY-MM
    return entryMonth === selectedMonth;
  });
  
  // Sort by date (newest first)
  filteredEntries = [...filteredEntries].sort((a, b) => {
    return new Date(b.datum).getTime() - new Date(a.datum).getTime();
  });
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">💰 Finance</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový záznam
        </Button>
      </div>
      
      {/* Summary Card */}
      <div className="mb-6">
        <FinanceSummaryCard summary={summary} />
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-kawaii p-4 mb-6 shadow-md">
        <div className="space-y-4">
          {/* Type filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Typ</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTypeFilter('vse')}
                className={`px-4 py-2 rounded-kawaii text-sm ${
                  typeFilter === 'vse'
                    ? 'bg-matcha-dark text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vše
              </button>
              <button
                onClick={() => setTypeFilter('prijem')}
                className={`px-4 py-2 rounded-kawaii text-sm flex items-center space-x-1 ${
                  typeFilter === 'prijem'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>↗️</span>
                <span>Příjmy</span>
              </button>
              <button
                onClick={() => setTypeFilter('vydaj')}
                className={`px-4 py-2 rounded-kawaii text-sm flex items-center space-x-1 ${
                  typeFilter === 'vydaj'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>↘️</span>
                <span>Výdaje</span>
              </button>
            </div>
          </div>
          
          {/* Month picker */}
          <div>
            <label className="block text-sm font-medium mb-2">Měsíc</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
            />
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Načítám záznamy...</p>
        </div>
      )}
      
      {/* Entries list */}
      {!isLoading && filteredEntries.length > 0 && (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <FinanceCard key={entry.id} entry={entry} onDelete={deleteEntry} />
          ))}
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && filteredEntries.length === 0 && entries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💸</div>
          <p className="text-xl text-gray-600 mb-2">Zatím žádné záznamy</p>
          <p className="text-gray-500 mb-6">Začni sledovat své finance a získej +5 XP za každý záznam!</p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Přidat první záznam
          </Button>
        </div>
      )}
      
      {/* Empty filter results */}
      {!isLoading && filteredEntries.length === 0 && entries.length > 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600 mb-2">Žádné záznamy pro tento měsíc</p>
          <p className="text-gray-500">Zkus změnit měsíc nebo filtr</p>
        </div>
      )}
      
      {/* Form Modal */}
      <FinanceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={addEntry}
      />
    </div>
  );
};
