"use client";

import { useEffect, useRef } from 'react';

interface ChartProps {
  type: 'bar' | 'line' | 'map';
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function Chart({ type, data, metadata, sizeType }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (type === 'bar') {
      drawBarChart(ctx, data, metadata, sizeType);
    } else if (type === 'line') {
      drawLineChart(ctx, data, sizeType);
    } else if (type === 'map') {
      drawMap(ctx, data, sizeType);
    }
  }, [type, data, metadata, sizeType]);

  const drawBarChart = (ctx: CanvasRenderingContext2D, data: any, metadata: any, sizeType: string) => {
    const { labels, values, colors } = data;
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    // Adjust padding based on tile size
    const padding = sizeType === 'small' ? 5 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...values);
    const barWidth = chartWidth / labels.length * (sizeType === 'small' ? 0.5 : 0.7);
    const barSpacing = chartWidth / labels.length * (sizeType === 'small' ? 0.5 : 0.3);

    // Draw bars
    labels.forEach((label: string, index: number) => {
      const barHeight = (values[index] / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - padding - barHeight;

      // Draw bar
      ctx.fillStyle = colors[index] || '#0d9488';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value (only for medium and large tiles)
      if (sizeType !== 'small') {
        ctx.fillStyle = '#374151';
        ctx.font = sizeType === 'medium' ? '10px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(values[index].toString(), x + barWidth / 2, y - 5);
      }

      // Draw label (only for medium and large tiles)
      if (sizeType !== 'small') {
        ctx.fillStyle = '#6B7280';
        ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
        ctx.fillText(label, x + barWidth / 2, height - padding + 15);
      }
    });

    // Draw reference lines if metadata exists (only for medium and large tiles)
    if (metadata && sizeType !== 'small') {
      const { standardLower, standardUpper } = metadata;
      
      if (standardLower !== undefined) {
        const y = height - padding - (standardLower / maxValue) * chartHeight;
        ctx.strokeStyle = '#8B5CF6';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (standardUpper !== undefined) {
        const y = height - padding - (standardUpper / maxValue) * chartHeight;
        ctx.strokeStyle = '#F59E0B';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  };

  const drawLineChart = (ctx: CanvasRenderingContext2D, data: any, sizeType: string) => {
    const { labels, datasets } = data;
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    const padding = sizeType === 'small' ? 5 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const colors = ['#0d9488', '#3b82f6', '#f59e0b', '#ef4444'];

    datasets.forEach((dataset: any, datasetIndex: number) => {
      const { label, values } = dataset;
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      const valueRange = maxValue - minValue;

      ctx.strokeStyle = colors[datasetIndex % colors.length];
      ctx.lineWidth = sizeType === 'small' ? 1 : 2;
      ctx.beginPath();

      values.forEach((value: number, index: number) => {
        const x = padding + (index / (labels.length - 1)) * chartWidth;
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    });
  };

  const drawMap = (ctx: CanvasRenderingContext2D, data: any, sizeType: string) => {
    const { locations } = data;
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;

    // Draw a simple map representation
    ctx.fillStyle = '#F3F4F6';
    ctx.fillRect(0, 0, width, height);

    // Draw location points
    locations.forEach((location: any, index: number) => {
      const x = (index % 4) * (width / 4) + width / 8;
      const y = Math.floor(index / 4) * (height / 2) + height / 4;

      // Draw point
      ctx.fillStyle = getCategoryColor(location.category);
      ctx.beginPath();
      ctx.arc(x, y, sizeType === 'small' ? 2 : sizeType === 'medium' ? 6 : 8, 0, 2 * Math.PI);
      ctx.fill();

      // Draw label (only for medium and large tiles)
      if (sizeType !== 'small') {
        ctx.fillStyle = '#374151';
        ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(location.name, x, y + 20);
      }
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Very Good': return '#059669';
      case 'Good': return '#10B981';
      case 'Average': return '#F59E0B';
      case 'Poor': return '#F97316';
      case 'Very Poor': return '#EF4444';
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
