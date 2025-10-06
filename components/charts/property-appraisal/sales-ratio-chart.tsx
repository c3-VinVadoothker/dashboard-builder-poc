"use client";

import { useEffect, useRef } from 'react';

interface SalesRatioChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function SalesRatioChart({ data, metadata, sizeType }: SalesRatioChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { labels, values, colors } = data;
    const width = canvas.width;
    const height = canvas.height;
    
    // Adjust padding based on tile size
    const padding = sizeType === 'small' ? 5 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const barWidth = chartWidth / labels.length * (sizeType === 'small' ? 0.5 : 0.7);
    const barSpacing = chartWidth / labels.length * (sizeType === 'small' ? 0.5 : 0.3);

    // Draw Y-axis
    if (sizeType !== 'small') {
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.stroke();

      // Draw Y-axis ticks and labels
      const tickCount = 5;
      for (let i = 0; i <= tickCount; i++) {
        const value = minValue + (i / tickCount) * (maxValue - minValue);
        const y = height - padding - (i / tickCount) * chartHeight;
        
        // Draw tick
        ctx.strokeStyle = '#6B7280';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding - 5, y);
        ctx.lineTo(padding, y);
        ctx.stroke();
        
        // Draw label
        ctx.fillStyle = '#6B7280';
        ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(value.toFixed(2), padding - 8, y + 3);
      }
    }

    // Draw bars with sales ratio-specific styling
    labels.forEach((label: string, index: number) => {
      const normalizedValue = (values[index] - minValue) / (maxValue - minValue);
      const barHeight = normalizedValue * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - padding - barHeight;

      // Draw bar with sales ratio color coding
      let barColor = colors[index] || '#10B981';
      if (values[index] < 0.9) barColor = '#EF4444'; // Below ideal
      else if (values[index] > 1.1) barColor = '#F59E0B'; // Above ideal
      else barColor = '#10B981'; // Within ideal range

      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value (only for medium and large tiles)
      if (sizeType !== 'small') {
        ctx.fillStyle = '#374151';
        ctx.font = sizeType === 'medium' ? '10px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(values[index].toFixed(2), x + barWidth / 2, y - 5);
      }

      // Draw label (only for medium and large tiles)
      if (sizeType !== 'small') {
        ctx.fillStyle = '#6B7280';
        ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2, height - padding + 15);
      }
    });

    // Draw X-axis
    if (sizeType !== 'small') {
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.stroke();
    }

    // Draw sales ratio-specific reference lines (ideal range around 1.0)
    if (metadata && sizeType !== 'small') {
      const { standardLower, standardUpper } = metadata;
      
      if (standardLower !== undefined) {
        const normalizedLower = (standardLower - minValue) / (maxValue - minValue);
        const y = height - padding - normalizedLower * chartHeight;
        ctx.strokeStyle = '#10B981';
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add label
        ctx.fillStyle = '#10B981';
        ctx.font = '10px Arial';
        ctx.fillText('Ideal Min', padding + 5, y - 5);
      }

      if (standardUpper !== undefined) {
        const normalizedUpper = (standardUpper - minValue) / (maxValue - minValue);
        const y = height - padding - normalizedUpper * chartHeight;
        ctx.strokeStyle = '#10B981';
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add label
        ctx.fillStyle = '#10B981';
        ctx.font = '10px Arial';
        ctx.fillText('Ideal Max', padding + 5, y - 5);
      }
    }
  }, [data, metadata, sizeType]);

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
