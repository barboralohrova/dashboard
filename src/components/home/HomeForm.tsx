import React, { useState } from 'react';
import type { DomacnostEntry } from '../../types';
import { Modal, Button, Input } from '../ui';

type HomeTaskType = DomacnostEntry['typ'];

interface HomeFormData {
  nazev: string;
  typ: HomeTaskType;
  frekvence: 'jednorázový' | 'denní' | 'týdenní' | 'měsíční' | 'roční';
  priorita: 'nízká' | 'střední' | 'vysoká';
  mistnost?: string;
  dalsi_termin?: string;
  poznamka?: string;
}

interface HomeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: HomeFormData) => void;
}

const ROOMS = ['Kuchyň', 'Koupelna', 'Obývák', 'Ložnice', 'Chodba', 'Venku', 'Ostatní'];

const TYPE_EMOJIS: Record<HomeTaskType, string> = {
  uklid: '🧹',
  udrzba: '🔧',
  nakup: '🛒',
  oprava: '🔨',
  zahrada: '🌱',
  ostatni: '📋',
};

export const HomeForm: React.FC<HomeFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [typ, setTyp] = useState<HomeTaskType>('uklid');
  const [frekvence, setFrekvence] = useState<'jednorázový' | 'denní' | 'týdenní' | 'měsíční' | 'roční'>('jednorázový');
  const [priorita, setPriorita] = useState<'nízká' | 'střední' | 'vysoká'>('střední');
  const [mistnost, setMistnost] = useState('');
  const [dalsiTermin, setDalsiTermin] = useState('');
  const [poznamka, setPoznamka] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim()) {
      alert('Zadejte název úkolu');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      typ,
      frekvence,
      priorita,
      mistnost: mistnost || undefined,
      dalsi_termin: dalsiTermin || undefined,
      poznamka: poznamka.trim() || undefined,
    });
    
    // Reset form
    setNazev('');
    setTyp('uklid');
    setFrekvence('jednorázový');
    setPriorita('střední');
    setMistnost('');
    setDalsiTermin('');
    setPoznamka('');
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🏠 Nový domácí úkol" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Např. Uklidit kuchyň"
          required
        />
        
        {/* Type selector */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Typ úkolu
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['uklid', 'udrzba', 'nakup', 'oprava', 'zahrada', 'ostatni'] as HomeTaskType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTyp(t)}
                className={`px-4 py-3 rounded-kawaii border-2 transition-colors ${
                  typ === t
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{TYPE_EMOJIS[t]}</div>
                <div className="text-xs">
                  {t === 'uklid' ? 'Úklid' :
                   t === 'udrzba' ? 'Údržba' :
                   t === 'nakup' ? 'Nákup' :
                   t === 'oprava' ? 'Oprava' :
                   t === 'zahrada' ? 'Zahrada' :
                   'Ostatní'}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Frequency selector */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Frekvence
          </label>
          <div className="flex flex-wrap gap-2">
            {(['jednorázový', 'denní', 'týdenní', 'měsíční', 'roční'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFrekvence(f)}
                className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
                  frekvence === f
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        {/* Priority selector */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Priorita
          </label>
          <div className="flex gap-2">
            {(['nízká', 'střední', 'vysoká'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriorita(p)}
                className={`flex-1 px-4 py-3 rounded-kawaii border-2 transition-colors ${
                  priorita === p
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">{p}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Místnost
          </label>
          <select
            value={mistnost}
            onChange={(e) => setMistnost(e.target.value)}
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
          >
            <option value="">-- Vyberte místnost --</option>
            {ROOMS.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Další termín"
          type="date"
          value={dalsiTermin}
          onChange={(e) => setDalsiTermin(e.target.value)}
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Poznámka
          </label>
          <textarea
            value={poznamka}
            onChange={(e) => setPoznamka(e.target.value)}
            placeholder="Poznámky k úkolu..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none resize-none"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Přidat úkol
          </Button>
        </div>
      </form>
    </Modal>
  );
};
