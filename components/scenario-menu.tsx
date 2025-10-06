"use client";

import { scenarios } from "@/data/demo-data";

interface ScenarioMenuProps {
  onSelectScenario: (scenarioId: string) => void;
}

export function ScenarioMenu({ onSelectScenario }: ScenarioMenuProps) {
  const scenarioList = Object.values(scenarios);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50 hover:bg-blue-100',
          border: 'border-blue-200 hover:border-blue-300',
          icon: 'bg-blue-100 text-blue-600',
          title: 'text-blue-900',
          subtitle: 'text-blue-700'
        };
      case 'green':
        return {
          bg: 'bg-green-50 hover:bg-green-100',
          border: 'border-green-200 hover:border-green-300',
          icon: 'bg-green-100 text-green-600',
          title: 'text-green-900',
          subtitle: 'text-green-700'
        };
      case 'red':
        return {
          bg: 'bg-red-50 hover:bg-red-100',
          border: 'border-red-200 hover:border-red-300',
          icon: 'bg-red-100 text-red-600',
          title: 'text-red-900',
          subtitle: 'text-red-700'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50 hover:bg-purple-100',
          border: 'border-purple-200 hover:border-purple-300',
          icon: 'bg-purple-100 text-purple-600',
          title: 'text-purple-900',
          subtitle: 'text-purple-700'
        };
      default:
        return {
          bg: 'bg-gray-50 hover:bg-gray-100',
          border: 'border-gray-200 hover:border-gray-300',
          icon: 'bg-gray-100 text-gray-600',
          title: 'text-gray-900',
          subtitle: 'text-gray-700'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard Builder Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose a scenario to explore different use cases and see how the dashboard builder adapts to various industries and data types.
          </p>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarioList.map((scenario) => {
            const colors = getColorClasses(scenario.color);
            
            return (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.id)}
                className={`${colors.bg} ${colors.border} border-2 p-8 text-left transition-all duration-200 hover:shadow-lg hover:scale-105 group`}
              >
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className={`${colors.icon} w-16 h-16 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                    {scenario.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`${colors.title} text-2xl font-bold mb-2`}>
                      {scenario.title}
                    </h3>
                    <h4 className={`${colors.subtitle} text-lg font-semibold mb-3`}>
                      {scenario.subtitle}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex items-center">
                    <svg 
                      className="w-6 h-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Each scenario includes unique data sets, visualizations, and suggested queries tailored to the specific use case.
          </p>
        </div>
      </div>
    </div>
  );
}
