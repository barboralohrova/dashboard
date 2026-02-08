import React, { useState } from 'react';
import { useInsuranceStore } from '../../stores/insuranceStore';
import { InsuranceCard } from './InsuranceCard';
import { InsuranceForm } from './InsuranceForm';
import { Button } from '../ui';
import type { InsuranceType } from '../../types';

const TYPE_FILTERS: { value: InsuranceType | 'vse'; emoji: string; label: string }[] = [
  { value: 'vse', emoji: '✨', label: 'Vše' },
  { value: 'zdravotni', emoji: '🏥', label: 'Zdravotní' },
  { value: 'zivotni', emoji: '💚', label: 'Životní' },
  { value: 'cestovni', emoji: '✈️', label: 'Cestovní' },
  { value: 'majetek', emoji: '🏠', label: 'Majetek' },
  { value: 'auto', emoji: '🚗', label: 'Auto' },
  { value: 'odpovědnost', emoji: '⚖️', label: 'Odpovědnost' },
  { value: 'ostatni', emoji: '📋', label: 'Ostatní' },
];

export const InsuranceList: React.FC = () => {
  const { entries, addEntry, deleteEntry, getExpiringPolicies, getMonthlyCost, isLoading } = useInsuranceStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<InsuranceType | 'vse'>('vse');
  
  const expiringPolicies = getExpiringPolicies();
  const monthlyCost = getMonthlyCost();
  
  // Filter entries
  let filteredEntries = entries.filter((entry) => {
    if (typeFilter !== 'vse' && entry.typ_pojisteni !== typeFilter) return false;
    return true;
  });
  
  // Sort by monthly cost (highest first)
  filteredEntries = [...filteredEntries].sort((a, b) => {
    return b.castka_mesicne - a.castka_mesicne;
  });
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">🛡️ Pojištění</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nová pojistka
        </Button>
      </div>
      
      {/* Monthly cost summary */}
      <div className="bg-gradient-to-r from-matcha-light to-[#C5D8B5] rounded-kawaii p-6 mb-6 shadow-md">
        <h3 className="text-lg font-semibold text-matcha-dark mb-2">Měsíční náklady</h3>
        <p className="text-3xl font-bold text-matcha-dark">{monthlyCost} Kč</p>
      </div>
      
      {/* Expiring policies warning */}
      {expiringPolicies.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-kawaii p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Brzy končí</h3>
          <div className="space-y-2">
            {expiringPolicies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between">
                <span className="text-yellow-900">{policy.nazev}</span>
                <span className="text-sm text-yellow-700">
                  {policy.datum_konce && new Date(policy.datum_konce).toLocaleDateString('cs-CZ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white rounded-kawaii p-4 mb-6 shadow-md">
        <div>
          <label className="block text-sm font-medium mb-2">Typ pojištění</label>
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map(({ value, emoji, label }) => (
              <button
                key={value}
                onClick={() => setTypeFilter(value)}
                className={`px-3 py-1.5 rounded-kawaii text-sm flex items-center space-x-1 ${
                  typeFilter === value
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
          <p className="text-gray-600">Načítám pojistky...</p>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && filteredEntries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-kawaii shadow-md">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold text-matcha-dark mb-2">
            Zatím žádné pojistky
          </h3>
          <p className="text-gray-600 mb-4">
            Začni sledovat své pojištění!
          </p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            + Přidat první pojistku
          </Button>
        </div>
      )}
      
      {/* Entries grid */}
      {!isLoading && filteredEntries.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredEntries.map((entry) => (
            <InsuranceCard
              key={entry.id}
              entry={entry}
              onDelete={deleteEntry}
            />
          ))}
        </div>
      )}
      
      {/* Form Modal */}
      <InsuranceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={async (entry) => {
          await addEntry(entry);
        }}
      />
    </div>
  );
};
