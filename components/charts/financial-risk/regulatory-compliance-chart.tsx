"use client";

import React, { useEffect, useRef } from 'react';
import { useChartResize } from '@/hooks/use-chart-resize';

interface RegulatoryComplianceChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function RegulatoryComplianceChart({ data, metadata, sizeType }: RegulatoryComplianceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderChart = (width: number, height: number) => {
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

    const { labels, datasets } = data;
    
    // Adjust padding based on tile size
    const padding = sizeType === 'small' ? 5 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = 100; // Compliance is out of 100%
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
        const value = (i / tickCount) * maxValue;
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
        ctx.fillText(`${value.toFixed(0)}%`, padding - 8, y + 3);
      }
    }

    // Draw bars for each dataset
    datasets.forEach((dataset: any, datasetIndex: number) => {
      const datasetColor = datasetIndex === 0 ? '#3B82F6' : '#EF4444';
      const barOffset = datasetIndex * (barWidth / datasets.length);
      
      labels.forEach((label: string, index: number) => {
        const value = dataset.values[index];
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * (barWidth + barSpacing) + barSpacing / 2 + barOffset;
        const y = height - padding - barHeight;

        // Draw bar with compliance color coding
        let barColor = datasetColor;
        if (value < 85.0) barColor = '#EF4444'; // Non-compliant
        else if (value >= 95.0) barColor = '#10B981'; // Fully compliant
        else barColor = '#F59E0B'; // Partially compliant

        ctx.fillStyle = barColor;
        ctx.fillRect(x, y, barWidth / datasets.length, barHeight);

        // Draw value (only for medium and large tiles)
        if (sizeType !== 'small' && datasetIndex === 0) {
          ctx.fillStyle = '#374151';
          ctx.font = sizeType === 'medium' ? '10px Arial' : '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${value.toFixed(1)}%`, x + barWidth / 2, y - 5);
        }
      });
    });

    // Draw labels (only for medium and large tiles)
    if (sizeType !== 'small') {
      labels.forEach((label: string, index: number) => {
        const x = padding + index * (barWidth + barSpacing) + barSpacing / 2 + barWidth / 2;
        ctx.fillStyle = '#6B7280';
        ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, height - padding + 15);
      });
    }

    // Draw X-axis
    if (sizeType !== 'small') {
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.stroke();

      // Axis titles (only for large tiles)
      if (sizeType === 'large') {
        // Y-axis title
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Compliance Rate (%)', 0, 0);
        ctx.restore();

        // X-axis title
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Regulation', width / 2, height - 5);
      }
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
