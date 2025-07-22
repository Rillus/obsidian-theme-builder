import { create } from 'zustand';
import type { ThemeConfiguration, ThemeExport } from '../types/theme';
import { ThemeEngine } from '../utils/themeEngine';

interface ThemeState {
  // Core state
  themeEngine: ThemeEngine;
  configuration: ThemeConfiguration;
  validation: { isValid: boolean; errors: string[] };
  
  // UI state
  isExporting: boolean;
  exportError: string | null;
  lastSaved: Date | null;
  
  // Undo/redo state
  history: ThemeConfiguration[];
  historyIndex: number;
  maxHistorySize: number;
  
  // Actions
  updateConfiguration: (updates: Partial<ThemeConfiguration>) => void;
  validateTheme: () => void;
  exportTheme: () => Promise<ThemeExport>;
  importTheme: (manifestContent: string, cssContent: string) => void;
  resetTheme: () => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  clearHistory: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  // Initial state
  themeEngine: new ThemeEngine(),
  configuration: new ThemeEngine().getConfiguration(),
  validation: { isValid: true, errors: [] },
  isExporting: false,
  exportError: null,
  lastSaved: null,
  history: [],
  historyIndex: -1,
  maxHistorySize: 50,

  // Update configuration and save to history
  updateConfiguration: (updates: Partial<ThemeConfiguration>) => {
    const { themeEngine, saveToHistory } = get();
    
    // Update the theme engine
    themeEngine.updateConfiguration(updates);
    
    // Get the new configuration
    const newConfiguration = themeEngine.getConfiguration();
    
    // Update state
    set({ configuration: newConfiguration });
    
    // Save to history for undo/redo
    saveToHistory();
    
    // Validate the new configuration
    get().validateTheme();
  },

  // Validate current theme configuration
  validateTheme: () => {
    const { themeEngine } = get();
    const validation = themeEngine.validateConfiguration();
    set({ validation });
  },

  // Export theme files
  exportTheme: async (): Promise<ThemeExport> => {
    const { themeEngine } = get();
    
    set({ isExporting: true, exportError: null });
    
    try {
      const theme = themeEngine.exportTheme();
      set({ lastSaved: new Date() });
      return theme;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Export failed';
      set({ exportError: errorMessage });
      throw error;
    } finally {
      set({ isExporting: false });
    }
  },

  // Import theme from files
  importTheme: (manifestContent: string, cssContent: string) => {
    const { themeEngine, saveToHistory } = get();
    
    try {
      themeEngine.importTheme(manifestContent, cssContent);
      const newConfiguration = themeEngine.getConfiguration();
      
      set({ 
        configuration: newConfiguration,
        exportError: null 
      });
      
      saveToHistory();
      get().validateTheme();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Import failed';
      set({ exportError: errorMessage });
    }
  },

  // Reset theme to default
  resetTheme: () => {
    const { themeEngine, saveToHistory } = get();
    
    themeEngine.resetToDefault();
    const defaultConfiguration = themeEngine.getConfiguration();
    
    set({ configuration: defaultConfiguration });
    saveToHistory();
    get().validateTheme();
  },

  // Undo last change
  undo: () => {
    const { history, historyIndex } = get();
    
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousConfiguration = history[newIndex];
      
      const { themeEngine } = get();
      themeEngine.updateConfiguration(previousConfiguration);
      
      set({ 
        configuration: previousConfiguration,
        historyIndex: newIndex 
      });
      
      get().validateTheme();
    }
  },

  // Redo last undone change
  redo: () => {
    const { history, historyIndex } = get();
    
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextConfiguration = history[newIndex];
      
      const { themeEngine } = get();
      themeEngine.updateConfiguration(nextConfiguration);
      
      set({ 
        configuration: nextConfiguration,
        historyIndex: newIndex 
      });
      
      get().validateTheme();
    }
  },

  // Save current state to history
  saveToHistory: () => {
    const { configuration, history, historyIndex, maxHistorySize } = get();
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    
    // Add current configuration
    newHistory.push({ ...configuration });
    
    // Limit history size
    if (newHistory.length > maxHistorySize) {
      newHistory.shift();
    }
    
    set({ 
      history: newHistory,
      historyIndex: newHistory.length - 1 
    });
  },

  // Clear history
  clearHistory: () => {
    const { configuration } = get();
    set({ 
      history: [configuration],
      historyIndex: 0 
    });
  }
}));

// Initialize the store
const store = useThemeStore.getState();
store.saveToHistory();
store.validateTheme();