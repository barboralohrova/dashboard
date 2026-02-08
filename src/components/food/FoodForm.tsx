import React, { useState } from 'react';
import type { MealType } from '../../types';
import { Modal, Button, Input } from '../ui';

interface FoodFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: any) => void;
}

const MEAL_TYPES: { type: MealType; emoji: string; label: string }[] = [
  { type: 'snidane', emoji: '🌅', label: 'Snídaně' },
  { type: 'obed', emoji: '🍽️', label: 'Oběd' },
  { type: 'vecere', emoji: '🌙', label: 'Večeře' },
  { type: 'svacina', emoji: '🍎', label: 'Svačina' },
  { type: 'dezert', emoji: '🍰', label: 'Dezert' },
  { type: 'napoj', emoji: '☕', label: 'Nápoj' },
];

export const FoodForm: React.FC<FoodFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [typ_jidla, setTypJidla] = useState<MealType>('obed');
  const [ingredience, setIngredience] = useState('');
  const [postup, setPostup] = useState('');
  const [cas_pripravy, setCasPripravy] = useState('');
  const [porce, setPorce] = useState('');
  const [tagy, setTagy] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim()) {
      alert('Název receptu je povinný');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      typ_jidla,
      ingredience: ingredience.split('\n').map(i => i.trim()).filter(Boolean),
      postup: postup.trim(),
      cas_pripravy: parseInt(cas_pripravy) || 0,
      porce: parseInt(porce) || 1,
      oblibene: false,
      tagy: tagy.split(',').map(t => t.trim()).filter(Boolean),
    });
    
    // Reset form
    setNazev('');
    setTypJidla('obed');
    setIngredience('');
    setPostup('');
    setCasPripravy('');
    setPorce('');
    setTagy('');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🍳 Nový recept" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název receptu *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Co budeš vařit?"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Typ jídla
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MEAL_TYPES.map(({ type, emoji, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypJidla(type)}
                className={`px-3 py-2 rounded-kawaii border-2 transition-colors ${
                  typ_jidla === type
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl mb-1">{emoji}</div>
                <div className="text-xs">{label}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Ingredience (každá na nový řádek)
          </label>
          <textarea
            value={ingredience}
            onChange={(e) => setIngredience(e.target.value)}
            placeholder="200g mouky&#10;2 vejce&#10;100ml mléka"
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            rows={5}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Postup přípravy
          </label>
          <textarea
            value={postup}
            onChange={(e) => setPostup(e.target.value)}
            placeholder="Popis postupu přípravy..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            rows={6}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Čas přípravy (minuty)"
            type="number"
            value={cas_pripravy}
            onChange={(e) => setCasPripravy(e.target.value)}
            placeholder="30"
            min="0"
          />
          
          <Input
            label="Počet porcí"
            type="number"
            value={porce}
            onChange={(e) => setPorce(e.target.value)}
            placeholder="2"
            min="1"
          />
        </div>
        
        <Input
          label="Tagy"
          value={tagy}
          onChange={(e) => setTagy(e.target.value)}
          placeholder="vegetariánské, rychlé, zdravé (oddělené čárkou)"
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Uložit recept
          </Button>
        </div>
      </form>
    </Modal>
  );
};
