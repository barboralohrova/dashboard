import { create } from 'zustand';
import { GameState, ListkaState, XPLog } from '../types';
import { getLevelFromXP, getStreakMilestoneXP, XP_BONUSES } from '../utils/xpCalculator';
import { isSameDay, daysBetween, generateId } from '../utils/helpers';
import { readFromSheet, writeToSheet, appendToSheet } from '../services/googleSheets';
import { useAuthStore } from './authStore';

interface GameStore extends GameState {
  listkaState: ListkaState;
  xpForNextLevel: number;
  
  loadGameState: () => Promise<void>;
  addXP: (amount: number, source: string, description: string, sourceId?: string) => Promise<void>;
  checkLevelUp: () => void;
  checkStreak: () => Promise<void>;
  checkUnlocks: () => void;
  updateListkaState: () => void;
  saveGameState: () => Promise<void>;
}

// Odemykání dle levelů
const UNLOCKS: Record<number, { creatures?: string[]; decorations?: string[] }> = {
  3: { creatures: ['králíček'] },
  5: { decorations: ['květiny'] },
  7: { decorations: ['houby', 'kameny'] },
  10: { creatures: ['lístka_full'] },
  12: { decorations: ['cestičky'] },
  15: { creatures: ['ježek'] },
  17: { decorations: ['lucerny'] },
  20: { creatures: ['lišák'] },
  22: { decorations: ['mostek'] },
  25: { decorations: ['ploty', 'zahrádky'] },
  27: { creatures: ['sova'] },
  30: { decorations: ['rybníček'] },
  33: { creatures: ['žabička'] },
  35: { decorations: ['lavičky'] },
  38: { creatures: ['motýli'] },
  40: { decorations: ['vodopád'] },
  45: { creatures: ['světlušky'] },
  50: { creatures: ['srnka'], decorations: ['magické_efekty'] },
  70: { creatures: ['jednorožec'] },
  100: { creatures: ['lesní_drak'] },
};

export const useGameStore = create<GameStore>((set, get) => ({
  id: 'user_001',
  level: 1,
  xp: 0,
  xp_celkem: 0,
  streak_aktualni: 0,
  streak_nejdelsi: 0,
  posledni_aktivita: '',
  odemnuta_stvoreni: [],
  odemnute_dekorace: [],
  listkaState: 'happy',
  xpForNextLevel: 100,
  
  loadGameState: async () => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    try {
      const data = await readFromSheet<GameState>(accessToken, spreadsheetId, 'gamifikace');
      if (data.length > 0) {
        const gameData = data[0];
        const levelInfo = getLevelFromXP(parseInt(gameData.xp_celkem as any));
        
        set({
          ...gameData,
          level: levelInfo.level,
          xp: levelInfo.currentXP,
          xpForNextLevel: levelInfo.xpForNext,
          xp_celkem: parseInt(gameData.xp_celkem as any),
          streak_aktualni: parseInt(gameData.streak_aktualni as any),
          streak_nejdelsi: parseInt(gameData.streak_nejdelsi as any),
          odemnuta_stvoreni: gameData.odemnuta_stvoreni ? (gameData.odemnuta_stvoreni as string).split(',').filter(Boolean) : [],
          odemnute_dekorace: gameData.odemnute_dekorace ? (gameData.odemnute_dekorace as string).split(',').filter(Boolean) : [],
        });
        
        get().updateListkaState();
        get().checkUnlocks();
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
  },
  
  addXP: async (amount: number, source: string, description: string, sourceId?: string) => {
    const state = get();
    const newTotalXP = state.xp_celkem + amount;
    const levelInfo = getLevelFromXP(newTotalXP);
    
    // Zapsat do XP logu
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (accessToken && spreadsheetId) {
      const xpLog: XPLog = {
        id: generateId(),
        datum: new Date().toISOString(),
        zdroj: source,
        zdroj_id: sourceId,
        xp_hodnota: amount,
        popis: description,
      };
      
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'xp_log',
        [xpLog.id, xpLog.datum, xpLog.zdroj, xpLog.zdroj_id || '', xpLog.xp_hodnota.toString(), xpLog.popis]
      );
    }
    
    set({
      xp: levelInfo.currentXP,
      xp_celkem: newTotalXP,
      xpForNextLevel: levelInfo.xpForNext,
      posledni_aktivita: new Date().toISOString(),
    });
    
    // Kontrola level up
    if (levelInfo.level > state.level) {
      set({ level: levelInfo.level, listkaState: 'excited' });
      get().checkUnlocks();
      setTimeout(() => get().updateListkaState(), 3000);
    }
    
    await get().saveGameState();
  },
  
  checkLevelUp: () => {
    const state = get();
    const levelInfo = getLevelFromXP(state.xp_celkem);
    if (levelInfo.level > state.level) {
      set({ 
        level: levelInfo.level,
        xp: levelInfo.currentXP,
        xpForNextLevel: levelInfo.xpForNext,
        listkaState: 'excited',
      });
      get().checkUnlocks();
      setTimeout(() => get().updateListkaState(), 3000);
    }
  },
  
  checkStreak: async () => {
    const state = get();
    const today = new Date();
    
    if (!state.posledni_aktivita) {
      // První den
      set({ 
        streak_aktualni: 1, 
        posledni_aktivita: today.toISOString(),
      });
      return;
    }
    
    const lastActivity = new Date(state.posledni_aktivita);
    const daysDiff = daysBetween(lastActivity, today);
    
    if (isSameDay(lastActivity, today)) {
      // Stejný den - nic nedělat
      return;
    } else if (daysDiff === 1) {
      // Další den - pokračovat ve streaku
      const newStreak = state.streak_aktualni + 1;
      const milestoneXP = getStreakMilestoneXP(newStreak);
      
      set({ 
        streak_aktualni: newStreak,
        streak_nejdelsi: Math.max(newStreak, state.streak_nejdelsi),
        posledni_aktivita: today.toISOString(),
      });
      
      if (milestoneXP > 0) {
        await get().addXP(milestoneXP, 'streak_milestone', `Streak milestone: ${newStreak} dní!`);
      }
    } else if (daysDiff === 2) {
      // 1 den pauza - ospalá Lístka, streak se zachovává
      set({ 
        listkaState: 'sleepy',
        posledni_aktivita: today.toISOString(),
      });
    } else {
      // 2+ dny pauza - reset streaku
      set({ 
        streak_aktualni: 1,
        posledni_aktivita: today.toISOString(),
        listkaState: 'determined',
      });
      
      // Bonus za návrat
      await get().addXP(XP_BONUSES.RETURN_AFTER_BREAK, 'return_bonus', 'Vítej zpátky! 🎉');
      setTimeout(() => get().updateListkaState(), 3000);
    }
    
    await get().saveGameState();
  },
  
  checkUnlocks: () => {
    const state = get();
    const unlocks = UNLOCKS[state.level];
    
    if (unlocks) {
      const newCreatures = [...state.odemnuta_stvoreni];
      const newDecorations = [...state.odemnute_dekorace];
      
      if (unlocks.creatures) {
        unlocks.creatures.forEach((creature) => {
          if (!newCreatures.includes(creature)) {
            newCreatures.push(creature);
          }
        });
      }
      
      if (unlocks.decorations) {
        unlocks.decorations.forEach((decoration) => {
          if (!newDecorations.includes(decoration)) {
            newDecorations.push(decoration);
          }
        });
      }
      
      set({
        odemnuta_stvoreni: newCreatures,
        odemnute_dekorace: newDecorations,
      });
    }
  },
  
  updateListkaState: () => {
    const state = get();
    
    if (!state.posledni_aktivita) {
      set({ listkaState: 'happy' });
      return;
    }
    
    const lastActivity = new Date(state.posledni_aktivita);
    const daysDiff = daysBetween(lastActivity, new Date());
    
    if (daysDiff === 0) {
      set({ listkaState: 'happy' });
    } else if (daysDiff === 1) {
      set({ listkaState: 'sleepy' });
    } else {
      set({ listkaState: 'sad' });
    }
  },
  
  saveGameState: async () => {
    const state = get();
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    try {
      await writeToSheet(
        accessToken,
        spreadsheetId,
        'gamifikace',
        [[
          state.id,
          state.level.toString(),
          state.xp.toString(),
          state.xp_celkem.toString(),
          state.streak_aktualni.toString(),
          state.streak_nejdelsi.toString(),
          state.posledni_aktivita,
          state.odemnuta_stvoreni.join(','),
          state.odemnute_dekorace.join(','),
        ]],
        'A2'
      );
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  },
}));
