import React, { useEffect, useRef } from 'react';

interface SopComplianceChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function SopComplianceChart({ data, metadata, sizeType }: SopComplianceChartProps) {
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
    const sopChecks = data.sopChecks || [];
    const shiftLogs = data.shiftLogs || [];
    const manualReferences = data.manualReferences || [];
    
    if (sopChecks.length === 0) return;

    // Draw compliance status header
    const statusColor = data.complianceStatus === 'Compliant' ? '#10B981' : '#EF4444';
    ctx.fillStyle = statusColor;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`SOP Compliance: ${data.complianceStatus}`, width / 2, 25);

    // Draw SOP compliance checklist
    const itemHeight = 25;
    const startY = 50;
    
    sopChecks.forEach((check: any, index: number) => {
      const y = startY + index * itemHeight;
      const color = check.status === 'Compliant' ? '#10B981' : '#EF4444';
      
      // Status indicator
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(30, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      // White border
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Procedure name
      ctx.fillStyle = '#111827';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(check.procedure, 45, y + 4);
      
      // Last updated
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px Arial';
      ctx.fillText(`Updated: ${check.lastUpdated}`, width - 120, y + 4);
    });

    // Draw shift logs section (for large charts)
    if (sizeType === 'large' && shiftLogs.length > 0) {
      const logsStartY = startY + sopChecks.length * itemHeight + 20;
      
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Recent Shift Logs:', 20, logsStartY);
      
      shiftLogs.forEach((log: any, index: number) => {
        const y = logsStartY + 20 + index * 60;
        
        // Date and shift header
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 11px Arial';
        ctx.fillText(`${log.date} - ${log.shift} (${log.operator})`, 20, y);
        
        // Notes
        ctx.fillStyle = '#6B7280';
        ctx.font = '10px Arial';
        const words = log.notes.split(' ');
        let line = '';
        let lineY = y + 15;
        
        words.forEach((word: string) => {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > width - 40 && line !== '') {
            ctx.fillText(line, 20, lineY);
            line = word + ' ';
            lineY += 12;
          } else {
            line = testLine;
          }
        });
        if (line) {
          ctx.fillText(line, 20, lineY);
        }
        
        // Actions
        ctx.fillStyle = '#3B82F6';
        ctx.font = '10px Arial';
        ctx.fillText(`Actions: ${log.actions.join(', ')}`, 20, lineY + 15);
      });
    }

    // Draw manual references section (for large charts)
    if (sizeType === 'large' && manualReferences.length > 0) {
      const refsStartY = sizeType === 'large' ? startY + sopChecks.length * itemHeight + 20 + (shiftLogs.length * 60) + 20 : startY + sopChecks.length * itemHeight + 20;
      
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Manual References:', 20, refsStartY);
      
      manualReferences.forEach((ref: any, index: number) => {
        const y = refsStartY + 20 + index * 20;
        const color = ref.accessible ? '#10B981' : '#EF4444';
        
        // Accessibility indicator
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(30, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Manual title
        ctx.fillStyle = '#374151';
        ctx.font = '11px Arial';
        ctx.fillText(ref.title, 45, y + 3);
        
        // Version
        ctx.fillStyle = '#6B7280';
        ctx.font = '10px Arial';
        ctx.fillText(`v${ref.version}`, width - 60, y + 3);
      });
    }

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
