import React, { useState } from 'react';
import { useRelationshipStore } from '../../stores/relationshipStore';
import { RelationshipCard } from './RelationshipCard';
import { RelationshipForm } from './RelationshipForm';
import { Button } from '../ui';
import type { RelationshipType } from '../../types';

const TYPE_FILTERS: { value: RelationshipType | 'vse'; emoji: string; label: string }[] = [
  { value: 'vse', emoji: '✨', label: 'Vše' },
  { value: 'rodina', emoji: '👨‍👩‍👧', label: 'Rodina' },
  { value: 'partner', emoji: '💑', label: 'Partner' },
  { value: 'pritel', emoji: '👫', label: 'Přítel' },
  { value: 'kolega', emoji: '💼', label: 'Kolega' },
  { value: 'známý', emoji: '👋', label: 'Známý' },
  { value: 'ostatni', emoji: '👤', label: 'Ostatní' },
];

export const RelationshipList: React.FC = () => {
  const { entries, addEntry, deleteEntry, markContacted, getContactsNeedingAttention, isLoading } = useRelationshipStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<RelationshipType | 'vse'>('vse');
  const [searchQuery, setSearchQuery] = useState('');
  
  const contactsNeedingAttention = getContactsNeedingAttention();
  
  // Filter entries
  let filteredEntries = entries.filter((entry) => {
    if (typeFilter !== 'vse' && entry.typ_vztahu !== typeFilter) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return entry.jmeno.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  // Sort by name
  filteredEntries = [...filteredEntries].sort((a, b) => {
    return a.jmeno.localeCompare(b.jmeno);
  });
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">🤝 Vztahy & Kontakty</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový kontakt
        </Button>
      </div>
      
      {/* Contacts needing attention */}
      {contactsNeedingAttention.length > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-kawaii p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Potřebují pozornost</h3>
          <div className="space-y-2">
            {contactsNeedingAttention.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between">
                <span className="text-yellow-900">{contact.jmeno}</span>
                <Button
                  onClick={() => markContacted(contact.id)}
                  variant="primary"
                  className="text-sm"
                >
                  Kontaktováno ✅
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white rounded-kawaii p-4 mb-6 shadow-md">
        <div className="space-y-4">
          {/* Type filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Typ vztahu</label>
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
          
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Hledat</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat podle jména..."
              className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-2">⏳</div>
          <p className="text-gray-600">Načítám kontakty...</p>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && filteredEntries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-kawaii shadow-md">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-xl font-bold text-matcha-dark mb-2">
            Zatím žádné kontakty
          </h3>
          <p className="text-gray-600 mb-4">
            Začni sledovat své vztahy a kontakty!
          </p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            + Přidat první kontakt
          </Button>
        </div>
      )}
      
      {/* Entries grid */}
      {!isLoading && filteredEntries.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredEntries.map((entry) => (
            <RelationshipCard
              key={entry.id}
              entry={entry}
              onDelete={deleteEntry}
              onMarkContacted={markContacted}
            />
          ))}
        </div>
      )}
      
      {/* Form Modal */}
      <RelationshipForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={async (entry) => {
          await addEntry(entry);
        }}
      />
    </div>
  );
};
