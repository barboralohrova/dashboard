import React, { useState } from 'react';
import type { ZdraviEntry, HealthEntryType } from '../../types';
import { formatDate } from '../../utils/helpers';
import { Card } from '../ui';

interface HealthCardProps {
  entry: ZdraviEntry;
  onDelete: (id: string) => void;
}

const TYPE_EMOJIS: Record<HealthEntryType, string> = {
  prohlidka: '🏥',
  lek: '💊',
  mereni: '📏',
  ockovani: '💉',
  alergie: '🤧',
  ostatni: '📋',
};

const TYPE_LABELS: Record<HealthEntryType, string> = {
  prohlidka: 'Prohlídka',
  lek: 'Lék',
  mereni: 'Měření',
  ockovani: 'Očkování',
  alergie: 'Alergie',
  ostatni: 'Ostatní',
};

export const HealthCard: React.FC<HealthCardProps> = ({ entry, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{TYPE_EMOJIS[entry.typ]}</span>
            <div>
              <h3 className="text-lg font-semibold">{entry.nazev}</h3>
              <p className="text-sm text-gray-500">{formatDate(entry.datum)}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Opravdu chcete smazat tento záznam?')) {
                onDelete(entry.id);
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
        
        <div className="space-y-2">
          {entry.lekar && (
            <div className="text-sm">
              <span className="text-gray-500">Lékař:</span>{' '}
              <span className="text-gray-700">{entry.lekar}</span>
            </div>
          )}
          
          {entry.vysledek && (
            <div className="text-sm">
              <span className="text-gray-500">Výsledek:</span>{' '}
              <span className="text-gray-700">{entry.vysledek}</span>
            </div>
          )}
          
          {entry.dalsi_termin && (
            <div className="text-sm">
              <span className="text-gray-500">Další termín:</span>{' '}
              <span className="text-green-600 font-medium">{formatDate(entry.dalsi_termin)}</span>
            </div>
          )}
          
          {entry.popis && (
            <div className="mt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-matcha-dark hover:underline"
              >
                {isExpanded ? '▼ Skrýt popis' : '▶ Zobrazit popis'}
              </button>
              {isExpanded && (
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                  {entry.popis}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4">
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
            {TYPE_LABELS[entry.typ]}
          </span>
        </div>
      </div>
    </Card>
  );
};
