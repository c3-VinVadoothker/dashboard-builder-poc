"use client";

import { useState } from "react";
import { Plus, GripVertical, Trash2, RefreshCw, Info, GripHorizontal } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard-context";
import { DashboardTile } from "./tile";

interface DashboardGridProps {
  isEditMode: boolean;
  onTileSelect: (tileId: string) => void;
}

export function DashboardGrid({ isEditMode, onTileSelect }: DashboardGridProps) {
  const { state, dispatch, saveStateBeforeChange } = useDashboard();
  const [draggedTile, setDraggedTile] = useState<string | null>(null);
  const [dragOverTile, setDragOverTile] = useState<string | null>(null);
  const [draggedRow, setDraggedRow] = useState<number | null>(null);
  const [dragOverRow, setDragOverRow] = useState<number | null>(null);
  const [clickedTile, setClickedTile] = useState<string | null>(null);

  // Don't render until tiles are loaded
  if (!state.tiles) {
    return (
      <div className="p-6 space-y-6 pb-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Group tiles by row
  const tilesByRow = (state.tiles || []).reduce((acc, tile) => {
    if (!acc[tile.rowIndex]) {
      acc[tile.rowIndex] = [];
    }
    acc[tile.rowIndex].push(tile);
    return acc;
  }, {} as Record<number, typeof state.tiles>);

  // Sort tiles within each row by column index
  Object.keys(tilesByRow).forEach(rowIndex => {
    tilesByRow[parseInt(rowIndex)].sort((a, b) => a.columnIndex - b.columnIndex);
  });

  const handleTileClick = (tileId: string) => {
    setClickedTile(tileId);
    onTileSelect(tileId);
    
    // Clear clicked state after a short delay
    setTimeout(() => {
      setClickedTile(null);
    }, 300);
  };

  const handleTileDragStart = (e: React.DragEvent, tileId: string) => {
    if (!isEditMode) return;
    setDraggedTile(tileId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleTileDragOver = (e: React.DragEvent, tileId: string) => {
    if (!isEditMode) return;
    e.preventDefault();
    setDragOverTile(tileId);
  };

  const handleTileDragEnd = () => {
    setDraggedTile(null);
    setDragOverTile(null);
  };

  const handleTileDrop = (e: React.DragEvent, targetTileId: string) => {
    if (!isEditMode || !draggedTile) return;
    e.preventDefault();
    
    const draggedTileData = state.tiles.find(t => t.tileId === draggedTile);
    const targetTileData = state.tiles.find(t => t.tileId === targetTileId);
    
    if (draggedTileData && targetTileData) {
      // Only allow moving to empty tiles
      if (!targetTileData.isPopulated) {
        // Move the visualization data to the target tile
        saveStateBeforeChange({
          type: 'POPULATE_TILE',
          payload: {
            tileId: targetTileId,
            data: {
              tileTitle: draggedTileData.tileTitle,
              chatSummary: draggedTileData.chatSummary,
              visualizationFunction: draggedTileData.visualizationFunction
            }
          }
        });
        
        // Clear the original tile
        saveStateBeforeChange({ type: 'CLEAR_TILE', payload: draggedTile });
      } else {
        // If moving within the same row, reorder tiles
        if (draggedTileData.rowIndex === targetTileData.rowIndex) {
          const rowTiles = tilesByRow[draggedTileData.rowIndex];
          const draggedIndex = rowTiles.findIndex(t => t.tileId === draggedTile);
          const targetIndex = rowTiles.findIndex(t => t.tileId === targetTileId);
          
          if (draggedIndex !== -1 && targetIndex !== -1) {
            const newOrder = [...rowTiles.map(t => t.tileId)];
            const [movedTileId] = newOrder.splice(draggedIndex, 1);
            newOrder.splice(targetIndex, 0, movedTileId);
            
            saveStateBeforeChange({
              type: 'REORDER_TILES_IN_ROW',
              payload: {
                rowIndex: draggedTileData.rowIndex,
                tileOrder: newOrder
              }
            });
          }
        }
      }
    }
    
    setDraggedTile(null);
    setDragOverTile(null);
  };

  const handleRowDragStart = (e: React.DragEvent, rowIndex: number) => {
    if (!isEditMode) return;
    setDraggedRow(rowIndex);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', rowIndex.toString());
  };

  const handleRowDragOver = (e: React.DragEvent, rowIndex: number) => {
    if (!isEditMode || draggedRow === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // More responsive: update drag over state immediately
    if (dragOverRow !== rowIndex) {
      setDragOverRow(rowIndex);
    }
  };

  const handleRowDragEnd = () => {
    // Add a small delay to prevent flickering
    setTimeout(() => {
      setDraggedRow(null);
      setDragOverRow(null);
    }, 50);
  };

  const handleRowDrop = (e: React.DragEvent, targetRowIndex: number) => {
    if (!isEditMode || draggedRow === null) return;
    e.preventDefault();
    
    // More responsive: allow dropping even if draggedRow is slightly off
    const sourceRow = draggedRow;
    const targetRow = targetRowIndex;
    
    if (sourceRow !== targetRow) {
      saveStateBeforeChange({
        type: 'REORDER_ROW',
        payload: {
          oldRow: sourceRow,
          newRow: targetRow
        }
      });
    }
    
    // Clear states immediately
    setDraggedRow(null);
    setDragOverRow(null);
  };

  return (
    <div className="p-6 space-y-6 pb-6">

      {Object.keys(tilesByRow).map(rowIndex => {
        const rowTiles = tilesByRow[parseInt(rowIndex)];
        const rowKey = `row-${rowIndex}`;
        const isRowDragging = draggedRow === parseInt(rowIndex);
        const isRowDragOver = dragOverRow === parseInt(rowIndex);
        
        return (
          <div
            key={rowKey}
            className={`relative group transition-all duration-200 ${
              isRowDragging ? 'opacity-50 scale-95' : ''
            } ${isRowDragOver ? 'bg-gray-50 p-2 border-2 border-gray-400 shadow-lg' : ''}`}
            onDragOver={(e) => handleRowDragOver(e, parseInt(rowIndex))}
            onDrop={(e) => handleRowDrop(e, parseInt(rowIndex))}
          >
            {/* Enhanced Row Drop Zone Indicator */}
            {isEditMode && draggedRow !== null && draggedRow !== parseInt(rowIndex) && (
              <div
                className={`absolute inset-0 border-2 border-dashed border-gray-500 bg-gray-100 bg-opacity-30 pointer-events-none z-5 transition-all duration-150 ${
                  isRowDragOver ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            )}
            
            {/* Row Drag Handle - Plain icon in the middle of the row */}
            {isEditMode && (
              <div
                className="absolute left-1/1055 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10 p-2 hover:bg-gray-100 rounded-full"
                draggable
                onDragStart={(e) => handleRowDragStart(e, parseInt(rowIndex))}
                onDragEnd={handleRowDragEnd}
                title="Drag to move entire row"
              >
                <GripVertical size={16} className="text-gray-500" />
              </div>
            )}
            
            <div
              className={`grid gap-4 transition-all ${
                isRowDragging ? 'opacity-50' : ''
              }`}
              style={{
                gridTemplateColumns: `repeat(${rowTiles.length}, 1fr)`
              }}
            >
              {rowTiles.map((tile) => (
                <div
                  key={tile.tileId}
                  className={`relative overflow-hidden ${
                    tile.sizeType === 'small' ? 'h-40' :
                    tile.sizeType === 'medium' ? 'h-64' :
                    'h-80'
                  }`}
                  draggable={isEditMode && tile.isPopulated}
                  onDragStart={(e) => handleTileDragStart(e, tile.tileId)}
                  onDragOver={(e) => handleTileDragOver(e, tile.tileId)}
                  onDragEnd={handleTileDragEnd}
                  onDrop={(e) => handleTileDrop(e, tile.tileId)}
                >
                  <DashboardTile
                    tile={tile}
                    isEditMode={isEditMode}
                    isDragging={draggedTile === tile.tileId}
                    isDragOver={dragOverTile === tile.tileId}
                    isClicked={clickedTile === tile.tileId}
                    onSelect={() => handleTileClick(tile.tileId)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
