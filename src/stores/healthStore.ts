import { create } from 'zustand';
import type { ZdraviEntry } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface HealthStore {
  entries: ZdraviEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<ZdraviEntry, 'id' | 'vytvoreno'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<ZdraviEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getUpcomingAppointments: () => ZdraviEntry[];
}

export const useHealthStore = create<HealthStore>((set, get) => ({
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'zdravi');
      
      // Parse tags from comma-separated string to array
      const entries: ZdraviEntry[] = data.map((row: Record<string, string>) => ({
        id: row.id,
        typ: row.typ as any,
        nazev: row.nazev,
        datum: row.datum,
        popis: row.popis,
        lekar: row.lekar,
        vysledek: row.vysledek,
        dalsi_termin: row.dalsi_termin,
        pripominka_dny: row.pripominka_dny ? parseInt(row.pripominka_dny) : undefined,
        kategorie: row.kategorie,
        tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        vytvoreno: row.vytvoreno,
      }));
      
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load health entries:', error);
      set({ entries: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'zdravi');
          const entries: ZdraviEntry[] = data.map((row: Record<string, string>) => ({
            id: row.id,
            typ: row.typ as any,
            nazev: row.nazev,
            datum: row.datum,
            popis: row.popis,
            lekar: row.lekar,
            vysledek: row.vysledek,
            dalsi_termin: row.dalsi_termin,
            pripominka_dny: row.pripominka_dny ? parseInt(row.pripominka_dny) : undefined,
            kategorie: row.kategorie,
            tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
            vytvoreno: row.vytvoreno,
          }));
          set({ entries, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load health entries:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEntry: async (entryData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entry: ZdraviEntry = {
      ...entryData,
      id: generateId(),
      vytvoreno: new Date().toISOString(),
    };
    
    try {
      // Store tags as comma-separated string
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'zdravi',
        [
          entry.id,
          entry.typ,
          entry.nazev,
          entry.datum,
          entry.popis || '',
          entry.lekar || '',
          entry.vysledek || '',
          entry.dalsi_termin || '',
          entry.pripominka_dny?.toString() || '',
          entry.kategorie,
          entry.tagy.join(', '),
          entry.vytvoreno,
        ]
      );
      
      set({ entries: [...get().entries, entry] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(5, 'health_entry', `Zdravotní záznam: ${entry.nazev}`, entry.id);
    } catch (error) {
      console.error('Failed to add health entry:', error);
      throw error;
    }
  },
  
  updateEntry: async (id: string, updates: Partial<ZdraviEntry>) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entries = get().entries;
    const entryIndex = entries.findIndex((e) => e.id === id);
    if (entryIndex === -1) return;
    
    const entry = entries[entryIndex];
    const updatedEntry: ZdraviEntry = {
      ...entry,
      ...updates,
    };
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'zdravi',
        entryIndex + 2,
        [
          updatedEntry.id,
          updatedEntry.typ,
          updatedEntry.nazev,
          updatedEntry.datum,
          updatedEntry.popis || '',
          updatedEntry.lekar || '',
          updatedEntry.vysledek || '',
          updatedEntry.dalsi_termin || '',
          updatedEntry.pripominka_dny?.toString() || '',
          updatedEntry.kategorie,
          updatedEntry.tagy.join(', '),
          updatedEntry.vytvoreno,
        ]
      );
      
      const newEntries = [...entries];
      newEntries[entryIndex] = updatedEntry;
      set({ entries: newEntries });
    } catch (error) {
      console.error('Failed to update health entry:', error);
      throw error;
    }
  },
  
  deleteEntry: async (id: string) => {
    const entries = get().entries;
    const newEntries = entries.filter((e) => e.id !== id);
    set({ entries: newEntries });
  },
  
  getUpcomingAppointments: () => {
    const entries = get().entries;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return entries
      .filter(entry => {
        if (!entry.dalsi_termin) return false;
        const appointmentDate = new Date(entry.dalsi_termin);
        return appointmentDate >= today;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dalsi_termin!);
        const dateB = new Date(b.dalsi_termin!);
        return dateA.getTime() - dateB.getTime();
      });
  },
}));
