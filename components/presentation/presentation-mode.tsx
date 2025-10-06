"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/contexts/dashboard-context";
import Image from "next/image";

interface PresentationModeProps {
  onExit: () => void;
}

export function PresentationMode({ onExit }: PresentationModeProps) {
  const { state, demoData } = useDashboard();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        handleExit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleExit = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onExit();
    }, 300);
  };

  const handleClick = () => {
    handleExit();
  };

  // Get demo scenario title
  const getDemoTitle = () => {
    if (!demoData || !demoData.dashboard) return 'Dashboard';
    
    // Map dashboard IDs to scenario titles
    const scenarioTitles: Record<string, string> = {
      'dashboard-1': 'Property Appraisal',
      'dashboard-2': 'Retail Analytics', 
      'dashboard-3': 'Healthcare Metrics',
      'dashboard-4': 'Financial Risk',
      'dashboard-5': 'C3 AI Reliability'
    };
    
    return scenarioTitles[demoData.dashboard.dashboardId] || 'Dashboard';
  };

  return (
    <div 
      className={`fixed inset-0 bg-black cursor-pointer transition-all duration-500 ease-in-out ${
        isEntering
          ? 'opacity-0'
          : isTransitioning 
            ? 'opacity-0 scale-105' 
            : 'opacity-100 scale-100'
      }`}
      onClick={handleClick}
    >
      {/* Main content - centered */}
      <div className="h-full flex flex-col items-center justify-center text-white">
        {/* C3 AI Logo */}
        <div className="flex justify-center mb-8">
          <Image 
            src="/C3 AI Logo.jpeg" 
            alt="C3 AI Logo" 
            width={128}
            height={128}
            className="w-32 h-32 object-contain"
          />
        </div>
        
        {/* Demo Scenario Title */}
        <div className="text-center">
          <h1 className="text-5xl font-normal tracking-tight mb-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            {getDemoTitle()}
          </h1>
          <p className="text-xl font-normal tracking-tight opacity-80" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            Custom Dashboard Demo
          </p>
        </div>
      </div>

      {/* Exit transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="text-white text-center">
          </div>
        </div>
      )}
    </div>
  );
}