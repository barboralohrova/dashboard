import React, { useState } from 'react';
import type { VztahEntry, RelationshipType } from '../../types';
import { Modal, Button, Input } from '../ui';

interface RelationshipFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<VztahEntry, 'id' | 'datum_pridani'>) => void;
}

const RELATIONSHIP_TYPES: { type: RelationshipType; emoji: string; label: string }[] = [
  { type: 'rodina', emoji: '👨‍👩‍👧', label: 'Rodina' },
  { type: 'partner', emoji: '💑', label: 'Partner' },
  { type: 'pritel', emoji: '👫', label: 'Přítel' },
  { type: 'kolega', emoji: '💼', label: 'Kolega' },
  { type: 'znamý', emoji: '👋', label: 'Známý' },
  { type: 'ostatni', emoji: '👤', label: 'Ostatní' },
];

export const RelationshipForm: React.FC<RelationshipFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [jmeno, setJmeno] = useState('');
  const [typ_vztahu, setTypVztahu] = useState<RelationshipType>('pritel');
  const [narozeniny, setNarozeniny] = useState('');
  const [kontakt, setKontakt] = useState('');
  const [poznamka, setPoznamka] = useState('');
  const [pripominka_dny, setPripominkaDny] = useState('');
  const [tagy, setTagy] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jmeno.trim()) {
      alert('Jméno je povinné');
      return;
    }
    
    onSubmit({
      jmeno: jmeno.trim(),
      typ_vztahu,
      narozeniny: narozeniny || undefined,
      kontakt: kontakt.trim() || undefined,
      poznamka: poznamka.trim() || undefined,
      posledni_kontakt: undefined,
      pripominka_dny: pripominka_dny ? Number(pripominka_dny) : undefined,
      tagy: tagy.split(',').map(t => t.trim()).filter(Boolean),
    });
    
    // Reset form
    setJmeno('');
    setTypVztahu('pritel');
    setNarozeniny('');
    setKontakt('');
    setPoznamka('');
    setPripominkaDny('');
    setTagy('');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🤝 Nový kontakt" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Jméno *"
          value={jmeno}
          onChange={(e) => setJmeno(e.target.value)}
          placeholder="Jméno osoby"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Typ vztahu
          </label>
          <div className="flex flex-wrap gap-2">
            {RELATIONSHIP_TYPES.map(({ type, emoji, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypVztahu(type)}
                className={`px-4 py-2 rounded-kawaii transition-all ${
                  typ_vztahu === type
                    ? 'bg-gradient-to-r from-matcha-dark to-[#8BAA7E] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>
        
        <Input
          label="Narozeniny"
          type="date"
          value={narozeniny}
          onChange={(e) => setNarozeniny(e.target.value)}
        />
        
        <Input
          label="Kontakt"
          value={kontakt}
          onChange={(e) => setKontakt(e.target.value)}
          placeholder="Email, telefon, ..."
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Poznámka
          </label>
          <textarea
            value={poznamka}
            onChange={(e) => setPoznamka(e.target.value)}
            placeholder="Poznámky o této osobě..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            rows={3}
          />
        </div>
        
        <Input
          label="Připomínka (dny)"
          type="number"
          value={pripominka_dny}
          onChange={(e) => setPripominkaDny(e.target.value)}
          placeholder="Připomenout po X dnech bez kontaktu"
          min="1"
        />
        
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
            Přidat kontakt
          </Button>
        </div>
      </form>
    </Modal>
  );
};
