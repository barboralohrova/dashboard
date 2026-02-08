import { create } from 'zustand';
import type { JidloEntry } from '../types';
import { generateId } from '../utils/helpers';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface FoodStore {
  recipes: JidloEntry[];
  isLoading: boolean;
  loadingRetryTimeout?: ReturnType<typeof setTimeout>;
  
  loadRecipes: () => Promise<void>;
  addRecipe: (recipe: Omit<JidloEntry, 'id' | 'datum_pridani'>) => Promise<void>;
  updateRecipe: (id: string, updates: Partial<JidloEntry>) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
}

export const useFoodStore = create<FoodStore>((set, get) => ({
  recipes: [],
  isLoading: false,
  loadingRetryTimeout: undefined,
  
  loadRecipes: async () => {
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
      const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'jidlo');
      
      // Parse ingredience and tagy from comma-separated strings to arrays
      // Parse cas_pripravy and porce to numbers
      // Parse oblibene to boolean
      const recipes: JidloEntry[] = data.map((row: Record<string, string>) => ({
        ...(row as unknown as JidloEntry),
        ingredience: row.ingredience ? row.ingredience.split(',').map((i: string) => i.trim()).filter(Boolean) : [],
        tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        cas_pripravy: parseInt(row.cas_pripravy) || 0,
        porce: parseInt(row.porce) || 1,
        oblibene: row.oblibene === 'true',
      }));
      
      set({ recipes, isLoading: false });
    } catch (error) {
      console.error('Failed to load recipes:', error);
      set({ recipes: [], isLoading: false });
      
      // Retry after a short delay (sheet might be initializing)
      const retryTimeout = setTimeout(async () => {
        try {
          const data = await readFromSheet<Record<string, string>>(accessToken, spreadsheetId, 'jidlo');
          const recipes: JidloEntry[] = data.map((row: Record<string, string>) => ({
            ...(row as unknown as JidloEntry),
            ingredience: row.ingredience ? row.ingredience.split(',').map((i: string) => i.trim()).filter(Boolean) : [],
            tagy: row.tagy ? row.tagy.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
            cas_pripravy: parseInt(row.cas_pripravy) || 0,
            porce: parseInt(row.porce) || 1,
            oblibene: row.oblibene === 'true',
          }));
          set({ recipes, loadingRetryTimeout: undefined });
        } catch (retryError) {
          console.error('Retry failed to load recipes:', retryError);
          set({ loadingRetryTimeout: undefined });
        }
      }, 2000);
      
      set({ loadingRetryTimeout: retryTimeout });
    }
  },
  
  addRecipe: async (recipeData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const recipe: JidloEntry = {
      ...recipeData,
      id: generateId(),
      datum_pridani: new Date().toISOString(),
    };
    
    try {
      // Store ingredience and tagy as comma-separated strings
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'jidlo',
        [
          recipe.id,
          recipe.nazev,
          recipe.typ_jidla,
          recipe.ingredience.join(', '),
          recipe.postup,
          recipe.cas_pripravy.toString(),
          recipe.porce.toString(),
          recipe.oblibene ? 'true' : 'false',
          recipe.tagy.join(', '),
          recipe.datum_pridani,
        ]
      );
      
      set({ recipes: [...get().recipes, recipe] });
      
      // Add XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(10, 'recipe_added', `Recept: ${recipe.nazev}`, recipe.id);
    } catch (error) {
      console.error('Failed to add recipe:', error);
      throw error;
    }
  },
  
  updateRecipe: async (id: string, updates: Partial<JidloEntry>) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const recipes = get().recipes;
    const recipeIndex = recipes.findIndex((r) => r.id === id);
    if (recipeIndex === -1) return;
    
    const recipe = recipes[recipeIndex];
    const updatedRecipe: JidloEntry = {
      ...recipe,
      ...updates,
    };
    
    try {
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'jidlo',
        recipeIndex + 2,
        [
          updatedRecipe.id,
          updatedRecipe.nazev,
          updatedRecipe.typ_jidla,
          updatedRecipe.ingredience.join(', '),
          updatedRecipe.postup,
          updatedRecipe.cas_pripravy.toString(),
          updatedRecipe.porce.toString(),
          updatedRecipe.oblibene ? 'true' : 'false',
          updatedRecipe.tagy.join(', '),
          updatedRecipe.datum_pridani,
        ]
      );
      
      const newRecipes = [...recipes];
      newRecipes[recipeIndex] = updatedRecipe;
      set({ recipes: newRecipes });
    } catch (error) {
      console.error('Failed to update recipe:', error);
      throw error;
    }
  },
  
  toggleFavorite: async (id: string) => {
    const recipes = get().recipes;
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;
    
    await get().updateRecipe(id, { oblibene: !recipe.oblibene });
  },
  
  deleteRecipe: async (id: string) => {
    const recipes = get().recipes;
    const newRecipes = recipes.filter((r) => r.id !== id);
    set({ recipes: newRecipes });
  },
}));
