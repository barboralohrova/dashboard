import React from 'react';
import type { DenikEntry, DenikMood } from '../../types';
import { formatDate } from '../../utils/helpers';
import { Card } from '../ui';

interface DiaryCardProps {
  entry: DenikEntry;
  onDelete: (id: string) => void;
  onClick: (entry: DenikEntry) => void;
}

const MOOD_EMOJIS: Record<DenikMood, string> = {
  skvele: '🤩',
  dobre: '😊',
  ok: '😐',
  spatne: '😔',
  hrozne: '😢',
};

const MOOD_LABELS: Record<DenikMood, string> = {
  skvele: 'Skvěle',
  dobre: 'Dobře',
  ok: 'OK',
  spatne: 'Špatně',
  hrozne: 'Hrozně',
};

export const DiaryCard: React.FC<DiaryCardProps> = ({ entry, onDelete, onClick }) => {
  const preview = entry.obsah.length > 100 
    ? entry.obsah.substring(0, 100) + '...' 
    : entry.obsah;
  
  return (
    <Card className="hover:shadow-lg cursor-pointer transition-all">
      <div onClick={() => onClick(entry)}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">{MOOD_EMOJIS[entry.nalada]}</span>
            <div>
              <h3 className="text-lg font-semibold">{entry.nazev}</h3>
              <p className="text-sm text-gray-500">{formatDate(entry.datum)}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Opravdu chcete smazat tento zápis?')) {
                onDelete(entry.id);
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
        
        <p className="text-gray-700 mb-3 line-clamp-3">{preview}</p>
        
        <div className="flex items-center justify-between">
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
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-kawaii">
            {MOOD_LABELS[entry.nalada]}
          </span>
        </div>
      </div>
    </Card>
  );
};
