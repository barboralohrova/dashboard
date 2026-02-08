import React, { useState } from 'react';
import type { TaskComplexity, TaskRepeat } from '../../types';
import { Modal, Button, Input } from '../ui';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const [slozitost, setSlozitost] = useState<TaskComplexity>('stredni');
  const [opakovani, setOpakovani] = useState<TaskRepeat>('jednorázový');
  const [modul, setModul] = useState('Obecný');
  const [deadline, setDeadline] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim()) {
      alert('Název úkolu je povinný');
      return;
    }
    
    onSubmit({
      nazev: nazev.trim(),
      popis: popis.trim(),
      kategorie: 'general',
      slozitost,
      opakovani,
      modul,
      datum_deadline: deadline || undefined,
    });
    
    // Reset form
    setNazev('');
    setPopis('');
    setSlozitost('stredni');
    setOpakovani('jednorázový');
    setModul('Obecný');
    setDeadline('');
    
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nový úkol" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název úkolu *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Co chceš udělat?"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Popis
          </label>
          <textarea
            value={popis}
            onChange={(e) => setPopis(e.target.value)}
            placeholder="Přidej detaily..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none transition-colors"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Složitost
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(['snadny', 'stredni', 'narocny', 'epicky', 'legendarni'] as TaskComplexity[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSlozitost(level)}
                className={`px-4 py-2 rounded-kawaii border-2 transition-colors ${
                  slozitost === level
                    ? 'border-matcha-dark bg-matcha-light'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">
                  {level === 'snadny' && '🟢 +5 XP'}
                  {level === 'stredni' && '🔵 +15 XP'}
                  {level === 'narocny' && '🟡 +30 XP'}
                  {level === 'epicky' && '🔴 +60 XP'}
                  {level === 'legendarni' && '💎 +120 XP'}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Typ úkolu
          </label>
          <div className="flex gap-2">
            {(['jednorázový', 'denní', 'týdenní'] as TaskRepeat[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOpakovani(type)}
                className={`px-4 py-2 rounded-kawaii border-2 transition-colors ${
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
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Modul
          </label>
          <select
            value={modul}
            onChange={(e) => setModul(e.target.value)}
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
          >
            <option>Obecný</option>
            <option>Domácnost</option>
            <option>Zdraví</option>
            <option>Finance</option>
            <option>VŠ / Učení</option>
            <option>Vztahy</option>
            <option>Cestování</option>
          </select>
        </div>
        
        <Input
          label="Deadline (nepovinný)"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Vytvořit úkol
          </Button>
        </div>
      </form>
    </Modal>
  );
};
