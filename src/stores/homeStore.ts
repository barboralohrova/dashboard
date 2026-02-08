import { create } from 'zustand';
import type { DomacnostEntry } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface HomeStore {
  entries: DomacnostEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<DomacnostEntry, 'id' | 'vytvoreno'>) => Promise<void>;
  completeEntry: (id: string) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getOverdueEntries: () => DomacnostEntry[];
}

export const useHomeStore = create<HomeStore>((set, get) => ({
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'domacnost');
      
      const entries: DomacnostEntry[] = data.map((row: Record<string, string>) => ({
        id: row.id,
        nazev: row.nazev,
        typ: row.typ as any,
        frekvence: row.frekvence as any,
        posledni_splneni: row.posledni_splneni,
        dalsi_termin: row.dalsi_termin,
        priorita: row.priorita as any,
        mistnost: row.mistnost,
        poznamka: row.poznamka,
        vytvoreno: row.vytvoreno,
      }));
      
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load home entries:', error);
      set({ entries: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'domacnost');
          const entries: DomacnostEntry[] = data.map((row: Record<string, string>) => ({
            id: row.id,
            nazev: row.nazev,
            typ: row.typ as any,
            frekvence: row.frekvence as any,
            posledni_splneni: row.posledni_splneni,
            dalsi_termin: row.dalsi_termin,
            priorita: row.priorita as any,
            mistnost: row.mistnost,
            poznamka: row.poznamka,
            vytvoreno: row.vytvoreno,
          }));
          set({ entries, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load home entries:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEntry: async (entryData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entry: DomacnostEntry = {
      ...entryData,
      id: generateId(),
      vytvoreno: new Date().toISOString(),
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'domacnost',
        [
          entry.id,
          entry.nazev,
          entry.typ,
          entry.frekvence,
          entry.posledni_splneni || '',
          entry.dalsi_termin || '',
          entry.priorita,
          entry.mistnost || '',
          entry.poznamka || '',
          entry.vytvoreno,
        ]
      );
      
      set({ entries: [...get().entries, entry] });
    } catch (error) {
      console.error('Failed to add home entry:', error);
      throw error;
    }
  },
  
  completeEntry: async (id: string) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entries = get().entries;
    const entryIndex = entries.findIndex((e) => e.id === id);
    if (entryIndex === -1) return;
    
    const entry = entries[entryIndex];
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Calculate next due date based on frequency
    let nextDueDate = '';
    if (entry.frekvence !== 'jednorázový') {
      const nextDate = new Date(now);
      switch (entry.frekvence) {
        case 'denní':
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case 'týdenní':
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case 'měsíční':
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case 'roční':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
      }
      nextDueDate = nextDate.toISOString().split('T')[0];
    }
    
    const updatedEntry: DomacnostEntry = {
      ...entry,
      posledni_splneni: today,
      dalsi_termin: nextDueDate || entry.dalsi_termin,
    };
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'domacnost',
        entryIndex + 2,
        [
          updatedEntry.id,
          updatedEntry.nazev,
          updatedEntry.typ,
          updatedEntry.frekvence,
          updatedEntry.posledni_splneni || '',
          updatedEntry.dalsi_termin || '',
          updatedEntry.priorita,
          updatedEntry.mistnost || '',
          updatedEntry.poznamka || '',
          updatedEntry.vytvoreno,
        ]
      );
      
      const newEntries = [...entries];
      newEntries[entryIndex] = updatedEntry;
      set({ entries: newEntries });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(5, 'home_task_completed', `Úkol splněn: ${entry.nazev}`, entry.id);
    } catch (error) {
      console.error('Failed to complete home entry:', error);
      throw error;
    }
  },
  
  deleteEntry: async (id: string) => {
    const entries = get().entries;
    const newEntries = entries.filter((e) => e.id !== id);
    set({ entries: newEntries });
  },
  
  getOverdueEntries: () => {
    const entries = get().entries;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return entries
      .filter(entry => {
        if (!entry.dalsi_termin) return false;
        const dueDate = new Date(entry.dalsi_termin);
        return dueDate < today;
      })
      .sort((a, b) => {
        // Sort by priority first (vysoká > střední > nízká)
        const priorityOrder = { 'vysoká': 0, 'střední': 1, 'nízká': 2 };
        const priorityDiff = priorityOrder[a.priorita] - priorityOrder[b.priorita];
        if (priorityDiff !== 0) return priorityDiff;
        
        // Then by due date
        const dateA = new Date(a.dalsi_termin!);
        const dateB = new Date(b.dalsi_termin!);
        return dateA.getTime() - dateB.getTime();
      });
  },
}));
