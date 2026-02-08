import React, { useState } from 'react';
import type { Navyk } from '../../types';
import { Modal, Button, Input } from '../ui';

interface HabitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (habit: Omit<Navyk, 'id' | 'datum_vytvoreni' | 'aktivni'>) => void;
}

const AVAILABLE_ICONS = ['💧', '🏃‍♀️', '📖', '🧘‍♀️', '💊', '🍎', '🛌', '🧹', '🎯', '✍️', '🎨', '🎵'];

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Snadný', xp: 5, color: 'bg-green-100 border-green-300 text-green-700' },
  { value: 'medium', label: 'Střední', xp: 10, color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { value: 'hard', label: 'Náročný', xp: 15, color: 'bg-purple-100 border-purple-300 text-purple-700' },
];

export const HabitForm: React.FC<HabitFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [ikona, setIkona] = useState('💧');
  const [frekvence, setFrekvence] = useState<'denni' | 'tydeni'>('denni');
  const [obtiznost, setObtiznost] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [cilovaHodnota, setCilovaHodnota] = useState('1');
  const [jednotka, setJednotka] = useState('krát');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim()) {
      alert('Název návyku je povinný');
      return;
    }
    
    const hodnota = parseInt(cilovaHodnota);
    if (isNaN(hodnota) || hodnota < 1) {
      alert('Cílová hodnota musí být číslo větší než 0');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      ikona,
      frekvence,
      obtiznost,
      cilova_hodnota: hodnota,
      jednotka: jednotka.trim(),
    });
    
    // Reset form
    setNazev('');
    setIkona('💧');
    setFrekvence('denni');
    setObtiznost('medium');
    setCilovaHodnota('1');
    setJednotka('krát');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nový návyk" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název návyku *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="např. Pít vodu, Běhat, Meditovat..."
          required
        />
        
        {/* Icon Picker */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Ikona
          </label>
          <div className="grid grid-cols-6 gap-2">
            {AVAILABLE_ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setIkona(icon)}
                className={`text-3xl p-3 rounded-kawaii border-2 transition-all hover:scale-110 ${
                  ikona === icon
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
        
        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Frekvence
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFrekvence('denni')}
              className={`flex-1 px-4 py-2 rounded-kawaii border-2 transition-colors ${
                frekvence === 'denni'
                  ? 'border-matcha-dark bg-matcha-light'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Denně
            </button>
            <button
              type="button"
              onClick={() => setFrekvence('tydeni')}
              className={`flex-1 px-4 py-2 rounded-kawaii border-2 transition-colors ${
                frekvence === 'tydeni'
                  ? 'border-matcha-dark bg-matcha-light'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Týdně
            </button>
          </div>
        </div>
        
        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Obtížnost
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTY_OPTIONS.map((diff) => (
              <button
                key={diff.value}
                type="button"
                onClick={() => setObtiznost(diff.value as 'easy' | 'medium' | 'hard')}
                className={`px-4 py-3 rounded-kawaii border-2 transition-all ${
                  obtiznost === diff.value
                    ? diff.color + ' border-2'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-sm font-medium">{diff.label}</div>
                <div className="text-xs mt-1">+{diff.xp} XP</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Target value and unit */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Cílová hodnota *"
            type="number"
            value={cilovaHodnota}
            onChange={(e) => setCilovaHodnota(e.target.value)}
            min="1"
            required
          />
          <Input
            label="Jednotka"
            value={jednotka}
            onChange={(e) => setJednotka(e.target.value)}
            placeholder="např. krát, minut, sklenic..."
          />
        </div>
        
        {/* Example preview */}
        <div className="p-3 bg-warm rounded-kawaii text-sm text-gray-700">
          <strong>Náhled:</strong> {ikona} {nazev || '...'} • {cilovaHodnota} {jednotka} • {frekvence === 'denni' ? 'denně' : 'týdně'}
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Vytvořit návyk
          </Button>
        </div>
      </form>
    </Modal>
  );
};
