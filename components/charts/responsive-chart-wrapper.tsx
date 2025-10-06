"use client";

import { useEffect, useRef } from 'react';
import { useResizeObserver } from '@/hooks/use-resize-observer';

interface ResponsiveChartWrapperProps {
  children: React.ReactNode;
  sizeType: 'small' | 'medium' | 'large';
  className?: string;
}

export function ResponsiveChartWrapper({ 
  children, 
  sizeType, 
  className = "w-full h-full" 
}: ResponsiveChartWrapperProps) {
  const { ref, width, height } = useResizeObserver();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dispatch resize event when dimensions change
  useEffect(() => {
    const container = ref.current;
    if (!container || width === 0 || height === 0) return;

    // Dispatch a custom event to notify charts of resize
    const resizeEvent = new CustomEvent('chartResize', {
      detail: { width, height, sizeType }
    });
    container.dispatchEvent(resizeEvent);
  }, [width, height, sizeType]);

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: sizeType === 'small' ? '120px' :
                   sizeType === 'medium' ? '216px' :
                   '272px'
      }}
    >
      {children}
    </div>
  );
}
