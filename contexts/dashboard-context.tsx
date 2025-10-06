"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Tile {
  tileId: string;
  dashboardId: string;
  rowIndex: number;
  columnIndex: number;
  sizeType: 'small' | 'medium' | 'large';
  tileTitle: string | null;
  visualizationFunction: any | null;
  chatSummary: string | null;
  cacheId: string | null;
  isPopulated: boolean;
  isLoading?: boolean;
  error?: string | null;
}

export interface Dashboard {
  dashboardId: string;
  ownerId: string;
  dashboardName: string;
  suggestedName?: string;
  layout: string[][];
}

export // Type for state without history (to avoid circular references)
type CleanState = Omit<DashboardState, 'history' | 'historyIndex'>;

interface DashboardState {
  dashboard: Dashboard;
  tiles: Tile[];
  isEditMode: boolean;
  selectedTileId: string | null;
  history: CleanState[];
  historyIndex: number;
  isProcessing: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
}

// Import demo data
import { demoData, scenarios } from '@/data/demo-data';

// Initial state with 4,2,1 layout from demo data
const initialDashboard: Dashboard = demoData.dashboard;
const initialTiles: Tile[] = demoData.defaultTiles;

const initialState: DashboardState = {
  dashboard: initialDashboard,
  tiles: initialTiles,
  isEditMode: false,
  selectedTileId: null,
  history: [{
    dashboard: initialDashboard,
    tiles: initialTiles,
    isEditMode: false,
    selectedTileId: null,
    isProcessing: false,
    lastSaved: null,
    hasUnsavedChanges: false,
  }],
  historyIndex: 0,
  isProcessing: false,
  lastSaved: null,
  hasUnsavedChanges: false,
};

// Action types
type DashboardAction =
  | { type: 'SET_EDIT_MODE'; payload: boolean }
  | { type: 'SELECT_TILE'; payload: string | null }
  | { type: 'UPDATE_DASHBOARD_NAME'; payload: string }
  | { type: 'POPULATE_TILE'; payload: { tileId: string; data: Partial<Tile> } }
  | { type: 'CLEAR_TILE'; payload: string }
  | { type: 'MOVE_TILE'; payload: { tileId: string; newRow: number; newColumn: number } }
  | { type: 'REORDER_TILES_IN_ROW'; payload: { rowIndex: number; tileOrder: string[] } }
  | { type: 'REORDER_ROW'; payload: { oldRow: number; newRow: number } }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_TILE_LOADING'; payload: { tileId: string; isLoading: boolean } }
  | { type: 'SET_TILE_ERROR'; payload: { tileId: string; error: string | null } }
  | { type: 'SAVE_STATE' }
  | { type: 'LOAD_DASHBOARD'; payload: { dashboard: Dashboard; tiles: Tile[] } }
  | { type: 'SET_LAST_SAVED'; payload: Date }
  | { type: 'SET_UNSAVED_CHANGES'; payload: boolean };

// Reducer
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_EDIT_MODE':
      return { ...state, isEditMode: action.payload };
    
    case 'SELECT_TILE':
      return { ...state, selectedTileId: action.payload };
    
    case 'UPDATE_DASHBOARD_NAME':
      return {
        ...state,
        dashboard: { ...state.dashboard, dashboardName: action.payload },
        hasUnsavedChanges: true
      };
    
    case 'POPULATE_TILE':
      return {
        ...state,
        tiles: state.tiles.map(tile =>
          tile.tileId === action.payload.tileId
            ? { ...tile, ...action.payload.data, isPopulated: true, isLoading: false, error: null }
            : tile
        ),
        hasUnsavedChanges: true
      };
    
    case 'CLEAR_TILE':
      return {
        ...state,
        tiles: state.tiles.map(tile =>
          tile.tileId === action.payload
            ? {
                ...tile,
                tileTitle: null,
                visualizationFunction: null,
                chatSummary: null,
                cacheId: null,
                isPopulated: false,
                isLoading: false,
                error: null
              }
            : tile
        ),
        hasUnsavedChanges: true
      };
    
    case 'MOVE_TILE':
      const { tileId, newRow, newColumn } = action.payload;
      const movedTile = state.tiles.find(t => t.tileId === tileId);
      
      if (!movedTile) return state;
      
      // Find the target tile to swap with
      const targetTile = state.tiles.find(t => t.rowIndex === newRow && t.columnIndex === newColumn);
      
      if (targetTile && targetTile.isPopulated) {
        // Don't allow moving to occupied tiles
        return state;
      }
      
      // Update the moved tile's position
      const updatedTiles = state.tiles.map(tile => {
        if (tile.tileId === tileId) {
          return { ...tile, rowIndex: newRow, columnIndex: newColumn };
        }
        return tile;
      });
      
      return {
        ...state,
        tiles: updatedTiles,
        hasUnsavedChanges: true
      };
    
    case 'REORDER_TILES_IN_ROW':
      const { rowIndex, tileOrder } = action.payload;
      const tilesInRow = state.tiles.filter(t => t.rowIndex === rowIndex);
      
      if (tilesInRow.length !== tileOrder.length) return state;
      
      const reorderedTiles = state.tiles.map(tile => {
        if (tile.rowIndex === rowIndex) {
          const newColumnIndex = tileOrder.indexOf(tile.tileId);
          if (newColumnIndex !== -1) {
            return { ...tile, columnIndex: newColumnIndex };
          }
        }
        return tile;
      });
      
      return {
        ...state,
        tiles: reorderedTiles,
        hasUnsavedChanges: true
      };
    
    case 'REORDER_ROW':
      const { oldRow: sourceRow, newRow: targetRow } = action.payload;
      
      // Update the layout array
      const newLayout = [...state.dashboard.layout];
      const [movedRowLayout] = newLayout.splice(sourceRow, 1);
      newLayout.splice(targetRow, 0, movedRowLayout);
      
      // Update tile row indices
      const updatedTilesAfterRowMove = state.tiles.map(tile => {
        if (tile.rowIndex === sourceRow) {
          return { ...tile, rowIndex: targetRow };
        } else if (tile.rowIndex >= targetRow && tile.rowIndex < sourceRow) {
          return { ...tile, rowIndex: tile.rowIndex + 1 };
        } else if (tile.rowIndex <= targetRow && tile.rowIndex > sourceRow) {
          return { ...tile, rowIndex: tile.rowIndex - 1 };
        }
        return tile;
      });
      
      return {
        ...state,
        dashboard: { ...state.dashboard, layout: newLayout },
        tiles: updatedTilesAfterRowMove,
        hasUnsavedChanges: true
      };
    
    case 'UNDO':
      if (state.historyIndex > 0) {
        const newHistoryIndex = state.historyIndex - 1;
        const restoredState = { 
          ...state.history[newHistoryIndex], 
          history: state.history,  // Preserve the history array
          historyIndex: newHistoryIndex 
        };
        return restoredState;
      }
      return state;
    
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        const newHistoryIndex = state.historyIndex + 1;
        const restoredState = { 
          ...state.history[newHistoryIndex], 
          history: state.history,  // Preserve the history array
          historyIndex: newHistoryIndex 
        };
        return restoredState;
      }
      return state;
    
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    
    case 'SET_TILE_LOADING':
      return {
        ...state,
        tiles: state.tiles.map(tile =>
          tile.tileId === action.payload.tileId
            ? { ...tile, isLoading: action.payload.isLoading }
            : tile
        )
      };
    
    case 'SET_TILE_ERROR':
      return {
        ...state,
        tiles: state.tiles.map(tile =>
          tile.tileId === action.payload.tileId
            ? { ...tile, error: action.payload.error, isLoading: false }
            : tile
        )
      };
    
    case 'SAVE_STATE':
      // Create a clean state object without history arrays to avoid circular references
      const cleanState: Omit<DashboardState, 'history' | 'historyIndex'> = {
        dashboard: state.dashboard,
        tiles: state.tiles,
        isEditMode: state.isEditMode,
        selectedTileId: state.selectedTileId,
        isProcessing: state.isProcessing,
        lastSaved: state.lastSaved,
        hasUnsavedChanges: state.hasUnsavedChanges
      };
      
      // If this is the first save, initialize history properly
      if (state.history.length === 0) {
        return {
          ...state,
          history: [cleanState],
          historyIndex: 0
        };
      }
      
      // If we're in the middle of history (after undo), truncate future states
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), cleanState];
      return {
        ...state,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    
    case 'LOAD_DASHBOARD':
      return {
        ...state,
        dashboard: action.payload.dashboard,
        tiles: action.payload.tiles
      };
    
    case 'SET_LAST_SAVED':
      return { ...state, lastSaved: action.payload };
    
    case 'SET_UNSAVED_CHANGES':
      return { ...state, hasUnsavedChanges: action.payload };
    
    default:
      return state;
  }
}

// Context
const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  saveStateBeforeChange: (action: DashboardAction) => void;
  saveStateAfterChange: (action: DashboardAction) => void;
  demoData: any;
} | undefined>(undefined);

// Provider
export function DashboardProvider({ children, demoData }: { children: React.ReactNode; demoData?: any }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Helper function to save state before making changes
  const saveStateBeforeChange = (action: DashboardAction) => {
    // Save current state before making changes
    dispatch({ type: 'SAVE_STATE' });
    // Then dispatch the actual action
    dispatch(action);
  };

  // Helper function to save state after making changes
  const saveStateAfterChange = (action: DashboardAction) => {
    // First dispatch the action
    dispatch(action);
    // Then save the updated state
    setTimeout(() => dispatch({ type: 'SAVE_STATE' }), 0);
  };

  // Load demo data when demoData changes
  useEffect(() => {
    if (demoData) {
      dispatch({ 
        type: 'LOAD_DASHBOARD', 
        payload: { 
          dashboard: demoData.dashboard, 
          tiles: demoData.defaultTiles 
        } 
      });
    } else {
      // Default to property appraisal data
      dispatch({ 
        type: 'LOAD_DASHBOARD', 
        payload: { 
          dashboard: demoData.dashboard, 
          tiles: demoData.defaultTiles 
        } 
      });
    }
  }, [demoData]);

  // Save state to API when it changes
  useEffect(() => {
    const saveDashboard = async () => {
      try {
        const { history, historyIndex, lastSaved, hasUnsavedChanges, ...stateToSave } = state;
        
        await fetch('/api/dashboard', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stateToSave)
        });
        
        dispatch({ type: 'SET_LAST_SAVED', payload: new Date() });
        dispatch({ type: 'SET_UNSAVED_CHANGES', payload: false });
      } catch (error) {
        console.error('Failed to save dashboard:', error);
      }
    };

    // Debounce the save to avoid too many API calls
    const timeoutId = setTimeout(saveDashboard, 1000);
    return () => clearTimeout(timeoutId);
  }, [state.dashboard, state.tiles]);

  return (
    <DashboardContext.Provider value={{ state, dispatch, saveStateBeforeChange, saveStateAfterChange, demoData: demoData || demoData }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
