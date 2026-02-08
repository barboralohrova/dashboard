import { create } from 'zustand';
import type { User } from '../types';
import * as googleAuth from '../services/googleAuth';
import { initializeSpreadsheet } from '../services/googleSheets';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  spreadsheetId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: () => Promise<void>;
  handleCallback: () => Promise<void>;
  restoreSession: () => Promise<void>;
  logout: () => void;
  setSpreadsheetId: (id: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
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
      
      // Initialize or load spreadsheet
      let spreadsheetId = localStorage.getItem('spreadsheet_id');
      if (!spreadsheetId) {
        spreadsheetId = await initializeSpreadsheet(accessToken);
        localStorage.setItem('spreadsheet_id', spreadsheetId);
      }
      
      // Save to sessionStorage for persistence across reloads
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('user_data', JSON.stringify(user));
      
      // Update state - NO page redirect! React will re-render automatically
      set({
        user,
        accessToken,
        spreadsheetId,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Auth callback error:', error);
      set({
        error: (error as Error).message,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },
  
  restoreSession: async () => {
    const savedToken = sessionStorage.getItem('access_token');
    const savedUser = sessionStorage.getItem('user_data');
    
    if (savedToken && savedUser) {
      try {
        // Verify token is still valid by fetching user info
        const user = await googleAuth.getUserInfo(savedToken);
        set({
          user,
          accessToken: savedToken,
          spreadsheetId: localStorage.getItem('spreadsheet_id'),
          isAuthenticated: true,
        });
      } catch {
        // Token expired or invalid, clear saved data
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user_data');
      }
    }
  },
  
  logout: () => {
    localStorage.removeItem('spreadsheet_id');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_data');
    set({
      user: null,
      accessToken: null,
      spreadsheetId: null,
      isAuthenticated: false,
      error: null,
    });
  },
  
  setSpreadsheetId: (id: string) => {
    localStorage.setItem('spreadsheet_id', id);
    set({ spreadsheetId: id });
  },
}));
