import { useEffect, useRef } from 'react';

interface ChartResizeEvent {
  width: number;
  height: number;
  sizeType: 'small' | 'medium' | 'large';
}

export function useChartResize(
  onResize: (event: ChartResizeEvent) => void,
  dependencies: any[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = (event: CustomEvent<ChartResizeEvent>) => {
      onResize(event.detail);
    };

    container.addEventListener('chartResize', handleResize as EventListener);

    return () => {
      container.removeEventListener('chartResize', handleResize as EventListener);
    };
  }, dependencies);

  return containerRef;
}
