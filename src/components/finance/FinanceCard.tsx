import React from 'react';
import type { FinanceEntry } from '../../types';
import { formatDate } from '../../utils/helpers';
import { Card } from '../ui';

interface FinanceCardProps {
  entry: FinanceEntry;
  onDelete: (id: string) => void;
}

const KATEGORIE_COLORS: Record<string, string> = {
  'Jídlo': 'bg-orange-100 text-orange-700',
  'Bydlení': 'bg-blue-100 text-blue-700',
  'Doprava': 'bg-purple-100 text-purple-700',
  'Zábava': 'bg-pink-100 text-pink-700',
  'Zdraví': 'bg-green-100 text-green-700',
  'Oblečení': 'bg-yellow-100 text-yellow-700',
  'Vzdělávání': 'bg-indigo-100 text-indigo-700',
  'Úspory': 'bg-teal-100 text-teal-700',
  'Plat': 'bg-emerald-100 text-emerald-700',
  'Brigáda': 'bg-lime-100 text-lime-700',
  'Ostatní': 'bg-gray-100 text-gray-700',
};

export const FinanceCard: React.FC<FinanceCardProps> = ({ entry, onDelete }) => {
  const isIncome = entry.typ === 'prijem';
  const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
  const typeIcon = isIncome ? '↗️' : '↘️';
  const kategorieColor = KATEGORIE_COLORS[entry.kategorie] || 'bg-gray-100 text-gray-700';
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="text-2xl">{typeIcon}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className={`text-2xl font-bold ${amountColor}`}>
                  {isIncome ? '+' : '-'}{entry.castka.toLocaleString('cs-CZ')} Kč
                </h3>
                <p className="text-sm text-gray-500">{formatDate(entry.datum)}</p>
              </div>
            </div>
            
            {entry.popis && (
              <p className="text-gray-700 mb-2">{entry.popis}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-kawaii text-xs font-medium ${kategorieColor}`}>
                {entry.kategorie}
              </span>
              
              {entry.opakovani !== 'jednorázový' && (
                <span className="px-3 py-1 rounded-kawaii text-xs font-medium bg-matcha-light text-matcha-dark">
                  🔄 {entry.opakovani}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            if (confirm('Opravdu chcete smazat tento záznam?')) {
              onDelete(entry.id);
            }
          }}
          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
        >
          🗑️
        </button>
      </div>
    </Card>
  );
};
