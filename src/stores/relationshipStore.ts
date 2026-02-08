import { create } from 'zustand';
import type { VztahEntry, RelationshipType } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface RelationshipStore {
  entries: VztahEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<VztahEntry, 'id' | 'datum_pridani'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<VztahEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  markContacted: (id: string) => Promise<void>;
  getContactsNeedingAttention: () => VztahEntry[];
}

export const useRelationshipStore = create<RelationshipStore>((set, get) => ({
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'vztahy');
      
      // Parse data
      const entries: VztahEntry[] = data.map((row: Record<string, string>) => ({
        id: row.id,
        jmeno: row.jmeno,
        typ_vztahu: row.typ_vztahu as RelationshipType,
        narozeniny: row.narozeniny || undefined,
        kontakt: row.kontakt || undefined,
        poznamka: row.poznamka || undefined,
        posledni_kontakt: row.posledni_kontakt || undefined,
        pripominka_dny: row.pripominka_dny ? Number(row.pripominka_dny) : undefined,
        tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        datum_pridani: row.datum_pridani,
      }));
      
      set({ entries, isLoading: false });
    } catch (error) {
      console.error('Failed to load relationships:', error);
      set({ entries: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'vztahy');
          const entries: VztahEntry[] = data.map((row: Record<string, string>) => ({
            id: row.id,
            jmeno: row.jmeno,
            typ_vztahu: row.typ_vztahu as RelationshipType,
            narozeniny: row.narozeniny || undefined,
            kontakt: row.kontakt || undefined,
            poznamka: row.poznamka || undefined,
            posledni_kontakt: row.posledni_kontakt || undefined,
            pripominka_dny: row.pripominka_dny ? Number(row.pripominka_dny) : undefined,
            tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
            datum_pridani: row.datum_pridani,
          }));
          set({ entries, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load relationships:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addEntry: async (entryData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entry: VztahEntry = {
      ...entryData,
      id: generateId(),
      datum_pridani: new Date().toISOString(),
    };
    
    try {
      // Store tags as comma-separated string
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'vztahy',
        [
          entry.id,
          entry.jmeno,
          entry.typ_vztahu,
          entry.narozeniny || '',
          entry.kontakt || '',
          entry.poznamka || '',
          entry.posledni_kontakt || '',
          entry.pripominka_dny?.toString() || '',
          entry.tagy.join(', '),
          entry.datum_pridani,
        ]
      );
      
      set({ entries: [...get().entries, entry] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(5, 'relationship', `Nový kontakt: ${entry.jmeno}`, entry.id);
    } catch (error) {
      console.error('Failed to add relationship:', error);
      throw error;
    }
  },
  
  updateEntry: async (id: string, updates: Partial<VztahEntry>) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const entries = get().entries;
    const entryIndex = entries.findIndex((e) => e.id === id);
    if (entryIndex === -1) return;
    
    const entry = entries[entryIndex];
    const updatedEntry: VztahEntry = {
      ...entry,
      ...updates,
    };
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'vztahy',
        entryIndex + 2,
        [
          updatedEntry.id,
          updatedEntry.jmeno,
          updatedEntry.typ_vztahu,
          updatedEntry.narozeniny || '',
          updatedEntry.kontakt || '',
          updatedEntry.poznamka || '',
          updatedEntry.posledni_kontakt || '',
          updatedEntry.pripominka_dny?.toString() || '',
          updatedEntry.tagy.join(', '),
          updatedEntry.datum_pridani,
        ]
      );
      
      const newEntries = [...entries];
      newEntries[entryIndex] = updatedEntry;
      set({ entries: newEntries });
    } catch (error) {
      console.error('Failed to update relationship:', error);
      throw error;
    }
  },
  
  deleteEntry: async (id: string) => {
    const entries = get().entries;
    const newEntries = entries.filter((e) => e.id !== id);
    set({ entries: newEntries });
  },
  
  markContacted: async (id: string) => {
    const now = new Date().toISOString();
    await get().updateEntry(id, { posledni_kontakt: now });
  },
  
  getContactsNeedingAttention: () => {
    const entries = get().entries;
    const now = new Date();
    
    return entries.filter((entry) => {
      if (!entry.pripominka_dny || !entry.posledni_kontakt) return false;
      
      const lastContact = new Date(entry.posledni_kontakt);
      const daysSince = Math.floor((now.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24));
      
      return daysSince >= entry.pripominka_dny;
    });
  },
}));
