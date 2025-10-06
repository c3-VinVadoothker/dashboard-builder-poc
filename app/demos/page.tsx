"use client";

import { useState, useEffect } from "react";
import { scenarios } from "@/data/demo-data";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { CustomScenarioForm } from "@/components/custom-scenario-form";
import Image from "next/image";

export default function DemosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Show all available scenarios
  const availableScenarios = Object.values(scenarios);
  
  // Filter scenarios based on search term
  const filteredScenarios = availableScenarios.filter(scenario =>
    scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scenario.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scenario.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group scenarios by C3 application type
  const groupedScenarios = filteredScenarios.reduce((groups, scenario) => {
    const c3App = scenario.c3Application || 'miscellaneous';
    if (!groups[c3App]) {
      groups[c3App] = [];
    }
    groups[c3App].push(scenario);
    return groups;
  }, {} as Record<string, typeof filteredScenarios>);

  // Define C3 application display names and order
  const c3ApplicationOrder = [
    { key: 'c3-ai-property-appraisal', name: 'State & Local Government Suite' },
    { key: 'c3-ai-inventory-optimization', name: 'Supply Chain Suite' },
    { key: 'c3-ai-health', name: 'Health Suite' },
    { key: 'c3-ai-anti-money-laundering', name: 'Financial Services Suite' },
    { key: 'c3-ai-reliability', name: 'Asset Performance Suite' },
    { key: 'miscellaneous', name: 'Miscellaneous' }
  ];

  // Load expanded sections from session storage on mount
  useEffect(() => {
    const savedExpandedSections = sessionStorage.getItem('demos-expanded-sections');
    if (savedExpandedSections) {
      try {
        setExpandedSections(JSON.parse(savedExpandedSections));
      } catch (error) {
        console.error('Error parsing saved expanded sections:', error);
      }
    }
  }, []);

  // Save expanded sections to session storage whenever they change
  useEffect(() => {
    sessionStorage.setItem('demos-expanded-sections', JSON.stringify(expandedSections));
  }, [expandedSections]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleSelectDemo = (scenarioId: string) => {
    router.push(`/dashboard?demo=${scenarioId}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/C3 AI Logo.jpeg" 
                alt="C3 AI Logo" 
                width={48}
                height={48}
                className="w-12 h-12 object-contain mr-3"
              />
              <h1 className="text-3xl font-semibold text-gray-900">
                Dashboard Builder Demo
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a scenario to explore different use cases and see how the dashboard builder adapts to various industries and data types.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search scenarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Demo Grid - Grouped by C3 Application */}
          <div className="space-y-8">
            {c3ApplicationOrder.map(({ key, name }) => {
              const scenarios = groupedScenarios[key];
              if (!scenarios || scenarios.length === 0) return null;
              
              const isExpanded = expandedSections[key] || false;
              
              return (
                <div key={key} className="space-y-4">
                  {/* C3 Application Header - Clickable */}
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
                      <span className="text-sm text-gray-500">({scenarios.length} scenario{scenarios.length !== 1 ? 's' : ''})</span>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                      )}
                    </div>
                  </button>
                  
                  {/* Scenarios in this group - Collapsible */}
                  {isExpanded && (
                    <div className="space-y-3 pl-4">
                    {scenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => handleSelectDemo(scenario.id)}
                        className="w-full p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left group"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl">
                            {scenario.icon}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {scenario.title}
                            </h3>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              {scenario.subtitle}
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {scenario.description}
                            </p>
                          </div>
                          
                          {/* Arrow */}
                          <div className="flex-shrink-0 flex items-center">
                            <svg 
                              className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredScenarios.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-500">No scenarios found matching &quot;{searchTerm}&quot;</p>
            </div>
          )}

          {/* Custom Scenario Form */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Don&apos;t see what you&apos;re looking for?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We can create a custom dashboard scenario tailored to your specific industry and use case.
              </p>
            </div>
            <CustomScenarioForm />
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Each scenario includes unique data sets, visualizations, and suggested queries tailored to the specific use case.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
