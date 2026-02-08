import { create } from 'zustand';
import { Task, TaskFilter, TaskComplexity, TaskStatus, TaskRepeat } from '../types';
import { generateId, isToday, isSameDay } from '../utils/helpers';
import { calculateTaskXP } from '../utils/xpCalculator';
import { readFromSheet, appendToSheet, updateSheetRow } from '../services/googleSheets';
import { useAuthStore } from './authStore';
import { useGameStore } from './gameStore';

interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
  
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'datum_vytvoreni' | 'stav'>) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilter: (filter: Partial<TaskFilter>) => void;
  getTasksForToday: () => Task[];
  regenerateDailyTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filter: {
    type: 'vse',
    sort: 'deadline',
    showCompleted: false,
  },
  isLoading: false,
  
  loadTasks: async () => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    set({ isLoading: true });
    
    try {
      const data = await readFromSheet<Task>(accessToken, spreadsheetId, 'ukoly');
      set({ tasks: data, isLoading: false });
      
      // Regenerovat denní úkoly
      await get().regenerateDailyTasks();
    } catch (error) {
      console.error('Failed to load tasks:', error);
      set({ isLoading: false });
    }
  },
  
  addTask: async (taskData) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const task: Task = {
      ...taskData,
      id: generateId(),
      datum_vytvoreni: new Date().toISOString(),
      stav: 'aktivni',
    };
    
    try {
      await appendToSheet(
        accessToken,
        spreadsheetId,
        'ukoly',
        [
          task.id,
          task.nazev,
          task.popis || '',
          task.kategorie,
          task.slozitost,
          task.stav,
          task.datum_vytvoreni,
          task.datum_splneni || '',
          task.datum_deadline || '',
          task.opakovani,
          task.modul,
          task.xp_udeleno?.toString() || '',
        ]
      );
      
      set({ tasks: [...get().tasks, task] });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },
  
  completeTask: async (id: string) => {
    const { accessToken, spreadsheetId } = useAuthStore.getState();
    if (!accessToken || !spreadsheetId) return;
    
    const tasks = get().tasks;
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) return;
    
    const task = tasks[taskIndex];
    const completedDate = new Date();
    const deadline = task.datum_deadline ? new Date(task.datum_deadline) : undefined;
    
    // Vypočítat XP
    const xp = calculateTaskXP(task.slozitost, completedDate, deadline);
    
    // Aktualizovat úkol
    const updatedTask: Task = {
      ...task,
      stav: 'splneno',
      datum_splneni: completedDate.toISOString(),
      xp_udeleno: xp,
    };
    
    try {
      // Aktualizovat v Google Sheets (řádek = index + 2, protože 1 je hlavička)
      await updateSheetRow(
        accessToken,
        spreadsheetId,
        'ukoly',
        taskIndex + 2,
        [
          updatedTask.id,
          updatedTask.nazev,
          updatedTask.popis || '',
          updatedTask.kategorie,
          updatedTask.slozitost,
          updatedTask.stav,
          updatedTask.datum_vytvoreni,
          updatedTask.datum_splneni || '',
          updatedTask.datum_deadline || '',
          updatedTask.opakovani,
          updatedTask.modul,
          updatedTask.xp_udeleno?.toString() || '',
        ]
      );
      
      // Aktualizovat lokální stav
      const newTasks = [...tasks];
      newTasks[taskIndex] = updatedTask;
      set({ tasks: newTasks });
      
      // Přidat XP
      const gameStore = useGameStore.getState();
      await gameStore.addXP(xp, 'task_completion', `Úkol dokončen: ${task.nazev}`, task.id);
      await gameStore.checkStreak();
      
      // Kontrola perfektního dne
      const todayTasks = get().getTasksForToday();
      const allCompleted = todayTasks.every((t) => t.stav === 'splneno');
      if (allCompleted && todayTasks.length > 0) {
        await gameStore.addXP(25, 'perfect_day', 'Perfektní den! Všechny úkoly splněny! 🌟');
        gameStore.updateListkaState();
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  },
  
  deleteTask: async (id: string) => {
    // Pro jednoduchost nyní pouze označíme jako zrušeno
    const tasks = get().tasks;
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) return;
    
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...newTasks[taskIndex], stav: 'zruseno' };
    set({ tasks: newTasks });
  },
  
  setFilter: (filter: Partial<TaskFilter>) => {
    set({ filter: { ...get().filter, ...filter } });
  },
  
  getTasksForToday: () => {
    const tasks = get().tasks;
    const today = new Date();
    
    return tasks.filter((task) => {
      if (task.stav !== 'aktivni') return false;
      
      if (task.opakovani === 'denní') {
        // Denní úkoly - kontrola, zda jsou pro dnešek
        return isToday(task.datum_vytvoreni);
      } else if (task.opakovani === 'jednorázový') {
        // Jednorázové úkoly bez deadlinu nebo s deadlinem dnes
        if (!task.datum_deadline) return true;
        return isSameDay(today, task.datum_deadline);
      }
      
      return false;
    });
  },
  
  regenerateDailyTasks: async () => {
    const tasks = get().tasks;
    const today = new Date();
    
    // Najít všechny denní šablony
    const dailyTemplates = tasks.filter(
      (t) => t.opakovani === 'denní' && t.kategorie === 'template'
    );
    
    // Zkontrolovat, zda pro dnešek existují instance
    for (const template of dailyTemplates) {
      const todayInstance = tasks.find(
        (t) =>
          t.nazev === template.nazev &&
          t.opakovani === 'denní' &&
          t.kategorie !== 'template' &&
          isToday(t.datum_vytvoreni)
      );
      
      if (!todayInstance) {
        // Vytvořit novou instanci pro dnešek
        await get().addTask({
          nazev: template.nazev,
          popis: template.popis,
          kategorie: 'daily',
          slozitost: template.slozitost,
          opakovani: 'denní',
          modul: template.modul,
          datum_deadline: today.toISOString().split('T')[0],
        });
      }
    }
  },
}));
