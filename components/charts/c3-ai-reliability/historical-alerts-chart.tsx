import React, { useEffect, useRef } from 'react';
import { useChartResize } from '@/hooks/use-chart-resize';

interface HistoricalAlertsChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function HistoricalAlertsChart({ data, metadata, sizeType }: HistoricalAlertsChartProps) {
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

    // Chart dimensions
    const margin = sizeType === 'small' ? 20 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin - (sizeType === 'large' ? 40 : 20);

    // Data processing
    const failureModes = data.failureModes || [];
    
    if (failureModes.length === 0) return;

    // Find max count for scaling
    const maxCount = Math.max(...failureModes.map((mode: any) => mode.count));

    // Bar chart dimensions
    const barWidth = chartWidth / failureModes.length * 0.8;
    const barSpacing = chartWidth / failureModes.length * 0.2;
    const yScale = chartHeight / maxCount;

    // Colors for different failure modes
    const colors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = margin + (i * chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(margin, y);
      ctx.lineTo(width - margin, y);
      ctx.stroke();
    }

    // Draw bars
    failureModes.forEach((mode: any, index: number) => {
      const x = margin + index * (barWidth + barSpacing) + barSpacing / 2;
      const barHeight = mode.count * yScale;
      const y = height - margin - barHeight;
      const color = colors[index % colors.length];

      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw bar border
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Draw count label on top of bar
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(mode.count.toString(), x + barWidth / 2, y - 5);

      // Draw percentage label
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px Arial';
      ctx.fillText(`${mode.percentage}%`, x + barWidth / 2, y - 20);
    });

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((i * maxCount) / 5);
      const y = height - margin - (i * chartHeight / 5);
      ctx.fillText(value.toString(), margin - 5, y + 3);
    }

    // X-axis labels (failure modes)
    ctx.textAlign = 'center';
    failureModes.forEach((mode: any, index: number) => {
      const x = margin + index * (barWidth + barSpacing) + barSpacing / 2 + barWidth / 2;
      ctx.fillStyle = '#374151';
      ctx.font = '10px Arial';
      
      // Rotate text for better readability
      ctx.save();
      ctx.translate(x, height - margin + 20);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(mode.mode, 0, 0);
      ctx.restore();
    });

    // Title
    if (sizeType === 'large') {
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Historical Alerts by Failure Mode', width / 2, 20);
      
      // Subtitle
      ctx.fillStyle = '#6B7280';
      ctx.font = '12px Arial';
      ctx.fillText(`Past ${data.timeRange} - ${data.totalAlerts} Total Alerts`, width / 2, 35);
    }

    // Legend with additional info
    if (sizeType === 'large') {
      const legendY = 50;
      failureModes.forEach((mode: any, index: number) => {
        const color = colors[index % colors.length];
        const x = 20;
        const y = legendY + index * 20;
        
        // Color indicator
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 12, 12);
        
        // Label with additional info
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`${mode.mode}: ${mode.count} alerts, Avg TTF: ${mode.avgTimeToFailure}`, x + 15, y + 8);
      });
    }

    // Y-axis title
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Number of Alerts', 0, 0);
    ctx.restore();

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

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
}
