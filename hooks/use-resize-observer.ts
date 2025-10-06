import { useEffect, useRef, useState } from 'react';

interface UseResizeObserverReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  width: number;
  height: number;
}

export function useResizeObserver(): UseResizeObserverReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial dimensions
    const updateDimensions = () => {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height
      });
    };

    // Initial measurement
    updateDimensions();

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    // Start observing
    resizeObserver.observe(element);

    // Also listen to window resize as fallback
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return {
    ref,
    width: dimensions.width,
    height: dimensions.height
  };
}
