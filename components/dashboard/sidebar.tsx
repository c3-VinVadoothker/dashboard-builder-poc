"use client";

import { Home, Building2, FileText, Settings, Grid3X3, Wand2 } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo Section - Just C3.ai text */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900">C3.ai</span>
        </div>
      </div>

      {/* Navigation Items - Icons only */}
      <nav className="flex-1 p-2 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Home size={20} />
          </div>
          
          <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Building2 size={20} />
          </div>
          
          <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <FileText size={20} />
          </div>
          
          
          <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Settings size={20} />
          </div>
          
          <div className="flex items-center justify-center p-2 bg-gray-100 text-gray-900 rounded-lg cursor-pointer">
            <Grid3X3 size={20} />
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-2 border-t border-gray-100">
        <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
          <Wand2 size={20} />
        </div>
      </div>
    </div>
  );
}
