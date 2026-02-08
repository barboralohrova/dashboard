import React from 'react';
import type { CalendarEvent } from '../../types';
import { Card } from '../ui';

interface CalendarEventCardProps {
  event: CalendarEvent;
  onDelete: (id: string) => void;
}

export const CalendarEventCard: React.FC<CalendarEventCardProps> = ({ event, onDelete }) => {
  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  };
  
  const defaultColor = '#6B8E6F'; // matcha-dark
  const eventColor = event.barva || defaultColor;
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div
            className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: eventColor }}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{event.nazev}</h3>
            
            {!event.cely_den && (
              <p className="text-sm text-gray-600 mt-1">
                {formatTime(event.datum_zacatek)} - {formatTime(event.datum_konec)}
              </p>
            )}
            
            {event.cely_den && (
              <p className="text-sm text-gray-600 mt-1">Celý den</p>
            )}
            
            {event.lokace && (
              <p className="text-sm text-gray-600 mt-1">
                📍 {event.lokace}
              </p>
            )}
            
            {event.popis && (
              <p className="text-sm text-gray-700 mt-2">
                {event.popis}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={() => {
            if (confirm('Opravdu chcete smazat tuto událost?')) {
              onDelete(event.id);
            }
          }}
          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
        >
          🗑️
        </button>
      </div>
    </Card>
  );
};
