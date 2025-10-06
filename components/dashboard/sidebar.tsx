"use client";

import { Home, Building2, FileText, Settings, Grid3X3, Wand2, ArrowLeft, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  onBackToMenu?: () => void;
  onPresentationMode?: () => void;
}

export function Sidebar({ onBackToMenu, onPresentationMode }: SidebarProps) {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/demos');
  };
  return (
    <div className="w-16 bg-white border-r border-gray-300 flex flex-col h-full">
      {/* Logo Section - C3 AI Logo */}
      <div className="p-3 border-b border-gray-300">
        <div className="flex items-center justify-center">
          <Image 
            src="/C3 AI Logo.jpeg" 
            alt="C3 AI Logo" 
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* Navigation Items - Icons only */}
      <nav className="flex-1 p-2 space-y-2">
        <div className="space-y-1">
          <div 
            className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
            onClick={handleHomeClick}
            title="Go to Demos"
          >
            <Home size={20} />
          </div>
          
          <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
            <Building2 size={20} />
          </div>
          
          <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
            <FileText size={20} />
          </div>
          
          
          <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
            <Settings size={20} />
          </div>
          
          <div className="flex items-center justify-center p-2 bg-gray-200 text-gray-900 cursor-pointer">
            <Grid3X3 size={20} />
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-2 border-t border-gray-300 space-y-2">
        <div className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer">
          <Wand2 size={20} />
        </div>
        <div 
          className="flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
          onClick={onPresentationMode}
          title="Presentation Mode"
        >
          <Presentation size={20} />
        </div>
      </div>
    </div>
  );
}
