import React, { useEffect, useRef } from 'react';

interface ProcessVariablesChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function ProcessVariablesChart({ data, metadata, sizeType }: ProcessVariablesChartProps) {
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

    // Chart dimensions
    const margin = sizeType === 'small' ? 20 : sizeType === 'medium' ? 30 : 40;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin - (sizeType === 'large' ? 40 : 20);

    // Data processing
    const variables = data.variables || [];
    
    if (variables.length === 0) return;

    // Find min/max values for each variable
    const variableRanges = variables.map((variable: any) => {
      const values = variable.data.map((d: any) => d.value);
      return {
        min: Math.min(...values),
        max: Math.max(...values),
        variable
      };
    });

    // X-axis (time)
    const timePoints = variables[0]?.data || [];
    const xScale = chartWidth / Math.max(timePoints.length - 1, 1);
    
    // Colors for different variables
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

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

    // Vertical grid lines
    for (let i = 0; i < timePoints.length; i += 2) {
      const x = margin + i * xScale;
      ctx.beginPath();
      ctx.moveTo(x, margin);
      ctx.lineTo(x, height - margin);
      ctx.stroke();
    }

    // Draw each variable
    variables.forEach((variable: any, varIndex: number) => {
      const range = variableRanges[varIndex];
      const yScale = chartHeight / (range.max - range.min);
      const color = colors[varIndex % colors.length];

      // Draw line
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      variable.data.forEach((point: any, index: number) => {
        const x = margin + index * xScale;
        const y = height - margin - (point.value - range.min) * yScale;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw data points
      ctx.fillStyle = color;
      variable.data.forEach((point: any, index: number) => {
        const x = margin + index * xScale;
        const y = height - margin - (point.value - range.min) * yScale;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // White border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
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

    // Y-axis labels (for first variable)
    const firstRange = variableRanges[0];
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = firstRange.min + (i * (firstRange.max - firstRange.min) / 5);
      const y = height - margin - (i * chartHeight / 5);
      ctx.fillText(value.toFixed(0), margin - 5, y + 3);
    }

    // X-axis labels (time)
    ctx.textAlign = 'center';
    timePoints.forEach((point: any, index: number) => {
      if (index % 2 === 0) {
        const x = margin + index * xScale;
        const date = new Date(point.time);
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        ctx.fillText(timeStr, x, height - margin + 15);
      }
    });

    // Title
    if (sizeType === 'large') {
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Process Variables Overlay', width / 2, 20);
      
      // Subtitle
      ctx.fillStyle = '#6B7280';
      ctx.font = '12px Arial';
      ctx.fillText(`Last ${data.timeRange}`, width / 2, 35);
    }

    // Legend
    const legendY = sizeType === 'large' ? 50 : 10;
    variables.forEach((variable: any, index: number) => {
      const color = colors[index % colors.length];
      const x = width - 200 + (index * 100);
      
      // Color indicator
      ctx.fillStyle = color;
      ctx.fillRect(x, legendY, 12, 12);
      
      // Label
      ctx.fillStyle = '#374151';
      ctx.font = '10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${variable.name} (${variable.unit})`, x + 15, legendY + 8);
    });

    // Y-axis title
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Process Values', 0, 0);
    ctx.restore();

  }, [data, metadata, sizeType]);

  return (
    <div className="w-full h-full flex flex-col">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
}
