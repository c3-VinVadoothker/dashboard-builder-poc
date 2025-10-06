"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { scenarios } from '@/data/demo-data';

interface ScenarioContextType {
  currentScenario: string | null;
  setCurrentScenario: (scenarioId: string | null) => void;
  getCurrentScenarioData: () => any;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);

  const getCurrentScenarioData = () => {
    if (!currentScenario) return null;
    return scenarios[currentScenario as keyof typeof scenarios];
  };

  return (
    <ScenarioContext.Provider value={{
      currentScenario,
      setCurrentScenario,
      getCurrentScenarioData
    }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const context = useContext(ScenarioContext);
  if (context === undefined) {
    throw new Error('useScenario must be used within a ScenarioProvider');
  }
  return context;
}
