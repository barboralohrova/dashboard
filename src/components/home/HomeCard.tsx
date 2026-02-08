import React from 'react';
import type { DomacnostEntry, HomeTaskType } from '../../types';
import { formatDate } from '../../utils/helpers';
import { Card } from '../ui';

interface HomeCardProps {
  entry: DomacnostEntry;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TYPE_EMOJIS: Record<HomeTaskType, string> = {
  uklid: '🧹',
  udrzba: '🔧',
  nakup: '🛒',
  oprava: '🔨',
  zahrada: '🌱',
  ostatni: '📋',
};

const PRIORITY_COLORS = {
  'vysoká': 'bg-red-100 text-red-700 border-red-300',
  'střední': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'nízká': 'bg-green-100 text-green-700 border-green-300',
};

const FREQUENCY_LABELS = {
  'jednorázový': 'Jednorázový',
  'denní': 'Denní',
  'týdenní': 'Týdenní',
  'měsíční': 'Měsíční',
  'roční': 'Roční',
};

export const HomeCard: React.FC<HomeCardProps> = ({ entry, onComplete, onDelete }) => {
  const isOverdue = entry.dalsi_termin && new Date(entry.dalsi_termin) < new Date();
  
  return (
    <Card className={`hover:shadow-lg transition-all ${isOverdue ? 'border-2 border-red-300' : ''}`}>
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <span className="text-3xl">{TYPE_EMOJIS[entry.typ]}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{entry.nazev}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className={`px-2 py-1 rounded-kawaii text-xs font-medium border ${PRIORITY_COLORS[entry.priorita]}`}>
                  {entry.priorita}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-kawaii text-xs">
                  {FREQUENCY_LABELS[entry.frekvence]}
                </span>
                {entry.mistnost && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-kawaii text-xs">
                    {entry.mistnost}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Opravdu chcete smazat tento úkol?')) {
                onDelete(entry.id);
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
          >
            🗑️
          </button>
        </div>
        
        <div className="space-y-2 mb-4">
          {entry.posledni_splneni && (
            <div className="text-sm">
              <span className="text-gray-500">Naposledy splněno:</span>{' '}
              <span className="text-gray-700">{formatDate(entry.posledni_splneni)}</span>
            </div>
          )}
          
          {entry.dalsi_termin && (
            <div className="text-sm">
              <span className="text-gray-500">Další termín:</span>{' '}
              <span className={isOverdue ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                {formatDate(entry.dalsi_termin)}
                {isOverdue && ' ⚠️'}
              </span>
            </div>
          )}
          
          {entry.poznamka && (
            <div className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
              {entry.poznamka}
            </div>
          )}
        </div>
        
        <button
          onClick={() => onComplete(entry.id)}
          className="w-full px-4 py-2 bg-gradient-to-r from-matcha-dark to-[#8BAA7E] text-white rounded-kawaii hover:scale-[1.02] hover:shadow-lg transition-all duration-200 active:scale-[0.98] font-medium"
        >
          Hotovo ✅
        </button>
      </div>
    </Card>
  );
};
