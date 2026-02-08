import React, { useState } from 'react';
import type { VztahEntry, RelationshipType } from '../../types';
import { Card, Button } from '../ui';

interface RelationshipCardProps {
  entry: VztahEntry;
  onDelete: (id: string) => void;
  onMarkContacted: (id: string) => void;
}

const TYPE_EMOJIS: Record<RelationshipType, string> = {
  rodina: '👨‍👩‍👧',
  partner: '💑',
  pritel: '👫',
  kolega: '💼',
  znamý: '👋',
  ostatni: '👤',
};

const TYPE_LABELS: Record<RelationshipType, string> = {
  rodina: 'Rodina',
  partner: 'Partner',
  pritel: 'Přítel',
  kolega: 'Kolega',
  znamý: 'Známý',
  ostatni: 'Ostatní',
};

export const RelationshipCard: React.FC<RelationshipCardProps> = ({ entry, onDelete, onMarkContacted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getDaysSinceContact = () => {
    if (!entry.posledni_kontakt) return null;
    const lastContact = new Date(entry.posledni_kontakt);
    const now = new Date();
    const days = Math.floor((now.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };
  
  const isBirthdaySoon = () => {
    if (!entry.narozeniny) return false;
    const today = new Date();
    const birthday = new Date(entry.narozeniny);
    birthday.setFullYear(today.getFullYear());
    
    const daysUntil = Math.floor((birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 7;
  };
  
  const daysSinceContact = getDaysSinceContact();
  const birthdaySoon = isBirthdaySoon();
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{TYPE_EMOJIS[entry.typ_vztahu]}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{entry.jmeno}</h3>
                {birthdaySoon && <span className="text-xl">🎂</span>}
              </div>
              <p className="text-sm text-gray-500">
                {TYPE_LABELS[entry.typ_vztahu]}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Opravdu chcete smazat tento kontakt?')) {
                onDelete(entry.id);
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
        
        {daysSinceContact !== null && (
          <div className="mb-3">
            <span className="text-sm text-gray-600">
              Poslední kontakt před <strong>{daysSinceContact}</strong> dny
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-wrap gap-2">
            {entry.tagy.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-matcha-light text-matcha-dark rounded-kawaii text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onMarkContacted(entry.id)}
            variant="primary"
            className="flex-1"
          >
            Kontaktováno ✅
          </Button>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="secondary"
          >
            {isExpanded ? '▲' : '▼'}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            {entry.narozeniny && (
              <p className="text-sm">
                <strong>Narozeniny:</strong> {new Date(entry.narozeniny).toLocaleDateString('cs-CZ')}
              </p>
            )}
            {entry.kontakt && (
              <p className="text-sm">
                <strong>Kontakt:</strong> {entry.kontakt}
              </p>
            )}
            {entry.poznamka && (
              <p className="text-sm text-gray-700">
                <strong>Poznámka:</strong> {entry.poznamka}
              </p>
            )}
            {entry.pripominka_dny && (
              <p className="text-sm">
                <strong>Připomínka:</strong> po {entry.pripominka_dny} dnech
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
