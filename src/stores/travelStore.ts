import { create } from 'zustand';
import type { CestovaniEntry, TripStatus } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface TravelStore {
  entries: CestovaniEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<CestovaniEntry, 'id' | 'datum_pridani'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<CestovaniEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getUpcomingTrips: () => CestovaniEntry[];
  getTotalBudget: () => { total: number; spent: number; remaining: number };
}

export const useTravelStore = create<TravelStore>((set, get) => ({
  entries: [],
  isLoading: false,
  loadingRetryTimeout: undefined,
  
  loadEntries: async () => {
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'cestovani');
      
      // Parse data
      const entries: CestovaniEntry[] = data.map((row: Record<string, string>) => ({
        id: row.id,
        nazev: row.nazev,
        destinace: row.destinace,
        datum_od: row.datum_od || undefined,
        datum_do: row.datum_do || undefined,
        rozpocet: row.rozpocet ? Number(row.rozpocet) : undefined,
        utraceno: row.utraceno ? Number(row.utraceno) : undefined,
        stav: row.stav as TripStatus,
        poznamka: row.poznamka || undefined,
        tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        datum_pridani: row.datum_pridani,
      }));
      
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load travel entries:', error);
      set({ entries: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'cestovani');
          const entries: CestovaniEntry[] = data.map((row: Record<string, string>) => ({
            id: row.id,
            nazev: row.nazev,
            destinace: row.destinace,
            datum_od: row.datum_od || undefined,
            datum_do: row.datum_do || undefined,
            rozpocet: row.rozpocet ? Number(row.rozpocet) : undefined,
            utraceno: row.utraceno ? Number(row.utraceno) : undefined,
            stav: row.stav as TripStatus,
            poznamka: row.poznamka || undefined,
            tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
            datum_pridani: row.datum_pridani,
          }));
          set({ entries, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load travel entries:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEntry: async (entryData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entry: CestovaniEntry = {
      ...entryData,
      id: generateId(),
      datum_pridani: new Date().toISOString(),
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'cestovani',
        [
          entry.id,
          entry.nazev,
          entry.destinace,
          entry.datum_od || '',
          entry.datum_do || '',
          entry.rozpocet?.toString() || '',
          entry.utraceno?.toString() || '',
          entry.stav,
          entry.poznamka || '',
          entry.tagy.join(', '),
          entry.datum_pridani,
        ]
      );
      
      set({ entries: [...get().entries, entry] });
      
      // Add XP based on trip status
      const gameStore = useGameStore.getState();
      const xpAmount = entry.stav === 'dokonceny' ? 15 : 5;
      const xpMessage = entry.stav === 'dokonceny' 
        ? `Dokončený výlet: ${entry.nazev}`
        : `Nový výlet: ${entry.nazev}`;
      await gameStore.addXP(xpAmount, 'travel', xpMessage, entry.id);
    } catch (error) {
      console.error('Failed to add travel entry:', error);
      throw error;
    }
  },
  
  updateEntry: async (id: string, updates: Partial<CestovaniEntry>) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entries = get().entries;
    const entryIndex = entries.findIndex((e) => e.id === id);
    if (entryIndex === -1) return;
    
    const entry = entries[entryIndex];
    const updatedEntry: CestovaniEntry = {
      ...entry,
      ...updates,
    };
    
    // Award XP if trip was just completed
    if (entry.stav !== 'dokonceny' && updatedEntry.stav === 'dokonceny') {
      const gameStore = useGameStore.getState();
      await gameStore.addXP(15, 'travel', `Dokončený výlet: ${updatedEntry.nazev}`, updatedEntry.id);
    }
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'cestovani',
        entryIndex + 2,
        [
          updatedEntry.id,
          updatedEntry.nazev,
          updatedEntry.destinace,
          updatedEntry.datum_od || '',
          updatedEntry.datum_do || '',
          updatedEntry.rozpocet?.toString() || '',
          updatedEntry.utraceno?.toString() || '',
          updatedEntry.stav,
          updatedEntry.poznamka || '',
          updatedEntry.tagy.join(', '),
          updatedEntry.datum_pridani,
        ]
      );
      
      const newEntries = [...entries];
      newEntries[entryIndex] = updatedEntry;
      set({ entries: newEntries });
    } catch (error) {
      console.error('Failed to update travel entry:', error);
      throw error;
    }
  },
  
  deleteEntry: async (id: string) => {
    const entries = get().entries;
    const newEntries = entries.filter((e) => e.id !== id);
    set({ entries: newEntries });
  },
  
  getUpcomingTrips: () => {
    const entries = get().entries;
    const now = new Date();
    
    return entries.filter((entry) => {
      if (entry.stav !== 'planovany' && entry.stav !== 'probihajici') return false;
      if (!entry.datum_od) return true; // Include trips without dates
      
      const startDate = new Date(entry.datum_od);
      return startDate >= now;
    });
  },
  
  getTotalBudget: () => {
    const entries = get().entries;
    const total = entries.reduce((sum, entry) => sum + (entry.rozpocet || 0), 0);
    const spent = entries.reduce((sum, entry) => sum + (entry.utraceno || 0), 0);
    
    return {
      total,
      spent,
      remaining: total - spent,
    };
  },
}));
