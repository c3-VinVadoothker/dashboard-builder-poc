"use client";

import { useState, useEffect } from "react";
import { X, Send, MessageCircle, AlertTriangle } from "lucide-react";
import { useDashboard } from "@/contexts/dashboard-context";

interface ChatPanelProps {
  tileId: string;
  isEditMode: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatPanel({ tileId, isEditMode, onClose }: ChatPanelProps) {
  const { state, dispatch, saveStateBeforeChange, saveStateAfterChange, demoData } = useDashboard();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const tile = state.tiles.find(t => t.tileId === tileId);

  // Function to get single query
  const getSingleQuery = () => {
    if (!demoData || !demoData.singleQuery) return null;
    return demoData.singleQuery;
  };

  // Function to get suggestions based on tile size
  const getSuggestions = () => {
    if (!tile || !demoData) return [];
    
    switch (tile.sizeType) {
      case 'small':
        return demoData.suggestedQueries.small || [];
      case 'medium':
        return demoData.suggestedQueries.medium || [];
      case 'large':
        return demoData.suggestedQueries.large || [];
      default:
        return demoData.suggestedQueries.medium || [];
    }
  };

  // Initialize input value with placeholder text
  useEffect(() => {
    if (!inputValue) {
      setInputValue("Type Input Here");
    }
  }, []);

  // Function to toggle the single query
  const toggleQuery = () => {
    const singleQuery = getSingleQuery();
    if (singleQuery) {
      if (inputValue === "Type Input Here") {
        setInputValue(singleQuery);
      } else {
        setInputValue("Type Input Here");
      }
    }
  };

  useEffect(() => {
    // Initialize chat when it opens
    if (isEditMode && messages.length === 0) {
      // Chat is ready for user input
    }
  }, [isEditMode, messages.length]);

  const handleSendMessage = async (content: string, visualizationType?: string) => {
    if (!content.trim() || !isEditMode) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Set tile loading state
    saveStateBeforeChange({ type: 'SET_TILE_LOADING', payload: { tileId, isLoading: true } });

    try {
      // Determine demo type from dashboard ID
      let demoType = 'property-appraisal'; // default
      if (demoData && demoData.dashboard) {
        switch (demoData.dashboard.dashboardId) {
          case 'dashboard-1':
            demoType = 'property-appraisal';
            break;
          case 'dashboard-2':
            demoType = 'retail-analytics';
            break;
          case 'dashboard-3':
            demoType = 'healthcare-metrics';
            break;
          case 'dashboard-4':
            demoType = 'financial-risk';
            break;
          case 'dashboard-5':
            demoType = 'c3-ai-reliability';
            break;
        }
      }

      // Call the visualization API
      const response = await fetch('/api/visualization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: content,
          tileId,
          visualizationType,
          demoType
        })
      });

      const result = await response.json();

      if (result.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: result.visualization.assistantMessage || `Done. The chart now shows ${result.visualization.title.toLowerCase()}.`,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Populate the tile with the visualization data
        saveStateAfterChange({
          type: 'POPULATE_TILE',
          payload: {
            tileId,
            data: {
              tileTitle: result.visualization.title,
              chatSummary: result.visualization.summary,
              visualizationFunction: {
                type: result.visualization.type,
                data: result.visualization.data,
                metadata: result.visualization.metadata
              }
            }
          }
        });
      } else {
        throw new Error('Failed to generate visualization');
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while generating the visualization. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Set tile error state
      saveStateBeforeChange({ 
        type: 'SET_TILE_ERROR', 
        payload: { 
          tileId, 
          error: 'Failed to generate visualization. Please try again.' 
        } 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoInput = () => {
    // This function is no longer needed
  };



  const handleClose = () => {
    if (isLoading) {
      setShowWarning(true);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-300 flex flex-col z-50">
      {/* Tile Interaction Banner */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-600"></div>
            <span className="text-sm font-medium text-gray-800">
              {tile?.tileTitle || (tile?.sizeType ? `${tile.sizeType.charAt(0).toUpperCase() + tile.sizeType.slice(1)} tile` : 'Tile')}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <MessageCircle size={20} className="text-gray-700" />
          <h3 className="font-semibold text-gray-900">C3 AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          {/* Undo/Redo buttons removed - they exist elsewhere in the interface */}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-sm">
              {isEditMode 
                ? "What do you want to create?" 
                : "Chat is disabled in view mode"
              }
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 text-sm ${
                  message.type === 'user'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-3 py-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-b-2 border-gray-600"></div>
                <span>Generating visualization...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Cards - Above Input */}
      {isEditMode && (
        <div className="p-4 border-t border-gray-300">
          <div className="grid gap-2">
            {getSuggestions().map((suggestion: any, index: number) => {
              const query = typeof suggestion === 'string' ? suggestion : suggestion.query;
              const visualizationType = typeof suggestion === 'string' ? undefined : suggestion.visualizationType;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSendMessage(query, visualizationType)}
                  disabled={isLoading}
                  className="w-full p-2 text-left bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-xs text-gray-700 leading-relaxed">
                      {query}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Section - At Bottom */}
        <div className="p-4 border-t border-gray-300">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onClick={isEditMode ? toggleQuery : undefined}
              onKeyPress={(e) => e.key === 'Enter' && inputValue !== "Type Input Here" && handleSendMessage(inputValue)}
              className={`w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                inputValue === "Type Input Here" ? "text-gray-400" : "text-gray-900"
              }`}
              disabled={isLoading || !isEditMode}
              readOnly
            />
          </div>
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim() || !isEditMode || inputValue === "Type Input Here"}
            className="px-3 py-2 bg-gray-800 text-white hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white border border-gray-300 p-6 max-w-sm mx-4">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle size={20} className="text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Visualization in Progress
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              A visualization is currently being created. Closing now will cancel the operation.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setShowWarning(false);
                  onClose();
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Close Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
