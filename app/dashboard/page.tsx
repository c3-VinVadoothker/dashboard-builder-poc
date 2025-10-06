"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardGrid } from "@/components/dashboard/grid";
import { ChatPanel } from "@/components/dashboard/chat-panel";
import { PresentationMode } from "@/components/presentation/presentation-mode";
import { DashboardProvider } from "@/contexts/dashboard-context";
import { propertyAppraisalData } from "@/data/property-appraisal-data";
import { retailAnalyticsData } from "@/data/retail-analytics-data";
import { healthcareMetricsData } from "@/data/healthcare-metrics-data";
import { financialRiskData } from "@/data/financial-risk-data";
import { c3AiReliabilityData } from "@/data/c3-ai-reliability-data";

function DashboardContent({ 
  isEditMode, 
  setIsEditMode, 
  isChatOpen, 
  setIsChatOpen, 
  selectedTileId, 
  setSelectedTileId,
  onBackToDemos,
  isPresentationMode,
  setIsPresentationMode
}: {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
  selectedTileId: string | null;
  setSelectedTileId: (value: string | null) => void;
  onBackToDemos: () => void;
  isPresentationMode: boolean;
  setIsPresentationMode: (value: boolean) => void;
}) {
  // Close chat panel when switching to view mode
  useEffect(() => {
    if (!isEditMode) {
      setIsChatOpen(false);
      setSelectedTileId(null);
    }
  }, [isEditMode]);

  // Show presentation mode if active
  if (isPresentationMode) {
    return (
      <PresentationMode 
        onExit={() => setIsPresentationMode(false)}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Static Sidebar */}
      <Sidebar 
        onBackToMenu={onBackToDemos}
        onPresentationMode={() => setIsPresentationMode(true)}
      />
      
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
  );
}

function DashboardPageContent() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [demoData, setDemoData] = useState<any>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const demoId = searchParams.get('demo');

  // Load demo data based on the demo parameter
  useEffect(() => {
    if (!demoId) {
      router.push('/demos');
      return;
    }

    switch (demoId) {
      case 'property-appraisal':
        setDemoData(propertyAppraisalData);
        break;
      case 'retail-analytics':
        setDemoData(retailAnalyticsData);
        break;
      case 'healthcare-metrics':
        setDemoData(healthcareMetricsData);
        break;
      case 'financial-risk':
        setDemoData(financialRiskData);
        break;
      case 'c3-ai-reliability':
        setDemoData(c3AiReliabilityData);
        break;
      default:
        router.push('/demos');
        return;
    }
  }, [demoId, router]);

  const handleBackToDemos = () => {
    router.push('/demos');
  };

  // Show loading or redirect if no demo data
  if (!demoData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading demo...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardProvider demoData={demoData}>
      <DashboardContent 
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        selectedTileId={selectedTileId}
        setSelectedTileId={setSelectedTileId}
        onBackToDemos={handleBackToDemos}
        isPresentationMode={isPresentationMode}
        setIsPresentationMode={setIsPresentationMode}
      />
    </DashboardProvider>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardPageContent />
    </Suspense>
  );
}
