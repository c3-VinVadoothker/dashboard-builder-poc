import { NextRequest, NextResponse } from 'next/server';
import { propertyAppraisalData } from '@/data/property-appraisal-data';
import { retailAnalyticsData } from '@/data/retail-analytics-data';
import { healthcareMetricsData } from '@/data/healthcare-metrics-data';
import { financialRiskData } from '@/data/financial-risk-data';
import { c3AiReliabilityData } from '@/data/c3-ai-reliability-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, tileId, visualizationType: providedType, demoType } = body;

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get the appropriate demo data based on demoType
    let currentDemoData;
    switch (demoType) {
      case 'property-appraisal':
        currentDemoData = propertyAppraisalData;
        break;
      case 'retail-analytics':
        currentDemoData = retailAnalyticsData;
        break;
      case 'healthcare-metrics':
        currentDemoData = healthcareMetricsData;
        break;
      case 'financial-risk':
        currentDemoData = financialRiskData;
        break;
      case 'c3-ai-reliability':
        currentDemoData = c3AiReliabilityData;
        break;
      default:
        currentDemoData = propertyAppraisalData; // fallback
    }

    // Use provided visualization type if available, otherwise determine from query
    let visualizationType = providedType || Object.keys(currentDemoData.visualizationData)[0];
    
    if (!providedType) {
      const queryLower = query.toLowerCase();
      
      // Check each visualization type's matching keywords
      for (const [type, keywords] of Object.entries(currentDemoData.queryMatching)) {
        if (keywords.some((keyword: string) => queryLower.includes(keyword))) {
          visualizationType = type;
          break;
        }
      }
    }

    const visualizationData = currentDemoData.visualizationData[visualizationType as keyof typeof currentDemoData.visualizationData] as any;

    if (!visualizationData) {
      throw new Error(`Visualization type ${visualizationType} not found`);
    }

    // Generate a summary
    const summary = `Generated ${visualizationData.title} based on the query: "${query}". This visualization shows relevant data with appropriate metrics and standards compliance indicators.`;

    return NextResponse.json({
      success: true,
      visualization: {
        tileId,
        title: visualizationData.title,
        type: visualizationData.type,
        data: visualizationData.data,
        metadata: visualizationData.metadata,
        summary,
        assistantMessage: visualizationData.assistantMessage
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate visualization' },
      { status: 500 }
    );
  }
}
