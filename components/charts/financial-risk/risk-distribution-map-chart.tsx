"use client";

import React, { useEffect, useRef } from 'react';
import { useChartResize } from '@/hooks/use-chart-resize';

interface RiskDistributionMapChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function RiskDistributionMapChart({ data, metadata, sizeType }: RiskDistributionMapChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderChart = (width, height) => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Set canvas size
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Set CSS size to match container
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const { locations } = data;

    // Draw map background with grid
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines for map effect with axes
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const x = (i / 4) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let i = 0; i <= 2; i++) {
      const y = (i / 2) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes for map (only for medium and large tiles)
    if (sizeType !== 'small') {
      // Y-axis (North-South)
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 20);
      ctx.lineTo(20, height - 20);
      ctx.stroke();
      
      // X-axis (East-West)
      ctx.beginPath();
      ctx.moveTo(20, height - 20);
      ctx.lineTo(width - 20, height - 20);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = '#6B7280';
      ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('North', 20, 15);
      ctx.fillText('South', 20, height - 5);

      // X-axis labels
      ctx.textAlign = 'center';
      ctx.fillText('West', 15, height - 15);
      ctx.fillText('East', width - 15, height - 15);
    }

    // Draw location points with enhanced styling
    locations.forEach((location: any, index: number) => {
      const x = (index % 4) * (width / 4) + width / 8;
      const y = Math.floor(index / 4) * (height / 2) + height / 4;

      // Draw location point with category-based styling
      const pointSize = sizeType === 'small' ? 3 : sizeType === 'medium' ? 8 : 12;
      const categoryColor = getCategoryColor(location.category);
      
      // Draw outer ring
      ctx.fillStyle = categoryColor;
      ctx.beginPath();
      ctx.arc(x, y, pointSize + 2, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw inner point
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw center dot
      ctx.fillStyle = categoryColor;
      ctx.beginPath();
      ctx.arc(x, y, pointSize / 2, 0, 2 * Math.PI);
      ctx.fill();

      // Draw label (only for medium and large tiles)
      if (sizeType !== 'small') {
        ctx.fillStyle = '#374151';
        ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(location.name, x, y + pointSize + 15);
        
        // Draw value
        ctx.fillStyle = '#6B7280';
        ctx.font = sizeType === 'medium' ? '7px Arial' : '9px Arial';
        ctx.fillText(`${location.value.toFixed(1)}%`, x, y + pointSize + 25);
      }
    });

    // Draw legend (only for large tiles)
    if (sizeType === 'large') {
      const legendY = height - 20;
      const legendItems = [
        { color: '#059669', label: 'Low Risk' },
        { color: '#10B981', label: 'Moderate' },
        { color: '#F59E0B', label: 'High Risk' },
        { color: '#EF4444', label: 'Critical' }
      ];
      
      legendItems.forEach((item, index) => {
        const x = 10 + index * 80;
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(x, legendY, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#374151';
        ctx.font = '8px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(item.label, x + 10, legendY + 3);
      });
    }
  };

  // Use the resize hook to handle chart resizing
  useChartResize(({ width, height }) => {
    renderChart(width, height);
  }, [data, metadata, sizeType]);

  // Initial render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    renderChart(rect.width, rect.height);
  }, [data, metadata, sizeType]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Low Risk': return '#059669';
      case 'Moderate': return '#10B981';
      case 'High Risk': return '#F59E0B';
      case 'Critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  // Calculate canvas size based on tile size
  const getCanvasSize = () => {
    switch (sizeType) {
      case 'small':
        return { width: 100, height: 60 };
      case 'medium':
        return { width: 280, height: 200 };
      case 'large':
        return { width: 380, height: 280 };
      default:
        return { width: 280, height: 200 };
    }
  };

  const canvasSize = getCanvasSize();

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="max-w-full max-h-full object-contain"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
