"use client";

import { useState } from "react";
import { RotateCcw, Redo, Edit3, Eye } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard-context";

interface DashboardHeaderProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export function DashboardHeader({ isEditMode, onToggleEditMode }: DashboardHeaderProps) {
  const { state, dispatch, saveStateBeforeChange } = useDashboard();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(state.dashboard.dashboardName);

  const handleStartEditing = () => {
    // Only allow editing when in edit mode
    if (!isEditMode) return;
    
    // Use suggested name if current name is "Custom Dashboard"
    const initialValue = state.dashboard.dashboardName === 'Custom Dashboard' 
      ? state.dashboard.suggestedName || 'Annual Assessment Uniformity Audit'
      : state.dashboard.dashboardName;
    setTempTitle(initialValue);
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      saveStateBeforeChange({ type: 'UPDATE_DASHBOARD_NAME', payload: tempTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  const formatLastSaved = () => {
    if (!state.lastSaved) return 'Never';
    const now = new Date();
    const diff = now.getTime() - state.lastSaved.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} min ago`;
  };

  return (
    <div className="bg-white border-b border-gray-300 p-3">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center space-x-4">
          {isEditingTitle ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
              className="text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-600"
              autoFocus
            />
          ) : (
            <div 
              className={`flex items-center space-x-2 group ${
                isEditMode ? 'cursor-pointer' : 'cursor-default'
              }`}
              onClick={handleStartEditing}
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {state.dashboard.dashboardName}
              </h2>
              {isEditMode && (
                <Edit3 size={16} className="text-gray-400 group-hover:text-gray-600" />
              )}
            </div>
          )}
        </div>

        {/* Center - Status */}
        <div className="flex items-center justify-center space-x-4 flex-1">
          {isEditMode && (
            <>
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300">
                <span className="text-sm font-medium">Editing</span>
              </div>
              <div className="text-sm text-gray-600">
                Auto-saved: {formatLastSaved()}
              </div>
              {state.hasUnsavedChanges && (
                <div className="text-sm text-red-600">
                  • Unsaved changes
                </div>
              )}
            </>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {isEditMode && (
            <>
              <button
                onClick={handleUndo}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={state.historyIndex <= 0}
                title="Undo last action"
              >
                <RotateCcw size={16} />
                <span className="text-sm">Undo</span>
              </button>
              <button
                onClick={handleRedo}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={state.historyIndex >= state.history.length - 1 || state.history.length === 0}
                title="Redo last undone action"
              >
                <Redo size={16} />
                <span className="text-sm">Redo</span>
              </button>
            </>
          )}
          
          <button
            onClick={onToggleEditMode}
            className={`flex items-center space-x-2 px-4 py-2 border transition-colors ${
              isEditMode
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                : 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900'
            }`}
          >
            {isEditMode ? (
              <>
                <Eye size={16} />
                <span className="text-sm font-medium">View</span>
              </>
            ) : (
              <>
                <Edit3 size={16} />
                <span className="text-sm font-medium">Edit</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
