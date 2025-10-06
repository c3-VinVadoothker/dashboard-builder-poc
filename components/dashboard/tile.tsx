"use client";

import { useState } from "react";
import { Plus, GripVertical, Trash2, RefreshCw, Info, BarChart3, Table, AlertCircle, Loader2 } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard-context";
import { Tile } from "@/contexts/dashboard-context";
import { ChartFactory } from "../charts/chart-factory";

interface DashboardTileProps {
  tile: Tile;
  isEditMode: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  isClicked?: boolean;
  onSelect: () => void;
}

export function DashboardTile({ 
  tile, 
  isEditMode, 
  isDragging, 
  isDragOver, 
  isClicked = false,
  onSelect 
}: DashboardTileProps) {
  const { state, dispatch, saveStateBeforeChange } = useDashboard();
  const [viewMode, setViewMode] = useState<'chart' | 'grid'>('chart');

  const handleClearTile = () => {
    saveStateBeforeChange({ type: 'CLEAR_TILE', payload: tile.tileId });
  };

  const handleRefresh = () => {
    // Handle tile refresh logic
    console.log(`Refreshing tile ${tile.tileId}`);
  };

  const handleViewToggle = () => {
    setViewMode(viewMode === 'chart' ? 'grid' : 'chart');
  };

  const handleShowInfo = () => {
    // Handle showing tile info/summary
    console.log(`Showing info for tile ${tile.tileId}`);
  };

  // Empty tile state
  if (!tile.isPopulated) {
    return (
      <div
        className={`relative border p-4 flex flex-col items-center justify-center transition-all ${
          isEditMode 
            ? 'bg-white border-2 border-dashed border-gray-400 cursor-pointer hover:border-gray-600 hover:bg-gray-50' 
            : 'bg-gray-100 border border-gray-300'
        } ${
          isDragOver ? 'border-gray-600 bg-gray-100' : ''
        } ${
          state.selectedTileId === tile.tileId ? 'border-2 border-solid border-gray-600 bg-gray-50' : ''
        } ${isClicked ? 'ring-2 ring-gray-500 ring-opacity-75 scale-105' : ''}`}
        onClick={isEditMode ? onSelect : undefined}
        style={{
          height: tile.sizeType === 'small' ? '160px' :
                 tile.sizeType === 'medium' ? '256px' :
                 '320px'
        }}
      >
        {isEditMode ? (
          <>
            <Plus size={24} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 text-center">
              Create New Visualization
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-500 text-center">
            Click edit to add
          </span>
        )}
      </div>
    );
  }

  // Loading state
  if (tile.isLoading) {
    return (
      <div className={`relative border border-gray-300 overflow-hidden ${
        isEditMode ? 'bg-white' : 'bg-gray-100'
      } ${
        state.selectedTileId === tile.tileId ? 'border-2 border-solid border-gray-600 bg-gray-50' : ''
      }`}>
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {tile.tileTitle || 'Loading...'}
            </h3>
          </div>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="text-center">
            <Loader2 size={32} className="text-blue-600 animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Creating visualization...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (tile.error) {
    return (
      <div className={`relative border border-red-300 overflow-hidden ${
        isEditMode ? 'bg-white' : 'bg-gray-100'
      } ${
        state.selectedTileId === tile.tileId ? 'border-2 border-solid border-gray-600 bg-gray-50' : ''
      }`}>
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {tile.tileTitle || 'Error'}
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={handleRefresh}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Retry"
            >
              <RefreshCw size={16} />
            </button>
            {isEditMode && (
              <button
                onClick={handleClearTile}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Clear tile"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle size={32} className="text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600 mb-2">Failed to create visualization</p>
            <p className="text-xs text-gray-500">{tile.error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Populated tile state
  return (
    <div className="relative group">
      {/* Action Icons - Above the tile on the right */}
      <div className="absolute top-1 right-2 z-10 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* View Toggle */}
        <button
          onClick={handleViewToggle}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors bg-white border border-gray-300"
          title={`Switch to ${viewMode === 'chart' ? 'grid' : 'chart'} view`}
        >
          {viewMode === 'chart' ? <Table size={14} /> : <BarChart3 size={14} />}
        </button>
        
        {/* Info Button */}
        {tile.chatSummary && (
          <button
            onClick={handleShowInfo}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors bg-white border border-gray-300"
            title="Show visualization info"
          >
            <Info size={14} />
          </button>
        )}
        
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors bg-white border border-gray-300"
          title="Refresh data"
        >
          <RefreshCw size={14} />
        </button>
        
        {/* Delete Button */}
        {isEditMode && (
          <button
            onClick={handleClearTile}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors bg-white rounded border border-gray-200 shadow-sm"
            title="Clear tile"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Tile Drag Handle - Above the tile on the left */}
      {isEditMode && tile.isPopulated && (
        <div className="absolute top-1 left-2 z-10">
          <div className="w-6 h-6 bg-gray-100 border border-gray-400 flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200">
            <GripVertical size={12} className="text-gray-500" />
          </div>
        </div>
      )}

      {/* The actual tile */}
      <div
        className={`border border-gray-300 overflow-hidden transition-all ${
          isEditMode ? 'bg-white' : 'bg-gray-100'
        } ${
          isDragging ? 'opacity-50 scale-95 shadow-lg' : ''
        } ${isDragOver ? 'border-gray-600 bg-gray-100' : ''} ${
          state.selectedTileId === tile.tileId ? 'border-2 border-solid border-gray-600 bg-gray-50' : ''
        } ${isClicked ? 'ring-2 ring-gray-500 ring-opacity-75 scale-105' : ''}`}
      >
        {/* Compact Tile Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {tile.tileTitle || 'Untitled Visualization'}
            </h3>
          </div>
        </div>

        {/* Tile Content - Larger visualization area */}
        <div 
          className="flex-1 cursor-pointer overflow-hidden"
          onClick={onSelect}
          style={{
            height: tile.sizeType === 'small' ? '120px' :
                   tile.sizeType === 'medium' ? '216px' :
                   '272px'
          }}
        >
          {viewMode === 'chart' ? (
            tile.visualizationFunction ? (
              <div className="w-full h-full overflow-hidden">
                <ChartFactory
                  type={tile.visualizationFunction.type}
                  data={tile.visualizationFunction.data}
                  metadata={tile.visualizationFunction.metadata}
                  sizeType={tile.sizeType}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    {tile.tileTitle || 'Chart Visualization'}
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Table size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Data Grid View
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
