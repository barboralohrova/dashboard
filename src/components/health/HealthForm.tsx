import React, { useState } from 'react';
import type { HealthEntryType } from '../../types';
import { Modal, Button, Input } from '../ui';

interface HealthFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: any) => void;
}

const CATEGORIES = [
  'Obecné',
  'Oči',
  'Zuby',
  'Kůže',
  'Interní',
  'Ortoped',
  'Psycholog',
];

const TYPE_EMOJIS: Record<HealthEntryType, string> = {
  prohlidka: '🏥',
  lek: '💊',
  mereni: '📏',
  ockovani: '💉',
  alergie: '🤧',
  ostatni: '📋',
};

export const HealthForm: React.FC<HealthFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [typ, setTyp] = useState<HealthEntryType>('prohlidka');
  const [nazev, setNazev] = useState('');
  const [datum, setDatum] = useState(new Date().toISOString().split('T')[0]);
  const [popis, setPopis] = useState('');
  const [lekar, setLekar] = useState('');
  const [vysledek, setVysledek] = useState('');
  const [dalsiTermin, setDalsiTermin] = useState('');
  const [kategorie, setKategorie] = useState('Obecné');
  const [tagy, setTagy] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim()) {
      alert('Zadejte název záznamu');
      return;
    }
    
    onSubmit({
      typ,
      nazev: nazev.trim(),
      datum,
      popis: popis.trim(),
      lekar: lekar.trim(),
      vysledek: vysledek.trim(),
      dalsi_termin: dalsiTermin || undefined,
      kategorie,
      tagy: tagy.split(',').map(t => t.trim()).filter(Boolean),
    });
    
    // Reset form
    setTyp('prohlidka');
    setNazev('');
    setDatum(new Date().toISOString().split('T')[0]);
    setPopis('');
    setLekar('');
    setVysledek('');
    setDalsiTermin('');
    setKategorie('Obecné');
    setTagy('');
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🏥 Nový zdravotní záznam" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type selector */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Typ záznamu *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['prohlidka', 'lek', 'mereni', 'ockovani', 'alergie', 'ostatni'] as HealthEntryType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTyp(type)}
                className={`px-4 py-3 rounded-kawaii border-2 transition-colors ${
                  typ === type
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{TYPE_EMOJIS[type]}</div>
                <div className="text-xs">
                  {type === 'prohlidka' ? 'Prohlídka' : 
                   type === 'lek' ? 'Lék' :
                   type === 'mereni' ? 'Měření' :
                   type === 'ockovani' ? 'Očkování' :
                   type === 'alergie' ? 'Alergie' :
                   'Ostatní'}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <Input
          label="Název *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Např. Preventivní prohlídka"
          required
        />
        
        <Input
          label="Datum"
          type="date"
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Popis
          </label>
          <textarea
            value={popis}
            onChange={(e) => setPopis(e.target.value)}
            placeholder="Podrobnosti o záznamu..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none resize-none"
            rows={3}
          />
        </div>
        
        <Input
          label="Lékař"
          value={lekar}
          onChange={(e) => setLekar(e.target.value)}
          placeholder="Např. MUDr. Novák"
        />
        
        <Input
          label="Výsledek"
          value={vysledek}
          onChange={(e) => setVysledek(e.target.value)}
          placeholder="Výsledek vyšetření nebo poznámka"
        />
        
        <Input
          label="Další termín"
          type="date"
          value={dalsiTermin}
          onChange={(e) => setDalsiTermin(e.target.value)}
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
          label="Štítky"
          value={tagy}
          onChange={(e) => setTagy(e.target.value)}
          placeholder="Oddělené čárkou, např. prevence, kontrola"
        />
        
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
