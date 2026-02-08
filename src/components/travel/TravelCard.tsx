import React, { useState } from 'react';
import type { CestovaniEntry, TripStatus } from '../../types';
import { Card, Button } from '../ui';

interface TravelCardProps {
  entry: CestovaniEntry;
  onDelete: (id: string) => void;
}

const STATUS_EMOJIS: Record<TripStatus, string> = {
  planovany: '📋',
  probihajici: '🌍',
  dokonceny: '✅',
  zruseny: '❌',
};

const STATUS_LABELS: Record<TripStatus, string> = {
  planovany: 'Plánovaný',
  probihajici: 'Probíhající',
  dokonceny: 'Dokončený',
  zruseny: 'Zrušený',
};

const STATUS_COLORS: Record<TripStatus, string> = {
  planovany: 'bg-blue-100 text-blue-800',
  probihajici: 'bg-green-100 text-green-800',
  dokonceny: 'bg-gray-100 text-gray-800',
  zruseny: 'bg-red-100 text-red-800',
};

export const TravelCard: React.FC<TravelCardProps> = ({ entry, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getBudgetPercentage = () => {
    if (!entry.rozpocet || !entry.utraceno) return null;
    return (entry.utraceno / entry.rozpocet) * 100;
  };
  
  const isOverBudget = () => {
    if (!entry.rozpocet || !entry.utraceno) return false;
    return entry.utraceno > entry.rozpocet;
  };
  
  const budgetPercentage = getBudgetPercentage();
  const overBudget = isOverBudget();
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{STATUS_EMOJIS[entry.stav]}</span>
            <div>
              <h3 className="text-lg font-semibold">{entry.nazev}</h3>
              <p className="text-sm text-gray-500">
                📍 {entry.destinace}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Opravdu chcete smazat tento výlet?')) {
                onDelete(entry.id);
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
        
        {(entry.datum_od || entry.datum_do) && (
          <div className="mb-3 text-sm text-gray-600">
            📅{' '}
            {entry.datum_od && new Date(entry.datum_od).toLocaleDateString('cs-CZ')}
            {entry.datum_do && ` - ${new Date(entry.datum_do).toLocaleDateString('cs-CZ')}`}
          </div>
        )}
        
        {/* Budget progress bar */}
        {entry.rozpocet && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Rozpočet</span>
              <span className={overBudget ? 'text-red-600 font-bold' : 'text-gray-800'}>
                {entry.utraceno || 0} / {entry.rozpocet} Kč
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  overBudget ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetPercentage || 0, 100)}%` }}
              />
            </div>
            {overBudget && (
              <p className="text-xs text-red-600 mt-1">
                ⚠️ Překročen rozpočet o {entry.utraceno! - entry.rozpocet} Kč
              </p>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-kawaii text-sm ${STATUS_COLORS[entry.stav]}`}>
            {STATUS_LABELS[entry.stav]}
          </span>
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
            onClick={() => setIsExpanded(!isExpanded)}
            variant="secondary"
            className="flex-1"
          >
            {isExpanded ? '▲ Méně' : '▼ Více'}
          </Button>
        </div>
        
        {isExpanded && entry.poznamka && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Poznámka:</strong> {entry.poznamka}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
