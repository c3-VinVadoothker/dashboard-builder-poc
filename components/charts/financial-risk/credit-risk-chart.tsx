"use client";

import React, { useEffect, useRef } from 'react';

interface CreditRiskChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function CreditRiskChart({ data, metadata, sizeType }: CreditRiskChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const { labels, values, colors } = data;
    
    // Adjust padding based on tile size
    const padding = sizeType === 'small' ? 5 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...values);
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
        ctx.fillText(`${value.toFixed(1)}%`, padding - 8, y + 3);
      }
    }

    // Draw bars with credit risk-specific styling
    labels.forEach((label: string, index: number) => {
      const barHeight = (values[index] / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - padding - barHeight;

      // Draw bar with credit risk color coding
      let barColor = colors[index] || '#10B981';
      if (values[index] > 8.0) barColor = '#EF4444'; // High credit risk
      else if (values[index] <= 2.0) barColor = '#10B981'; // Low credit risk
      else barColor = '#F59E0B'; // Moderate credit risk

      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value (only for medium and large tiles)
      if (sizeType !== 'small') {
        ctx.fillStyle = '#374151';
        ctx.font = sizeType === 'medium' ? '10px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${values[index].toFixed(1)}%`, x + barWidth / 2, y - 5);
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

      // Axis titles (only for large tiles)
      if (sizeType === 'large') {
        // Y-axis title
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Default Rate (%)', 0, 0);
        ctx.restore();

        // X-axis title
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Credit Rating', width / 2, height - 5);
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
