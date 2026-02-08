import React, { useState } from 'react';
import type { CestovaniEntry, TripStatus } from '../../types';
import { Modal, Button, Input } from '../ui';

interface TravelFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<CestovaniEntry, 'id' | 'datum_pridani'>) => void;
}

const STATUS_OPTIONS: { status: TripStatus; emoji: string; label: string }[] = [
  { status: 'planovany', emoji: '📋', label: 'Plánovaný' },
  { status: 'probihajici', emoji: '🌍', label: 'Probíhající' },
  { status: 'dokonceny', emoji: '✅', label: 'Dokončený' },
  { status: 'zruseny', emoji: '❌', label: 'Zrušený' },
];

export const TravelForm: React.FC<TravelFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [destinace, setDestinace] = useState('');
  const [datum_od, setDatumOd] = useState('');
  const [datum_do, setDatumDo] = useState('');
  const [rozpocet, setRozpocet] = useState('');
  const [utraceno, setUtraceno] = useState('');
  const [stav, setStav] = useState<TripStatus>('planovany');
  const [poznamka, setPoznamka] = useState('');
  const [tagy, setTagy] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim() || !destinace.trim()) {
      alert('Název a destinace jsou povinné');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      destinace: destinace.trim(),
      datum_od: datum_od || undefined,
      datum_do: datum_do || undefined,
      rozpocet: rozpocet ? Number(rozpocet) : undefined,
      utraceno: utraceno ? Number(utraceno) : undefined,
      stav,
      poznamka: poznamka.trim() || undefined,
      tagy: tagy.split(',').map(t => t.trim()).filter(Boolean),
    });
    
    // Reset form
    setNazev('');
    setDestinace('');
    setDatumOd('');
    setDatumDo('');
    setRozpocet('');
    setUtraceno('');
    setStav('planovany');
    setPoznamka('');
    setTagy('');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="✈️ Nový výlet" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Název výletu"
          required
        />
        
        <Input
          label="Destinace *"
          value={destinace}
          onChange={(e) => setDestinace(e.target.value)}
          placeholder="Kam jedete?"
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Datum od"
            type="date"
            value={datum_od}
            onChange={(e) => setDatumOd(e.target.value)}
          />
          
          <Input
            label="Datum do"
            type="date"
            value={datum_do}
            onChange={(e) => setDatumDo(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Rozpočet (Kč)"
            type="number"
            value={rozpocet}
            onChange={(e) => setRozpocet(e.target.value)}
            placeholder="Plánovaný rozpočet"
            min="0"
          />
          
          <Input
            label="Utraceno (Kč)"
            type="number"
            value={utraceno}
            onChange={(e) => setUtraceno(e.target.value)}
            placeholder="Již utraceno"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Stav
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map(({ status, emoji, label }) => (
              <button
                key={status}
                type="button"
                onClick={() => setStav(status)}
                className={`px-4 py-2 rounded-kawaii transition-all ${
                  stav === status
                    ? 'bg-gradient-to-r from-matcha-dark to-[#8BAA7E] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Poznámka
          </label>
          <textarea
            value={poznamka}
            onChange={(e) => setPoznamka(e.target.value)}
            placeholder="Poznámky k výletu..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            rows={3}
          />
        </div>
        
        <Input
          label="Tagy"
          value={tagy}
          onChange={(e) => setTagy(e.target.value)}
          placeholder="Oddělené čárkou"
        />
        
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" onClick={onClose} variant="secondary">
            Zrušit
          </Button>
          <Button type="submit">
            Přidat výlet
          </Button>
        </div>
      </form>
    </Modal>
  );
};
