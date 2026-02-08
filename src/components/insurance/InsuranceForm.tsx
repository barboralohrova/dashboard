import React, { useState } from 'react';
import type { PojisteniEntry, InsuranceType } from '../../types';
import { Modal, Button, Input } from '../ui';

interface InsuranceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<PojisteniEntry, 'id' | 'datum_pridani'>) => void;
}

const INSURANCE_TYPES: { type: InsuranceType; emoji: string; label: string }[] = [
  { type: 'zdravotni', emoji: '🏥', label: 'Zdravotní' },
  { type: 'zivotni', emoji: '💚', label: 'Životní' },
  { type: 'cestovni', emoji: '✈️', label: 'Cestovní' },
  { type: 'majetek', emoji: '🏠', label: 'Majetek' },
  { type: 'auto', emoji: '🚗', label: 'Auto' },
  { type: 'odpovědnost', emoji: '⚖️', label: 'Odpovědnost' },
  { type: 'ostatni', emoji: '📋', label: 'Ostatní' },
];

export const InsuranceForm: React.FC<InsuranceFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [typ_pojisteni, setTypPojisteni] = useState<InsuranceType>('zdravotni');
  const [pojistovna, setPojistovna] = useState('');
  const [cislo_smlouvy, setCisloSmlouvy] = useState('');
  const [castka_mesicne, setCastkaMesicne] = useState('');
  const [datum_zacatku, setDatumZacatku] = useState(new Date().toISOString().split('T')[0]);
  const [datum_konce, setDatumKonce] = useState('');
  const [poznamka, setPoznamka] = useState('');
  const [pripominka_pred_koncem_dny, setPripominkaPredKoncemDny] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim() || !pojistovna.trim() || !castka_mesicne) {
      alert('Název, pojišťovna a měsíční částka jsou povinné');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      typ_pojisteni,
      pojistovna: pojistovna.trim(),
      cislo_smlouvy: cislo_smlouvy.trim() || undefined,
      castka_mesicne: Number(castka_mesicne),
      datum_zacatku,
      datum_konce: datum_konce || undefined,
      poznamka: poznamka.trim() || undefined,
      pripominka_pred_koncem_dny: pripominka_pred_koncem_dny ? Number(pripominka_pred_koncem_dny) : undefined,
    });
    
    // Reset form
    setNazev('');
    setTypPojisteni('zdravotni');
    setPojistovna('');
    setCisloSmlouvy('');
    setCastkaMesicne('');
    setDatumZacatku(new Date().toISOString().split('T')[0]);
    setDatumKonce('');
    setPoznamka('');
    setPripominkaPredKoncemDny('');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🛡️ Nová pojistka" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Název pojistky"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Typ pojištění
          </label>
          <div className="flex flex-wrap gap-2">
            {INSURANCE_TYPES.map(({ type, emoji, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypPojisteni(type)}
                className={`px-4 py-2 rounded-kawaii transition-all ${
                  typ_pojisteni === type
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
          label="Pojišťovna *"
          value={pojistovna}
          onChange={(e) => setPojistovna(e.target.value)}
          placeholder="Název pojišťovny"
          required
        />
        
        <Input
          label="Číslo smlouvy"
          value={cislo_smlouvy}
          onChange={(e) => setCisloSmlouvy(e.target.value)}
          placeholder="Číslo smlouvy"
        />
        
        <Input
          label="Měsíční částka (Kč) *"
          type="number"
          value={castka_mesicne}
          onChange={(e) => setCastkaMesicne(e.target.value)}
          placeholder="Částka v Kč"
          required
          min="0"
        />
        
        <Input
          label="Datum začátku"
          type="date"
          value={datum_zacatku}
          onChange={(e) => setDatumZacatku(e.target.value)}
        />
        
        <Input
          label="Datum konce"
          type="date"
          value={datum_konce}
          onChange={(e) => setDatumKonce(e.target.value)}
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Poznámka
          </label>
          <textarea
            value={poznamka}
            onChange={(e) => setPoznamka(e.target.value)}
            placeholder="Poznámky k pojistce..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            rows={3}
          />
        </div>
        
        <Input
          label="Připomínka před koncem (dny)"
          type="number"
          value={pripominka_pred_koncem_dny}
          onChange={(e) => setPripominkaPredKoncemDny(e.target.value)}
          placeholder="Připomenout X dní před koncem"
          min="1"
        />
        
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" onClick={onClose} variant="secondary">
            Zrušit
          </Button>
          <Button type="submit">
            Přidat pojistku
          </Button>
        </div>
      </form>
    </Modal>
  );
};
