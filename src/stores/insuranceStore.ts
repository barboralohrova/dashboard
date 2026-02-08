import { create } from 'zustand';
import type { PojisteniEntry, InsuranceType } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface InsuranceStore {
  entries: PojisteniEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<PojisteniEntry, 'id' | 'datum_pridani'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<PojisteniEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getExpiringPolicies: (daysAhead?: number) => PojisteniEntry[];
  getMonthlyCost: () => number;
}

export const useInsuranceStore = create<InsuranceStore>((set, get) => ({
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'pojisteni');
      
      // Parse data
      const entries: PojisteniEntry[] = data.map((row: Record<string, string>) => ({
        id: row.id,
        nazev: row.nazev,
        typ_pojisteni: row.typ_pojisteni as InsuranceType,
        pojistovna: row.pojistovna,
        cislo_smlouvy: row.cislo_smlouvy || undefined,
        castka_mesicne: Number(row.castka_mesicne),
        datum_zacatku: row.datum_zacatku,
        datum_konce: row.datum_konce || undefined,
        poznamka: row.poznamka || undefined,
        pripominka_pred_koncem_dny: row.pripominka_pred_koncem_dny ? Number(row.pripominka_pred_koncem_dny) : undefined,
        datum_pridani: row.datum_pridani,
      }));
      
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load insurance policies:', error);
      set({ entries: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'pojisteni');
          const entries: PojisteniEntry[] = data.map((row: Record<string, string>) => ({
            id: row.id,
            nazev: row.nazev,
            typ_pojisteni: row.typ_pojisteni as InsuranceType,
            pojistovna: row.pojistovna,
            cislo_smlouvy: row.cislo_smlouvy || undefined,
            castka_mesicne: Number(row.castka_mesicne),
            datum_zacatku: row.datum_zacatku,
            datum_konce: row.datum_konce || undefined,
            poznamka: row.poznamka || undefined,
            pripominka_pred_koncem_dny: row.pripominka_pred_koncem_dny ? Number(row.pripominka_pred_koncem_dny) : undefined,
            datum_pridani: row.datum_pridani,
          }));
          set({ entries, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load insurance policies:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEntry: async (entryData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entry: PojisteniEntry = {
      ...entryData,
      id: generateId(),
      datum_pridani: new Date().toISOString(),
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'pojisteni',
        [
          entry.id,
          entry.nazev,
          entry.typ_pojisteni,
          entry.pojistovna,
          entry.cislo_smlouvy || '',
          entry.castka_mesicne.toString(),
          entry.datum_zacatku,
          entry.datum_konce || '',
          entry.poznamka || '',
          entry.pripominka_pred_koncem_dny?.toString() || '',
          entry.datum_pridani,
        ]
      );
      
      set({ entries: [...get().entries, entry] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(10, 'insurance', `Nová pojistka: ${entry.nazev}`, entry.id);
    } catch (error) {
      console.error('Failed to add insurance policy:', error);
      throw error;
    }
  },
  
  updateEntry: async (id: string, updates: Partial<PojisteniEntry>) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entries = get().entries;
    const entryIndex = entries.findIndex((e) => e.id === id);
    if (entryIndex === -1) return;
    
    const entry = entries[entryIndex];
    const updatedEntry: PojisteniEntry = {
      ...entry,
      ...updates,
    };
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'pojisteni',
        entryIndex + 2,
        [
          updatedEntry.id,
          updatedEntry.nazev,
          updatedEntry.typ_pojisteni,
          updatedEntry.pojistovna,
          updatedEntry.cislo_smlouvy || '',
          updatedEntry.castka_mesicne.toString(),
          updatedEntry.datum_zacatku,
          updatedEntry.datum_konce || '',
          updatedEntry.poznamka || '',
          updatedEntry.pripominka_pred_koncem_dny?.toString() || '',
          updatedEntry.datum_pridani,
        ]
      );
      
      const newEntries = [...entries];
      newEntries[entryIndex] = updatedEntry;
      set({ entries: newEntries });
    } catch (error) {
      console.error('Failed to update insurance policy:', error);
      throw error;
    }
  },
  
  deleteEntry: async (id: string) => {
    const entries = get().entries;
    const newEntries = entries.filter((e) => e.id !== id);
    set({ entries: newEntries });
  },
  
  getExpiringPolicies: (daysAhead: number = 30) => {
    const entries = get().entries;
    const now = new Date();
    const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    
    return entries.filter((entry) => {
      if (!entry.datum_konce) return false;
      
      const endDate = new Date(entry.datum_konce);
      const daysUntilExpiry = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (entry.pripominka_pred_koncem_dny) {
        return daysUntilExpiry <= entry.pripominka_pred_koncem_dny && daysUntilExpiry >= 0;
      }
      
      return endDate <= futureDate && endDate >= now;
    });
  },
  
  getMonthlyCost: () => {
    const entries = get().entries;
    return entries.reduce((sum, entry) => sum + entry.castka_mesicne, 0);
  },
}));
