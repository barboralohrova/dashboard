import { create } from 'zustand';
import type { Predmet } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface LearningStore {
  subjects: Predmet[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadSubjects: () => Promise<void>;
  addSubject: (subject: Omit<Predmet, 'id'>) => Promise<void>;
  updateSubject: (id: string, updates: Partial<Predmet>) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
  getActiveSubjects: () => Predmet[];
  getCompletedSubjects: () => Predmet[];
}

export const useLearningStore = create<LearningStore>((set, get) => ({
  subjects: [],
  isLoading: false,
  loadingRetryTimeout: undefined,
  
  loadSubjects: async () => {
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'predmety');
      
      const subjects: Predmet[] = data.map((row: Record<string, string>) => ({
        id: row.id,
        nazev: row.nazev,
        kod: row.kod,
        ikona: row.ikona,
        semestr: row.semestr,
        kredity: parseInt(row.kredity) || 0,
        vyucujici: row.vyucujici,
        hodnoceni: row.hodnoceni,
        stav: row.stav as any,
        poznamka: row.poznamka,
      }));
      
      set({ subjects, isLoading: false });
    } catch (error) {
      console.error('Failed to load subjects:', error);
      set({ subjects: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'predmety');
          const subjects: Predmet[] = data.map((row: Record<string, string>) => ({
            id: row.id,
            nazev: row.nazev,
            kod: row.kod,
            ikona: row.ikona,
            semestr: row.semestr,
            kredity: parseInt(row.kredity) || 0,
            vyucujici: row.vyucujici,
            hodnoceni: row.hodnoceni,
            stav: row.stav as any,
            poznamka: row.poznamka,
          }));
          set({ subjects, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load subjects:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addSubject: async (subjectData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const subject: Predmet = {
      ...subjectData,
      id: generateId(),
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'predmety',
        [
          subject.id,
          subject.nazev,
          subject.kod,
          subject.ikona || '',
          subject.semestr,
          subject.kredity.toString(),
          subject.vyucujici || '',
          subject.hodnoceni || '',
          subject.stav,
          subject.poznamka || '',
        ]
      );
      
      set({ subjects: [...get().subjects, subject] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(10, 'subject_added', `Předmět přidán: ${subject.nazev}`, subject.id);
    } catch (error) {
      console.error('Failed to add subject:', error);
      throw error;
    }
  },
  
  updateSubject: async (id: string, updates: Partial<Predmet>) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const subjects = get().subjects;
    const subjectIndex = subjects.findIndex((s) => s.id === id);
    if (subjectIndex === -1) return;
    
    const subject = subjects[subjectIndex];
    const wasCompleted = subject.stav === 'ukoncen';
    const updatedSubject: Predmet = {
      ...subject,
      ...updates,
    };
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'predmety',
        subjectIndex + 2,
        [
          updatedSubject.id,
          updatedSubject.nazev,
          updatedSubject.kod,
          updatedSubject.ikona || '',
          updatedSubject.semestr,
          updatedSubject.kredity.toString(),
          updatedSubject.vyucujici || '',
          updatedSubject.hodnoceni || '',
          updatedSubject.stav,
          updatedSubject.poznamka || '',
        ]
      );
      
      const newSubjects = [...subjects];
      newSubjects[subjectIndex] = updatedSubject;
      set({ subjects: newSubjects });
      
      // Award bonus XP when completing a subject
      if (!wasCompleted && updatedSubject.stav === 'ukoncen') {
        const gameStore = useGameStore.getState();
        await gameStore.addXP(20, 'subject_completed', `Předmět ukončen: ${updatedSubject.nazev}`, updatedSubject.id);
      }
    } catch (error) {
      console.error('Failed to update subject:', error);
      throw error;
    }
  },
  
  deleteSubject: async (id: string) => {
    const subjects = get().subjects;
    const newSubjects = subjects.filter((s) => s.id !== id);
    set({ subjects: newSubjects });
  },
  
  getActiveSubjects: () => {
    const subjects = get().subjects;
    return subjects.filter(s => s.stav === 'aktivni');
  },
  
  getCompletedSubjects: () => {
    const subjects = get().subjects;
    return subjects.filter(s => s.stav === 'ukoncen');
  },
}));
