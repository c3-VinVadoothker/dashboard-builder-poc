"use client";

import { useEffect, useRef } from 'react';

interface PatientOutcomesChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function PatientOutcomesChart({ data, metadata, sizeType }: PatientOutcomesChartProps) {
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
    
    const maxValue = 100; // Outcomes are percentages
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

    // Draw bars with healthcare-specific styling
    labels.forEach((label: string, index: number) => {
      const barHeight = (values[index] / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - padding - barHeight;

      // Draw bar with healthcare color coding
      let barColor = colors[index] || '#10B981';
      if (values[index] < 85.0) barColor = '#EF4444'; // Below target
      else if (values[index] >= 95.0) barColor = '#10B981'; // Excellent
      else barColor = '#F59E0B'; // Good

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
        ctx.fillText('Success Rate (%)', 0, 0);
        ctx.restore();

        // X-axis title
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Department', width / 2, height - 5);
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
