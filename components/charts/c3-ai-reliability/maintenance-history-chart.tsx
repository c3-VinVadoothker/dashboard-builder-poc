import React, { useEffect, useRef } from 'react';

interface MaintenanceHistoryChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function MaintenanceHistoryChart({ data, metadata, sizeType }: MaintenanceHistoryChartProps) {
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
    const recentRepairs = data.recentRepairs || [];
    const partsInventory = data.partsInventory || [];
    
    if (recentRepairs.length === 0) return;

    // Timeline chart for repairs
    const maxDuration = Math.max(...recentRepairs.map((repair: any) => parseInt(repair.duration)));
    const yScale = chartHeight / (maxDuration + 5);

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

    // Draw repair timeline bars
    const barWidth = chartWidth / recentRepairs.length * 0.8;
    const barSpacing = chartWidth / recentRepairs.length * 0.2;
    
    recentRepairs.forEach((repair: any, index: number) => {
      const x = margin + index * (barWidth + barSpacing) + barSpacing / 2;
      const barHeight = parseInt(repair.duration) * yScale;
      const y = height - margin - barHeight;
      
      // Color based on repair type
      let color = '#3B82F6'; // Default
      if (repair.type.includes('Bearing')) color = '#EF4444';
      else if (repair.type.includes('Seal')) color = '#F59E0B';
      else if (repair.type.includes('Balancing')) color = '#10B981';

      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw bar border
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Draw duration label
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(repair.duration, x + barWidth / 2, y - 5);

      // Draw cost label
      ctx.fillStyle = '#6B7280';
      ctx.font = '9px Arial';
      ctx.fillText(repair.cost, x + barWidth / 2, y - 18);
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
      const value = Math.round((i * maxDuration) / 5);
      const y = height - margin - (i * chartHeight / 5);
      ctx.fillText(`${value}h`, margin - 5, y + 3);
    }

    // X-axis labels (work orders)
    ctx.textAlign = 'center';
    recentRepairs.forEach((repair: any, index: number) => {
      const x = margin + index * (barWidth + barSpacing) + barSpacing / 2 + barWidth / 2;
      ctx.fillStyle = '#374151';
      ctx.font = '9px Arial';
      
      // Rotate text for better readability
      ctx.save();
      ctx.translate(x, height - margin + 25);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(repair.workOrder, 0, 0);
      ctx.restore();
    });

    // Title
    if (sizeType === 'large') {
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Maintenance History & SAP Work Orders', width / 2, 20);
      
      // Subtitle
      ctx.fillStyle = '#6B7280';
      ctx.font = '12px Arial';
      ctx.fillText(`Avg Duration: ${data.avgRepairDuration} | Total Cost: ${data.totalMaintenanceCost}`, width / 2, 35);
    }

    // Parts inventory section (for large charts)
    if (sizeType === 'large' && partsInventory.length > 0) {
      const inventoryY = 50;
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Parts Inventory:', 20, inventoryY);
      
      partsInventory.forEach((part: any, index: number) => {
        const y = inventoryY + 20 + index * 15;
        const color = part.status === 'In Stock' ? '#10B981' : '#F59E0B';
        
        // Status indicator
        ctx.fillStyle = color;
        ctx.fillRect(20, y - 8, 8, 8);
        
        // Part info
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.fillText(`${part.partNumber}: ${part.description} (${part.quantity})`, 35, y);
      });
    }

    // Y-axis title
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Repair Duration (hours)', 0, 0);
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
