import React, { useEffect, useRef } from 'react';

interface FailurePredictionChartProps {
  data: any;
  metadata?: any;
  sizeType: 'small' | 'medium' | 'large';
}

export function FailurePredictionChart({ data, metadata, sizeType }: FailurePredictionChartProps) {
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
    const recommendations = data.recommendations || [];
    const riskFactors = data.riskFactors || [];
    const nextSteps = data.nextSteps || [];
    
    if (recommendations.length === 0) return;

    // Draw prediction header
    const riskColor = data.riskLevel === 'High' ? '#EF4444' : data.riskLevel === 'Medium' ? '#F59E0B' : '#10B981';
    ctx.fillStyle = riskColor;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Predicted Time-to-Failure: ${data.predictedTimeToFailure}`, width / 2, 25);
    
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px Arial';
    ctx.fillText(`Confidence: ${data.confidence}% | Risk Level: ${data.riskLevel}`, width / 2, 40);

    // Draw recommendations section
    const startY = 60;
    const itemHeight = 30;
    
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Recommended Actions:', 20, startY);
    
    recommendations.forEach((rec: any, index: number) => {
      const y = startY + 20 + index * itemHeight;
      const priorityColor = rec.priority === 'High' ? '#EF4444' : rec.priority === 'Medium' ? '#F59E0B' : '#10B981';
      
      // Priority indicator
      ctx.fillStyle = priorityColor;
      ctx.fillRect(20, y - 10, 4, 20);
      
      // Action name
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(rec.action, 35, y);
      
      // Details
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px Arial';
      if (rec.partNumber) {
        ctx.fillText(`Part: ${rec.partNumber} | Duration: ${rec.estimatedDuration} | Cost: ${rec.cost}`, 35, y + 12);
      } else {
        ctx.fillText(`Duration: ${rec.estimatedDuration} | Cost: ${rec.cost}`, 35, y + 12);
      }
      
      // SOP compliance indicator
      if (rec.sopCompliant) {
        ctx.fillStyle = '#10B981';
        ctx.font = '10px Arial';
        ctx.fillText('✓ SOP Compliant', width - 100, y + 6);
      }
    });

    // Calculate risk factors start position
    const riskStartY = startY + 20 + recommendations.length * itemHeight + 20;

    // Draw risk factors section (for large charts)
    if (sizeType === 'large' && riskFactors.length > 0) {
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Risk Factors:', 20, riskStartY);
      
      riskFactors.forEach((factor: any, index: number) => {
        const y = riskStartY + 20 + index * 20;
        const levelColor = factor.level === 'Critical' ? '#EF4444' : 
                          factor.level === 'Warning' ? '#F59E0B' : 
                          factor.level === 'High' ? '#3B82F6' : '#10B981';
        
        // Risk level indicator
        ctx.fillStyle = levelColor;
        ctx.beginPath();
        ctx.arc(30, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Factor name and level
        ctx.fillStyle = '#374151';
        ctx.font = '11px Arial';
        ctx.fillText(`${factor.factor}: ${factor.level}`, 45, y + 3);
        
        // Impact
        ctx.fillStyle = '#6B7280';
        ctx.font = '10px Arial';
        ctx.fillText(`Impact: ${factor.impact}`, width - 100, y + 3);
      });
    }

    // Draw next steps section (for large charts)
    if (sizeType === 'large' && nextSteps.length > 0) {
      const stepsStartY = riskStartY + 20 + riskFactors.length * 20 + 20;
      
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Next Steps:', 20, stepsStartY);
      
      nextSteps.forEach((step: string, index: number) => {
        const y = stepsStartY + 20 + index * 15;
        
        // Step number
        ctx.fillStyle = '#3B82F6';
        ctx.font = 'bold 10px Arial';
        ctx.fillText(`${index + 1}.`, 20, y);
        
        // Step text
        ctx.fillStyle = '#374151';
        ctx.font = '10px Arial';
        ctx.fillText(step, 35, y);
      });
    }

    // Draw failure mode indicator
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Failure Mode: ${data.failureMode}`, width / 2, height - 20);

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
