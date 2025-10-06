"use client";

import { useEffect, useRef } from 'react';

interface PatientSatisfactionChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function PatientSatisfactionChart({ data, metadata, sizeType }: PatientSatisfactionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { labels, datasets } = data;
    const width = canvas.width;
    const height = canvas.height;
    
    const padding = sizeType === 'small' ? 5 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const colors = ['#0d9488', '#3b82f6', '#f59e0b', '#ef4444'];

    // Find global min/max across all datasets
    let globalMin = Infinity;
    let globalMax = -Infinity;
    datasets.forEach((dataset: any) => {
      globalMin = Math.min(globalMin, ...dataset.values);
      globalMax = Math.max(globalMax, ...dataset.values);
    });

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
        const value = globalMin + (i / tickCount) * (globalMax - globalMin);
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
        ctx.fillText(`${value.toFixed(1)}`, padding - 8, y + 3);
      }
    }

    // Draw grid lines (only for medium and large tiles)
    if (sizeType !== 'small') {
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padding + (i / 4) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }

    // Draw trend lines for each dataset
    datasets.forEach((dataset: any, datasetIndex: number) => {
      const { label, values } = dataset;
      const color = colors[datasetIndex % colors.length];

      ctx.strokeStyle = color;
      ctx.lineWidth = sizeType === 'small' ? 2 : 3;
      ctx.beginPath();

      values.forEach((value: number, index: number) => {
        const x = padding + (index / (labels.length - 1)) * chartWidth;
        const y = height - padding - ((value - globalMin) / (globalMax - globalMin)) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw data points (only for medium and large tiles)
      if (sizeType !== 'small') {
        values.forEach((value: number, index: number) => {
          const x = padding + (index / (labels.length - 1)) * chartWidth;
          const y = height - padding - ((value - globalMin) / (globalMax - globalMin)) * chartHeight;

          // Draw point
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
          
          // Draw white center
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    });

    // Draw labels (only for medium and large tiles)
    if (sizeType !== 'small') {
      // Draw X-axis
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.stroke();

      // X-axis labels
      labels.forEach((label: string, index: number) => {
        const x = padding + (index / (labels.length - 1)) * chartWidth;
        ctx.fillStyle = '#6B7280';
        ctx.font = sizeType === 'medium' ? '8px Arial' : '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, height - padding + 15);
      });

      // Axis titles (only for large tiles)
      if (sizeType === 'large') {
        // Y-axis title
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Satisfaction Score', 0, 0);
        ctx.restore();

        // X-axis title
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Month', width / 2, height - 5);
      }

      // Legend (only for large tiles)
      if (sizeType === 'large') {
        datasets.forEach((dataset: any, index: number) => {
          const color = colors[index % colors.length];
          const x = padding + index * 100;
          const y = padding - 10;

          // Draw legend line
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + 20, y);
          ctx.stroke();

          // Draw legend text
          ctx.fillStyle = '#374151';
          ctx.font = '10px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(dataset.label, x + 25, y + 3);
        });
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
