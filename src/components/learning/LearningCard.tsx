import React, { useState } from 'react';
import type { Predmet } from '../../types';
import { Card } from '../ui';
import { useLearningStore } from '../../stores/learningStore';

interface LearningCardProps {
  subject: Predmet;
  onDelete: (id: string) => void;
}

const STATUS_COLORS = {
  aktivni: 'bg-green-100 text-green-700 border-green-300',
  ukoncen: 'bg-blue-100 text-blue-700 border-blue-300',
  neukoncen: 'bg-red-100 text-red-700 border-red-300',
};

const STATUS_LABELS = {
  aktivni: 'Aktivní',
  ukoncen: 'Ukončen',
  neukoncen: 'Neukončen',
};

export const LearningCard: React.FC<LearningCardProps> = ({ subject, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hodnoceni, setHodnoceni] = useState(subject.hodnoceni || '');
  const [stav, setStav] = useState(subject.stav);
  const { updateSubject } = useLearningStore();
  
  const handleSaveEdit = async () => {
    try {
      await updateSubject(subject.id, { hodnoceni, stav });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update subject:', error);
      alert('Nepodařilo se aktualizovat předmět.');
    }
  };
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{subject.ikona || '📚'}</span>
            <div>
              <h3 className="text-lg font-semibold">{subject.nazev}</h3>
              <p className="text-sm text-gray-500">{subject.kod}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-matcha-dark transition-colors"
            >
              ✏️
            </button>
            <button
              onClick={() => {
                if (confirm('Opravdu chcete smazat tento předmět?')) {
                  onDelete(subject.id);
                }
              }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              🗑️
            </button>
          </div>
        </div>
        
        {isEditing ? (
          <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-kawaii">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hodnocení
              </label>
              <input
                type="text"
                value={hodnoceni}
                onChange={(e) => setHodnoceni(e.target.value)}
                placeholder="A, B, C, ..."
                className="w-full px-3 py-2 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stav
              </label>
              <div className="flex gap-2">
                {(['aktivni', 'ukoncen', 'neukoncen'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStav(s)}
                    className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
                      stav === s
                        ? 'border-matcha-dark bg-matcha-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-matcha-dark text-white rounded-kawaii hover:bg-opacity-90"
              >
                Uložit
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setHodnoceni(subject.hodnoceni || '');
                  setStav(subject.stav);
                }}
                className="px-4 py-2 bg-gray-200 rounded-kawaii hover:bg-gray-300"
              >
                Zrušit
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-500">
                {subject.semestr}
              </span>
              <span className="px-2 py-1 bg-matcha-light text-matcha-dark rounded-kawaii text-xs font-medium">
                {subject.kredity} kr.
              </span>
              {subject.hodnoceni && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-kawaii text-xs font-medium">
                  {subject.hodnoceni}
                </span>
              )}
              <span className={`px-2 py-1 rounded-kawaii text-xs font-medium border ${STATUS_COLORS[subject.stav]}`}>
                {STATUS_LABELS[subject.stav]}
              </span>
            </div>
            
            {subject.vyucujici && (
              <div className="text-sm">
                <span className="text-gray-500">Vyučující:</span>{' '}
                <span className="text-gray-700">{subject.vyucujici}</span>
              </div>
            )}
            
            {subject.poznamka && (
              <div className="mt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-matcha-dark hover:underline"
                >
                  {isExpanded ? '▼ Skrýt poznámku' : '▶ Zobrazit poznámku'}
                </button>
                {isExpanded && (
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                    {subject.poznamka}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
