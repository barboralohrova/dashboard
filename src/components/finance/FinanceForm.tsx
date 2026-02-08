import React, { useState } from 'react';
import type { FinanceType, FinanceEntry } from '../../types';
import { Modal, Button, Input } from '../ui';

interface FinanceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<FinanceEntry, 'id' | 'vytvoreno'>) => void;
}

const CATEGORIES = [
  'Jídlo',
  'Bydlení',
  'Doprava',
  'Zábava',
  'Zdraví',
  'Oblečení',
  'Vzdělávání',
  'Úspory',
  'Plat',
  'Brigáda',
  'Ostatní',
];

export const FinanceForm: React.FC<FinanceFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [typ, setTyp] = useState<FinanceType>('vydaj');
  const [castka, setCastka] = useState('');
  const [kategorie, setKategorie] = useState('Ostatní');
  const [popis, setPopis] = useState('');
  const [datum, setDatum] = useState(new Date().toISOString().split('T')[0]);
  const [opakovani, setOpakovani] = useState<'jednorázový' | 'měsíční' | 'týdenní'>('jednorázový');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!castka || parseFloat(castka) <= 0) {
      alert('Zadejte platnou částku');
      return;
    }
    
    onSubmit({
      typ,
      castka: parseFloat(castka),
      kategorie,
      popis: popis.trim(),
      datum,
      opakovani,
    });
    
    // Reset form
    setTyp('vydaj');
    setCastka('');
    setKategorie('Ostatní');
    setPopis('');
    setDatum(new Date().toISOString().split('T')[0]);
    setOpakovani('jednorázový');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="💰 Nový finanční záznam" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type toggle */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Typ
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTyp('prijem')}
              className={`flex-1 px-4 py-3 rounded-kawaii border-2 transition-colors ${
                typ === 'prijem'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">↗️</div>
              <div className="font-medium">Příjem</div>
            </button>
            <button
              type="button"
              onClick={() => setTyp('vydaj')}
              className={`flex-1 px-4 py-3 rounded-kawaii border-2 transition-colors ${
                typ === 'vydaj'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">↘️</div>
              <div className="font-medium">Výdaj</div>
            </button>
          </div>
        </div>
        
        <Input
          label="Částka (Kč) *"
          type="number"
          value={castka}
          onChange={(e) => setCastka(e.target.value)}
          placeholder="0"
          required
          min="0"
          step="0.01"
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Kategorie
          </label>
          <select
            value={kategorie}
            onChange={(e) => setKategorie(e.target.value)}
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Popis"
          value={popis}
          onChange={(e) => setPopis(e.target.value)}
          placeholder="Za co to bylo?"
        />
        
        <Input
          label="Datum"
          type="date"
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Opakování
          </label>
          <div className="flex gap-2">
            {(['jednorázový', 'měsíční', 'týdenní'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOpakovani(type)}
                className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
                  opakovani === type
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Uložit záznam
          </Button>
        </div>
      </form>
    </Modal>
  );
};
