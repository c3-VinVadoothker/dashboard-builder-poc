"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardGrid } from "@/components/dashboard/grid";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { DashboardProvider } from "@/contexts/dashboard-context";

export default function DashboardBuilder() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);

  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Static Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isChatOpen ? 'mr-80' : 'mr-0'
        }`}>
          {/* Header */}
          <DashboardHeader 
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
          />
          
          {/* Dashboard Grid */}
          <div className="flex-1 relative overflow-y-auto">
            <DashboardGrid 
              isEditMode={isEditMode}
              onTileSelect={(tileId) => {
                if (isEditMode) {
                  setSelectedTileId(tileId);
                  setIsChatOpen(true);
                }
              }}
            />
          </div>
        </div>

        {/* Chat Panel - Fixed to right side */}
        {isChatOpen && selectedTileId && (
          <ChatPanel 
            tileId={selectedTileId}
            isEditMode={isEditMode}
            onClose={() => {
              setIsChatOpen(false);
              setSelectedTileId(null);
            }}
          />
        )}
      </div>
    </DashboardProvider>
  );
}
