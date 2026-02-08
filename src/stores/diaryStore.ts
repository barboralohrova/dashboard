import { create } from 'zustand';
import type { DenikEntry } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface DiaryStore {
  entries: DenikEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<DenikEntry, 'id' | 'vytvoreno' | 'upraveno'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<DenikEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
}

export const useDiaryStore = create<DiaryStore>((set, get) => ({
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'denik');
      
      // Parse tags from comma-separated string to array
      const entries: DenikEntry[] = data.map((row: Record<string, string>) => ({
        ...(row as unknown as DenikEntry),
        tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      }));
      
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load diary entries:', error);
      set({ entries: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'denik');
          const entries: DenikEntry[] = data.map((row: Record<string, string>) => ({
            ...(row as unknown as DenikEntry),
            tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
          }));
          set({ entries, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load diary entries:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEntry: async (entryData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const now = new Date().toISOString();
    const entry: DenikEntry = {
      ...entryData,
      id: generateId(),
      vytvoreno: now,
      upraveno: now,
    };
    
    try {
      // Store tags as comma-separated string
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'denik',
        [
          entry.id,
          entry.nazev,
          entry.obsah,
          entry.nalada,
          entry.datum,
          entry.tagy.join(', '),
          entry.vytvoreno,
          entry.upraveno,
        ]
      );
      
      set({ entries: [...get().entries, entry] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(10, 'diary_entry', `Deníkový zápis: ${entry.nazev}`, entry.id);
    } catch (error) {
      console.error('Failed to add diary entry:', error);
      throw error;
    }
  },
  
  updateEntry: async (id: string, updates: Partial<DenikEntry>) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entries = get().entries;
    const entryIndex = entries.findIndex((e) => e.id === id);
    if (entryIndex === -1) return;
    
    const entry = entries[entryIndex];
    const updatedEntry: DenikEntry = {
      ...entry,
      ...updates,
      upraveno: new Date().toISOString(),
    };
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'denik',
        entryIndex + 2,
        [
          updatedEntry.id,
          updatedEntry.nazev,
          updatedEntry.obsah,
          updatedEntry.nalada,
          updatedEntry.datum,
          updatedEntry.tagy.join(', '),
          updatedEntry.vytvoreno,
          updatedEntry.upraveno,
        ]
      );
      
      const newEntries = [...entries];
      newEntries[entryIndex] = updatedEntry;
      set({ entries: newEntries });
    } catch (error) {
      console.error('Failed to update diary entry:', error);
      throw error;
    }
  },
  
  deleteEntry: async (id: string) => {
    const entries = get().entries;
    const newEntries = entries.filter((e) => e.id !== id);
    set({ entries: newEntries });
    
    // Note: In a production app, we'd actually delete from sheets
    // For now, just remove from local state
  },
}));
