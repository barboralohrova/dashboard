import { create } from 'zustand';
import type { User } from '../types';
import * as googleAuth from '../services/googleAuth';
import { initializeSpreadsheet } from '../services/googleSheets';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  spreadsheetId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: () => Promise<void>;
  handleCallback: () => Promise<void>;
  logout: () => void;
  setSpreadsheetId: (id: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  spreadsheetId: localStorage.getItem('spreadsheet_id'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async () => {
    try {
      await googleAuth.initiateGoogleLogin();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  
  handleCallback: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { accessToken } = await googleAuth.handleOAuthCallback();
      const user = await googleAuth.getUserInfo(accessToken);
      
      // Inicializovat nebo načíst spreadsheet
      let spreadsheetId = localStorage.getItem('spreadsheet_id');
      if (!spreadsheetId) {
        spreadsheetId = await initializeSpreadsheet(accessToken);
        localStorage.setItem('spreadsheet_id', spreadsheetId);
      }
      
      set({
        user,
        accessToken,
        refreshToken: null,
        spreadsheetId,
        isAuthenticated: true,
        isLoading: false,
      });
      
      // Přesměrovat na dashboard
      window.location.href = window.location.origin + '/dashboard/';
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('spreadsheet_id');
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      spreadsheetId: null,
      isAuthenticated: false,
    });
    window.location.href = window.location.origin + '/dashboard/';
  },
  
  setSpreadsheetId: (id: string) => {
    localStorage.setItem('spreadsheet_id', id);
    set({ spreadsheetId: id });
  },
}));
