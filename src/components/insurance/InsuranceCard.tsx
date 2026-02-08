import React, { useState } from 'react';
import type { PojisteniEntry, InsuranceType } from '../../types';
import { Card, Button } from '../ui';

interface InsuranceCardProps {
  entry: PojisteniEntry;
  onDelete: (id: string) => void;
}

const TYPE_EMOJIS: Record<InsuranceType, string> = {
  zdravotni: '🏥',
  zivotni: '💚',
  cestovni: '✈️',
  majetek: '🏠',
  auto: '🚗',
  odpovědnost: '⚖️',
  ostatni: '📋',
};

const TYPE_LABELS: Record<InsuranceType, string> = {
  zdravotni: 'Zdravotní',
  zivotni: 'Životní',
  cestovni: 'Cestovní',
  majetek: 'Majetek',
  auto: 'Auto',
  odpovědnost: 'Odpovědnost',
  ostatni: 'Ostatní',
};

export const InsuranceCard: React.FC<InsuranceCardProps> = ({ entry, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isExpiring = () => {
    if (!entry.datum_konce) return false;
    const endDate = new Date(entry.datum_konce);
    const now = new Date();
    const daysUntil = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (entry.pripominka_pred_koncem_dny) {
      return daysUntil <= entry.pripominka_pred_koncem_dny && daysUntil >= 0;
    }
    
    return daysUntil <= 30 && daysUntil >= 0;
  };
  
  const getDaysUntilExpiry = () => {
    if (!entry.datum_konce) return null;
    const endDate = new Date(entry.datum_konce);
    const now = new Date();
    return Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  const expiring = isExpiring();
  const daysUntilExpiry = getDaysUntilExpiry();
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{TYPE_EMOJIS[entry.typ_pojisteni]}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{entry.nazev}</h3>
                {expiring && <span className="text-xl">⚠️</span>}
              </div>
              <p className="text-sm text-gray-500">
                {TYPE_LABELS[entry.typ_pojisteni]}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Opravdu chcete smazat tuto pojistku?')) {
                onDelete(entry.id);
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
        
        <div className="space-y-2 mb-3">
          <p className="text-sm">
            <strong>Pojišťovna:</strong> {entry.pojistovna}
          </p>
          {entry.cislo_smlouvy && (
            <p className="text-sm">
              <strong>Číslo smlouvy:</strong> {entry.cislo_smlouvy}
            </p>
          )}
          <p className="text-lg font-bold text-matcha-dark">
            {entry.castka_mesicne} Kč / měsíc
          </p>
          {expiring && daysUntilExpiry !== null && (
            <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-kawaii">
              <strong>⚠️ Končí za {daysUntilExpiry} dní</strong>
            </div>
          )}
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
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <p className="text-sm">
              <strong>Začátek:</strong> {new Date(entry.datum_zacatku).toLocaleDateString('cs-CZ')}
            </p>
            {entry.datum_konce && (
              <p className="text-sm">
                <strong>Konec:</strong> {new Date(entry.datum_konce).toLocaleDateString('cs-CZ')}
              </p>
            )}
            {entry.poznamka && (
              <p className="text-sm text-gray-700">
                <strong>Poznámka:</strong> {entry.poznamka}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
