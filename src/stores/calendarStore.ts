import { create } from 'zustand';
import type { CalendarEvent } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface CalendarStore {
  events: CalendarEvent[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  selectedDate: string; // ISO date string
  
  loadEvents: () => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id' | 'posledni_sync'>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  setSelectedDate: (date: string) => void;
  getEventsForDate: (date: string) => CalendarEvent[];
  getEventsForMonth: (year: number, month: number) => CalendarEvent[];
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  events: [],
  isLoading: false,
  loadingRetryTimeout: undefined,
  selectedDate: new Date().toISOString().split('T')[0],
  
  loadEvents: async () => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    // Clear any pending retry
    const currentRetryTimeout = get().loadingRetryTimeout;
    if (currentRetryTimeout) {
      clearTimeout(currentRetryTimeout);
      set({ loadingRetryTimeout: undefined });
    }
    
    set({ isLoading: true });
    
    try {
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'kalendar_cache');
      
      const events: CalendarEvent[] = data.map((row: Record<string, string>) => ({
        id: row.id,
        nazev: row.nazev,
        datum_zacatek: row.datum_zacatek,
        datum_konec: row.datum_konec,
        cely_den: row.cely_den === 'true',
        lokace: row.lokace,
        popis: row.popis,
        barva: row.barva,
        pripominka_min: row.pripominka_min ? parseInt(row.pripominka_min) : undefined,
        propojeny_ukol_id: row.propojeny_ukol_id,
        zdroj: row.zdroj as any,
        posledni_sync: row.posledni_sync,
      }));
      
      set({ events, isLoading: false });
    } catch (error) {
      console.error('Failed to load calendar events:', error);
      set({ events: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'kalendar_cache');
          const events: CalendarEvent[] = data.map((row: Record<string, string>) => ({
            id: row.id,
            nazev: row.nazev,
            datum_zacatek: row.datum_zacatek,
            datum_konec: row.datum_konec,
            cely_den: row.cely_den === 'true',
            lokace: row.lokace,
            popis: row.popis,
            barva: row.barva,
            pripominka_min: row.pripominka_min ? parseInt(row.pripominka_min) : undefined,
            propojeny_ukol_id: row.propojeny_ukol_id,
            zdroj: row.zdroj as any,
            posledni_sync: row.posledni_sync,
          }));
          set({ events, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load calendar events:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEvent: async (eventData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const event: CalendarEvent = {
      ...eventData,
      id: generateId(),
      zdroj: 'manual',
      posledni_sync: new Date().toISOString(),
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'kalendar_cache',
        [
          event.id,
          event.nazev,
          event.datum_zacatek,
          event.datum_konec,
          event.cely_den ? 'true' : 'false',
          event.lokace || '',
          event.popis || '',
          event.barva || '',
          event.pripominka_min?.toString() || '',
          event.propojeny_ukol_id || '',
          event.zdroj,
          event.posledni_sync || '',
        ]
      );
      
      set({ events: [...get().events, event] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(5, 'calendar_event', `Událost přidána: ${event.nazev}`, event.id);
    } catch (error) {
      console.error('Failed to add calendar event:', error);
      throw error;
    }
  },
  
  deleteEvent: async (id: string) => {
    const events = get().events;
    const newEvents = events.filter((e) => e.id !== id);
    set({ events: newEvents });
  },
  
  setSelectedDate: (date: string) => {
    set({ selectedDate: date });
  },
  
  getEventsForDate: (date: string) => {
    const events = get().events;
    return events.filter(event => {
      const eventStart = event.datum_zacatek.split('T')[0];
      const eventEnd = event.datum_konec.split('T')[0];
      return date >= eventStart && date <= eventEnd;
    }).sort((a, b) => {
      // Sort by start time
      return new Date(a.datum_zacatek).getTime() - new Date(b.datum_zacatek).getTime();
    });
  },
  
  getEventsForMonth: (year: number, month: number) => {
    const events = get().events;
    return events.filter(event => {
      const eventDate = new Date(event.datum_zacatek);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  },
}));
