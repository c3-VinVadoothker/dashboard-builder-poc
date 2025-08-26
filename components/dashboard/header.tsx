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

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      saveStateBeforeChange({ type: 'UPDATE_DASHBOARD_NAME', payload: tempTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleUndo = () => {
    console.log('Undo clicked - Current history index:', state.historyIndex, 'History length:', state.history.length);
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
    <div className="bg-white border-b border-gray-200 p-4">
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
              className="text-lg font-medium text-gray-900 bg-transparent border-b border-blue-500 focus:outline-none focus:border-blue-600"
              autoFocus
            />
          ) : (
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => isEditMode && setIsEditingTitle(true)}
            >
              <h2 className="text-lg font-medium text-gray-900">
                {state.dashboard.dashboardName}
              </h2>
              {isEditMode && (
                <Edit3 size={16} className="text-gray-400 group-hover:text-gray-600" />
              )}
            </div>
          )}
        </div>

        {/* Center - Status */}
        <div className="flex items-center space-x-4">
          {isEditMode && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-md">
              <span className="text-sm font-medium">Editing</span>
            </div>
          )}
          <div className="text-sm text-gray-500">
            Auto-saved: {formatLastSaved()}
          </div>
          {state.hasUnsavedChanges && (
            <div className="text-sm text-orange-600">
              • Unsaved changes
            </div>
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
                disabled={(() => {
                  const isDisabled = state.historyIndex >= state.history.length - 1;
                  console.log('Redo button disabled check:', isDisabled, 'historyIndex:', state.historyIndex, 'history.length:', state.history.length, 'condition:', state.historyIndex, '>=', state.history.length - 1);
                  return isDisabled;
                })()}
                title="Redo last undone action"
              >
                <Redo size={16} />
                <span className="text-sm">Redo</span>
              </button>
            </>
          )}
          
          <button
            onClick={onToggleEditMode}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              isEditMode
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
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
