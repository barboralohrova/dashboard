import React, { useState } from 'react';
import type { Predmet } from '../../types';
import { Modal, Button, Input } from '../ui';

interface LearningFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subject: Omit<Predmet, 'id'>) => void;
}

const EMOJI_OPTIONS = ['📚', '📐', '💻', '🔬', '🎨', '🗣️', '📊', '🧪'];

export const LearningForm: React.FC<LearningFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [kod, setKod] = useState('');
  const [ikona, setIkona] = useState('📚');
  const [semestr, setSemestr] = useState('');
  const [kredity, setKredity] = useState('');
  const [vyucujici, setVyucujici] = useState('');
  const [hodnoceni, setHodnoceni] = useState('');
  const [stav, setStav] = useState<'aktivni' | 'ukoncen' | 'neukoncen'>('aktivni');
  const [poznamka, setPoznamka] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim() || !kod.trim()) {
      alert('Vyplňte název a kód předmětu');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      kod: kod.trim(),
      ikona,
      semestr: semestr.trim(),
      kredity: parseInt(kredity) || 0,
      vyucujici: vyucujici.trim(),
      hodnoceni: hodnoceni.trim(),
      stav,
      poznamka: poznamka.trim(),
    });
    
    // Reset form
    setNazev('');
    setKod('');
    setIkona('📚');
    setSemestr('');
    setKredity('');
    setVyucujici('');
    setHodnoceni('');
    setStav('aktivni');
    setPoznamka('');
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🎓 Nový předmět" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Icon selector */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Ikona
          </label>
          <div className="flex gap-2 flex-wrap">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setIkona(emoji)}
                className={`text-2xl px-3 py-2 rounded-kawaii border-2 transition-colors ${
                  ikona === emoji
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Název *"
            value={nazev}
            onChange={(e) => setNazev(e.target.value)}
            placeholder="Např. Matematická analýza"
            required
          />
          
          <Input
            label="Kód *"
            value={kod}
            onChange={(e) => setKod(e.target.value)}
            placeholder="Např. MAT101"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Semestr"
            value={semestr}
            onChange={(e) => setSemestr(e.target.value)}
            placeholder="Např. ZS 2025"
          />
          
          <Input
            label="Kredity"
            type="number"
            value={kredity}
            onChange={(e) => setKredity(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>
        
        <Input
          label="Vyučující"
          value={vyucujici}
          onChange={(e) => setVyucujici(e.target.value)}
          placeholder="Např. Doc. Ing. Novák"
        />
        
        <Input
          label="Hodnocení"
          value={hodnoceni}
          onChange={(e) => setHodnoceni(e.target.value)}
          placeholder="A, B, C, ..."
        />
        
        {/* Status selector */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Stav
          </label>
          <div className="flex gap-2">
            {(['aktivni', 'ukoncen', 'neukoncen'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStav(s)}
                className={`flex-1 px-4 py-3 rounded-kawaii border-2 transition-colors ${
                  stav === s
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-sm">
                  {s === 'aktivni' ? 'Aktivní' : s === 'ukoncen' ? 'Ukončen' : 'Neukončen'}
                </div>
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
            placeholder="Poznámky k předmětu..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none resize-none"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Přidat předmět
          </Button>
        </div>
      </form>
    </Modal>
  );
};
