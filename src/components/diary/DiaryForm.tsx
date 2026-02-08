import React, { useState } from 'react';
import type { DenikMood, DenikEntry } from '../../types';
import { Modal, Button, Input } from '../ui';

interface DiaryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<DenikEntry, 'id' | 'vytvoreno' | 'upraveno'>) => void;
}

const MOOD_OPTIONS: { mood: DenikMood; emoji: string; label: string }[] = [
  { mood: 'skvele', emoji: '🤩', label: 'Skvěle' },
  { mood: 'dobre', emoji: '😊', label: 'Dobře' },
  { mood: 'ok', emoji: '😐', label: 'OK' },
  { mood: 'spatne', emoji: '😔', label: 'Špatně' },
  { mood: 'hrozne', emoji: '😢', label: 'Hrozně' },
];

export const DiaryForm: React.FC<DiaryFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [obsah, setObsah] = useState('');
  const [nalada, setNalada] = useState<DenikMood>('ok');
  const [datum, setDatum] = useState(new Date().toISOString().split('T')[0]);
  const [tagy, setTagy] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim()) {
      alert('Název zápisu je povinný');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      obsah: obsah.trim(),
      nalada,
      datum,
      tagy: tagy.split(',').map(t => t.trim()).filter(Boolean),
    });
    
    // Reset form
    setNazev('');
    setObsah('');
    setNalada('ok');
    setDatum(new Date().toISOString().split('T')[0]);
    setTagy('');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📝 Nový zápis do deníku" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Jak bys to nazval/a?"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Obsah
          </label>
          <textarea
            value={obsah}
            onChange={(e) => setObsah(e.target.value)}
            placeholder="Co se dnes stalo? Co cítíš?"
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            rows={6}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Nálada
          </label>
          <div className="flex gap-2">
            {MOOD_OPTIONS.map(({ mood, emoji, label }) => (
              <button
                key={mood}
                type="button"
                onClick={() => setNalada(mood)}
                className={`flex-1 px-3 py-2 rounded-kawaii border-2 transition-colors ${
                  nalada === mood
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs">{label}</div>
              </button>
            ))}
          </div>
        </div>
        
        <Input
          label="Datum"
          type="date"
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />
        
        <Input
          label="Tagy"
          value={tagy}
          onChange={(e) => setTagy(e.target.value)}
          placeholder="výlet, rodina, práce (oddělené čárkou)"
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Uložit zápis
          </Button>
        </div>
      </form>
    </Modal>
  );
};
