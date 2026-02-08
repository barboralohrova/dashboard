import React, { useState } from 'react';
import type { CalendarEvent } from '../../types';
import { Modal, Button, Input } from '../ui';

interface CalendarEventFormData {
  nazev: string;
  datum_zacatek: string;
  datum_konec: string;
  cely_den: boolean;
  lokace?: string;
  popis?: string;
  barva: string;
  zdroj?: CalendarEvent['zdroj'];
  pripominka_min?: number;
  propojeny_ukol_id?: string;
}

interface CalendarEventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: CalendarEventFormData) => void;
  defaultDate?: string;
}

const COLOR_OPTIONS = [
  { name: 'Matcha', value: '#6B8E6F' },
  { name: 'Modrá', value: '#4A90E2' },
  { name: 'Červená', value: '#E24A4A' },
  { name: 'Žlutá', value: '#F4C430' },
  { name: 'Fialová', value: '#9B59B6' },
  { name: 'Oranžová', value: '#E67E22' },
];

export const CalendarEventForm: React.FC<CalendarEventFormProps> = ({ isOpen, onClose, onSubmit, defaultDate }) => {
  const [nazev, setNazev] = useState('');
  const [datumZacatek, setDatumZacatek] = useState(defaultDate || new Date().toISOString().split('T')[0]);
  const [casZacatek, setCasZacatek] = useState('09:00');
  const [datumKonec, setDatumKonec] = useState(defaultDate || new Date().toISOString().split('T')[0]);
  const [casKonec, setCasKonec] = useState('10:00');
  const [celyDen, setCelyDen] = useState(false);
  const [lokace, setLokace] = useState('');
  const [popis, setPopis] = useState('');
  const [barva, setBarva] = useState('#6B8E6F');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nazev.trim()) {
      alert('Zadejte název události');
      return;
    }
    
    const startDateTime = celyDen 
      ? `${datumZacatek}T00:00:00` 
      : `${datumZacatek}T${casZacatek}:00`;
    
    const endDateTime = celyDen 
      ? `${datumKonec}T23:59:59` 
      : `${datumKonec}T${casKonec}:00`;
    
    onSubmit({
      nazev: nazev.trim(),
      datum_zacatek: startDateTime,
      datum_konec: endDateTime,
      cely_den: celyDen,
      lokace: lokace.trim() || undefined,
      popis: popis.trim() || undefined,
      barva,
    });
    
    // Reset form
    setNazev('');
    setDatumZacatek(defaultDate || new Date().toISOString().split('T')[0]);
    setCasZacatek('09:00');
    setDatumKonec(defaultDate || new Date().toISOString().split('T')[0]);
    setCasKonec('10:00');
    setCelyDen(false);
    setLokace('');
    setPopis('');
    setBarva('#6B8E6F');
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📅 Nová událost" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Název události *"
          value={nazev}
          onChange={(e) => setNazev(e.target.value)}
          placeholder="Např. Schůzka"
          required
        />
        
        {/* All day toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="celyDen"
            checked={celyDen}
            onChange={(e) => setCelyDen(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-matcha-dark focus:ring-matcha-dark"
          />
          <label htmlFor="celyDen" className="text-sm font-medium text-gray-700">
            Celý den
          </label>
        </div>
        
        {/* Start date/time */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Datum začátku"
            type="date"
            value={datumZacatek}
            onChange={(e) => setDatumZacatek(e.target.value)}
            required
          />
          
          {!celyDen && (
            <Input
              label="Čas začátku"
              type="time"
              value={casZacatek}
              onChange={(e) => setCasZacatek(e.target.value)}
              required
            />
          )}
        </div>
        
        {/* End date/time */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Datum konce"
            type="date"
            value={datumKonec}
            onChange={(e) => setDatumKonec(e.target.value)}
            required
          />
          
          {!celyDen && (
            <Input
              label="Čas konce"
              type="time"
              value={casKonec}
              onChange={(e) => setCasKonec(e.target.value)}
              required
            />
          )}
        </div>
        
        <Input
          label="Místo"
          value={lokace}
          onChange={(e) => setLokace(e.target.value)}
          placeholder="Např. Kavárna"
        />
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Popis
          </label>
          <textarea
            value={popis}
            onChange={(e) => setPopis(e.target.value)}
            placeholder="Podrobnosti události..."
            className="w-full px-4 py-2.5 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none resize-none"
            rows={3}
          />
        </div>
        
        {/* Color picker */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Barva
          </label>
          <div className="flex gap-2 flex-wrap">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setBarva(color.value)}
                className={`w-10 h-10 rounded-kawaii border-2 transition-all ${
                  barva === color.value
                    ? 'border-matcha-dark scale-110'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Zrušit
          </Button>
          <Button type="submit" variant="primary">
            Přidat událost
          </Button>
        </div>
      </form>
    </Modal>
  );
};
