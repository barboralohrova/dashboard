import { create } from 'zustand';
import type { Navyk, NavykLog } from '../types';
import { generateId, isSameDay } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface HabitStore {
  habits: Navyk[];
  habitLogs: NavykLog[];
  isLoading: boolean;
  
  loadHabits: () => Promise<void>;
  addHabit: (habit: Omit<Navyk, 'id' | 'datum_vytvoreni' | 'aktivni'>) => Promise<void>;
  toggleHabitForToday: (habitId: string) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  getHabitsForToday: () => { habit: Navyk; completed: boolean; streak: number }[];
}

const XP_REWARDS = {
  easy: 5,
  medium: 10,
  hard: 15,
};

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  habitLogs: [],
  isLoading: false,
  
  loadHabits: async () => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    set({ isLoading: true });
    
    try {
      const [habitsData, logsData] = await Promise.all([
        readFromSheet<Navyk>(accessToken, spreadsheetId, 'navyky'),
        readFromSheet<NavykLog>(accessToken, spreadsheetId, 'navyky_log'),
      ]);
      
      set({ 
        habits: habitsData.filter(h => h.aktivni !== false && h.aktivni as any !== 'false'),
        habitLogs: logsData,
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to load habits:', error);
      // Set empty arrays on error - sheets may not be initialized yet
      set({ habits: [], habitLogs: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      setTimeout(async () => {
        try {
          const [habitsData, logsData] = await Promise.all([
            readFromSheet<Navyk>(accessToken, spreadsheetId, 'navyky'),
            readFromSheet<NavykLog>(accessToken, spreadsheetId, 'navyky_log'),
          ]);
          set({ 
            habits: habitsData.filter(h => h.aktivni !== false && h.aktivni as any !== 'false'),
            habitLogs: logsData
          });
        } catch (retryError) {
          console.error('Retry failed to load habits:', retryError);
          // Keep empty arrays, don't throw
        }
      }, 2000);
    }
  },
  
  addHabit: async (habitData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const habit: Navyk = {
      ...habitData,
      id: generateId(),
      datum_vytvoreni: new Date().toISOString(),
      aktivni: true,
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'navyky',
        [
          habit.id,
          habit.nazev,
          habit.ikona,
          habit.frekvence,
          habit.cilova_hodnota.toString(),
          habit.jednotka,
          habit.obtiznost,
          'true',
          habit.datum_vytvoreni,
        ]
      );
      
      set({ habits: [...get().habits, habit] });
    } catch (error) {
      console.error('Failed to add habit:', error);
      throw error;
    }
  },
  
  toggleHabitForToday: async (habitId: string) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const { habits, habitLogs } = get();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const today = new Date().toISOString().split('T')[0];
    const existingLog = habitLogs.find(
      log => log.navyk_id === habitId && log.datum.startsWith(today)
    );
    
    try {
      if (existingLog) {
        // Toggle completion - mark as incomplete
        const updatedLog: NavykLog = {
          ...existingLog,
          splneno: !existingLog.splneno,
          xp_udeleno: existingLog.splneno ? undefined : existingLog.xp_udeleno,
        };
        
        const logIndex = habitLogs.findIndex(l => l.id === existingLog.id);
        
        await updateSheetRow(
          accessToken,
          spreadsheetId,
          'navyky_log',
          logIndex + 2,
          [
            updatedLog.id,
            updatedLog.navyk_id,
            updatedLog.datum,
            updatedLog.hodnota.toString(),
            updatedLog.splneno ? 'true' : 'false',
            updatedLog.xp_udeleno?.toString() || '',
          ]
        );
        
        const newLogs = [...habitLogs];
        newLogs[logIndex] = updatedLog;
        set({ habitLogs: newLogs });
        
        // Remove XP if uncompleting
        if (existingLog.splneno && existingLog.xp_udeleno) {
          // Note: This is a simplification - ideally we'd have a removeXP function
          console.log('Habit uncompleted, XP removal not fully implemented');
        }
      } else {
        // Create new log entry - mark as complete
        const xp = XP_REWARDS[habit.obtiznost];
        
        const log: NavykLog = {
          id: generateId(),
          navyk_id: habitId,
          datum: new Date().toISOString(),
          hodnota: habit.cilova_hodnota,
          splneno: true,
          xp_udeleno: xp,
        };
        
        await appendToSheet(
          accessToken,
          spreadsheetId,
          'navyky_log',
          [
            log.id,
            log.navyk_id,
            log.datum,
            log.hodnota.toString(),
            'true',
            log.xp_udeleno?.toString() || '',
          ]
        );
        
        set({ habitLogs: [...habitLogs, log] });
        
        // Add XP
        const gameStore = useGameStore.getState();
        await gameStore.addXP(xp, 'habit_completion', `Návyk splněn: ${habit.nazev}`, habit.id);
        await gameStore.checkStreak();
      }
    } catch (error) {
      console.error('Failed to toggle habit:', error);
      throw error;
    }
  },
  
  deleteHabit: async (habitId: string) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const { habits } = get();
    const habitIndex = habits.findIndex(h => h.id === habitId);
    if (habitIndex === -1) return;
    
    try {
      // Mark as inactive rather than deleting
      const habit = habits[habitIndex];
      const updatedHabit = { ...habit, aktivni: false };
      
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'navyky',
        habitIndex + 2,
        [
          updatedHabit.id,
          updatedHabit.nazev,
          updatedHabit.ikona,
          updatedHabit.frekvence,
          updatedHabit.cilova_hodnota.toString(),
          updatedHabit.jednotka,
          updatedHabit.obtiznost,
          'false',
          updatedHabit.datum_vytvoreni,
        ]
      );
      
      // Remove from local state
      const newHabits = habits.filter(h => h.id !== habitId);
      set({ habits: newHabits });
    } catch (error) {
      console.error('Failed to delete habit:', error);
      throw error;
    }
  },
  
  getHabitsForToday: () => {
    const { habits, habitLogs } = get();
    const today = new Date().toISOString().split('T')[0];
    
    return habits
      .filter(habit => {
        if (!habit.aktivni) return false;
        
        // For daily habits, show every day
        if (habit.frekvence === 'denni') return true;
        
        // For weekly habits, show all (simplified - could be enhanced with day-of-week logic)
        if (habit.frekvence === 'tydeni') return true;
        
        return false;
      })
      .map(habit => {
        // Check if completed today
        const todayLog = habitLogs.find(
          log => log.navyk_id === habit.id && log.datum.startsWith(today) && log.splneno
        );
        
        // Calculate streak (consecutive days completed)
        let streak = 0;
        const sortedLogs = habitLogs
          .filter(log => log.navyk_id === habit.id && log.splneno)
          .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
        
        if (sortedLogs.length > 0) {
          let checkDate = new Date();
          checkDate.setHours(0, 0, 0, 0);
          
          // If not completed today, start from yesterday
          if (!todayLog) {
            checkDate.setDate(checkDate.getDate() - 1);
          }
          
          for (const log of sortedLogs) {
            const logDate = new Date(log.datum);
            logDate.setHours(0, 0, 0, 0);
            
            if (isSameDay(logDate, checkDate)) {
              streak++;
              checkDate.setDate(checkDate.getDate() - 1);
            } else {
              break;
            }
          }
        }
        
        return {
          habit,
          completed: !!todayLog,
          streak,
        };
      });
  },
}));
