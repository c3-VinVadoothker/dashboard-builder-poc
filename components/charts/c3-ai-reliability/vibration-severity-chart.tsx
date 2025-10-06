import React, { useEffect, useRef } from 'react';
import { useChartResize } from '@/hooks/use-chart-resize';

interface VibrationSeverityChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function VibrationSeverityChart({ data, metadata, sizeType }: VibrationSeverityChartProps) {
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
    const severityData = data?.severityLevels || [];
    const thresholds = data?.thresholds || { normal: 2.5, caution: 3.0, warning: 4.0, critical: 5.0 };
    
    if (!data || severityData.length === 0) return;

    // Find min/max values
    const maxSeverity = Math.max(...severityData.map((d: any) => d.severity), thresholds.critical);
    const minSeverity = Math.min(...severityData.map((d: any) => d.severity), 0);

    // X-axis (time)
    const xScale = chartWidth / Math.max(severityData.length - 1, 1);
    
    // Y-axis (severity)
    const yScale = chartHeight / Math.max(maxSeverity - minSeverity, 1);

    // Draw threshold zones
    const drawThresholdZone = (y: number, color: string, alpha: number = 0.1) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(margin, height - margin - (y - minSeverity) * yScale, chartWidth, yScale * 0.5);
      ctx.globalAlpha = 1;
    };

    // Draw threshold lines
    const drawThresholdLine = (y: number, color: string, label: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(margin, height - margin - (y - minSeverity) * yScale);
      ctx.lineTo(width - margin, height - margin - (y - minSeverity) * yScale);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label
      ctx.fillStyle = color;
      ctx.font = '10px Arial';
      ctx.fillText(label, width - margin - 60, height - margin - (y - minSeverity) * yScale - 5);
    };

    // Draw threshold zones
    drawThresholdZone(thresholds.normal, '#10B981', 0.1);
    drawThresholdZone(thresholds.caution, '#F59E0B', 0.1);
    drawThresholdZone(thresholds.warning, '#EF4444', 0.1);
    drawThresholdZone(thresholds.critical, '#DC2626', 0.15);

    // Draw threshold lines
    drawThresholdLine(thresholds.normal, '#10B981', 'Normal');
    drawThresholdLine(thresholds.caution, '#F59E0B', 'Caution');
    drawThresholdLine(thresholds.warning, '#EF4444', 'Warning');
    drawThresholdLine(thresholds.critical, '#DC2626', 'Critical');

    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = height - margin - (i * chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(margin, y);
      ctx.lineTo(width - margin, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i < severityData.length; i += 2) {
      const x = margin + i * xScale;
      ctx.beginPath();
      ctx.moveTo(x, margin);
      ctx.lineTo(x, height - margin);
      ctx.stroke();
    }

    // Draw severity line
    ctx.strokeStyle = '#1F2937';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    severityData.forEach((point: any, index: number) => {
      const x = margin + index * xScale;
      const y = height - margin - (point.severity - minSeverity) * yScale;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points
    severityData.forEach((point: any, index: number) => {
      const x = margin + index * xScale;
      const y = height - margin - (point.severity - minSeverity) * yScale;
      
      // Color based on severity
      let color = '#10B981'; // Normal
      if (point.severity >= thresholds.critical) color = '#DC2626';
      else if (point.severity >= thresholds.warning) color = '#EF4444';
      else if (point.severity >= thresholds.caution) color = '#F59E0B';
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
      
      // White border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();
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
      const value = minSeverity + (i * (maxSeverity - minSeverity) / 5);
      const y = height - margin - (i * chartHeight / 5);
      ctx.fillText(value.toFixed(1), margin - 5, y + 3);
    }

    // X-axis labels (time)
    ctx.textAlign = 'center';
    severityData.forEach((point: any, index: number) => {
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
      ctx.fillText('Vibration Severity Trend', width / 2, 20);
      
      // Subtitle
      ctx.fillStyle = '#6B7280';
      ctx.font = '12px Arial';
      ctx.fillText(`${data.equipment} - Last ${data.timeRange}`, width / 2, 35);
    }

    // Y-axis title
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Severity Level', 0, 0);
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
