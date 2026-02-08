import { create } from 'zustand';
import type { FinanceEntry, FinanceSummary } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface FinanceStore {
  entries: FinanceEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<FinanceEntry, 'id' | 'vytvoreno'>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getSummary: () => FinanceSummary;
  getMonthlyData: (year: number, month: number) => FinanceEntry[];
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'finance');
      
      // Parse castka to number
      const entries: FinanceEntry[] = data.map((row: Record<string, string>) => ({
        ...(row as unknown as FinanceEntry),
        castka: parseFloat(row.castka) || 0,
      }));
      
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load finance entries:', error);
      set({ entries: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'finance');
          const entries: FinanceEntry[] = data.map((row: Record<string, string>) => ({
            ...(row as unknown as FinanceEntry),
            castka: parseFloat(row.castka) || 0,
          }));
          set({ entries, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load finance entries:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEntry: async (entryData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entry: FinanceEntry = {
      ...entryData,
      id: generateId(),
      vytvoreno: new Date().toISOString(),
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'finance',
        [
          entry.id,
          entry.typ,
          entry.castka.toString(),
          entry.kategorie,
          entry.popis,
          entry.datum,
          entry.opakovani,
          entry.vytvoreno,
        ]
      );
      
      set({ entries: [...get().entries, entry] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(5, 'finance_entry', `Finance: ${entry.popis}`, entry.id);
    } catch (error) {
      console.error('Failed to add finance entry:', error);
      throw error;
    }
  },
  
  deleteEntry: async (id: string) => {
    const entries = get().entries;
    const newEntries = entries.filter((e) => e.id !== id);
    set({ entries: newEntries });
  },
  
  getSummary: () => {
    const entries = get().entries;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    let celkemPrijmy = 0;
    let celkemVydaje = 0;
    let mesicniPrijmy = 0;
    let mesicniVydaje = 0;
    
    entries.forEach((entry) => {
      const entryDate = new Date(entry.datum);
      const isCurrentMonth = 
        entryDate.getMonth() === currentMonth && 
        entryDate.getFullYear() === currentYear;
      
      if (entry.typ === 'prijem') {
        celkemPrijmy += entry.castka;
        if (isCurrentMonth) mesicniPrijmy += entry.castka;
      } else {
        celkemVydaje += entry.castka;
        if (isCurrentMonth) mesicniVydaje += entry.castka;
      }
    });
    
    return {
      celkemPrijmy,
      celkemVydaje,
      bilance: celkemPrijmy - celkemVydaje,
      mesicniPrijmy,
      mesicniVydaje,
      mesicniBilance: mesicniPrijmy - mesicniVydaje,
    };
  },
  
  getMonthlyData: (year: number, month: number) => {
    const entries = get().entries;
    return entries.filter((entry) => {
      const entryDate = new Date(entry.datum);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });
  },
}));
