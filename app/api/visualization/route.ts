import { NextRequest, NextResponse } from 'next/server';

// Mock data for property appraisal visualizations
const MOCK_DATA = {
  'coefficient-dispersion': {
    title: 'Coefficient of Dispersion by Property Type',
    type: 'bar',
    data: {
      labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7', 'Type 8'],
      values: [7.3, 8.1, 6.8, 9.2, 7.9, 3.2, 8.7, 11.0],
      colors: ['#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981']
    },
    metadata: {
      standardLower: 6,
      standardUpper: 12,
      unit: '%'
    }
  },
  'price-related-differential': {
    title: 'Price-Related Differential Analysis',
    type: 'bar',
    data: {
      labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7', 'Type 8'],
      values: [1.78, 1.07, 0.71, 1.23, 0.71, 1.45, 1.12, 0.89],
      colors: ['#10B981', '#3B82F6', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981']
    },
    metadata: {
      standardLower: 0.8,
      standardUpper: 1.0,
      unit: ''
    }
  },
  'sales-ratio': {
    title: 'Sales Ratio Analysis',
    type: 'bar',
    data: {
      labels: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed Use'],
      values: [0.95, 0.88, 1.02, 0.92, 0.97],
      colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']
    },
    metadata: {
      standardLower: 0.9,
      standardUpper: 1.1,
      unit: ''
    }
  },
  'sales-map': {
    title: 'Sales Ratio Map',
    type: 'map',
    data: {
      locations: [
        { name: 'Riverside Valley', lat: 33.9533, lng: -117.3962, value: 0.95, category: 'Good' },
        { name: 'Desert Springs', lat: 33.8303, lng: -116.5453, value: 1.02, category: 'Average' },
        { name: 'Mountain View', lat: 33.7525, lng: -116.3760, value: 0.88, category: 'Good' },
        { name: 'Sunny Meadows', lat: 33.5207, lng: -117.1859, value: 1.15, category: 'Poor' },
        { name: 'Canyon Coast', lat: 33.2028, lng: -117.3831, value: 0.92, category: 'Good' },
        { name: 'Lake Elsinore', lat: 33.6681, lng: -117.3273, value: 1.08, category: 'Average' },
        { name: 'Temecula Hills', lat: 33.4936, lng: -117.1484, value: 0.85, category: 'Very Good' },
        { name: 'Palm Oasis', lat: 33.8303, lng: -116.5453, value: 1.22, category: 'Poor' }
      ]
    },
    metadata: {
      standardLower: 0.9,
      standardUpper: 1.1,
      unit: ''
    }
  },
  'property-trends': {
    title: 'Property Value Trends',
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Residential',
          values: [450000, 455000, 460000, 465000, 470000, 475000, 480000, 485000, 490000, 495000, 500000, 505000]
        },
        {
          label: 'Commercial',
          values: [650000, 655000, 660000, 665000, 670000, 675000, 680000, 685000, 690000, 695000, 700000, 705000]
        }
      ]
    },
    metadata: {
      standardLower: 0,
      standardUpper: 0,
      unit: '$'
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, tileId } = body;

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Determine visualization type based on query
    let visualizationType = 'coefficient-dispersion';
    
    if (query.toLowerCase().includes('price-related') || query.toLowerCase().includes('prd')) {
      visualizationType = 'price-related-differential';
    } else if (query.toLowerCase().includes('sales ratio') || query.toLowerCase().includes('sales ratios')) {
      visualizationType = 'sales-ratio';
    } else if (query.toLowerCase().includes('map') || query.toLowerCase().includes('geographic')) {
      visualizationType = 'sales-map';
    } else if (query.toLowerCase().includes('trend') || query.toLowerCase().includes('time')) {
      visualizationType = 'property-trends';
    }

    const visualizationData = MOCK_DATA[visualizationType as keyof typeof MOCK_DATA];

    // Generate a summary
    const summary = `Generated ${visualizationData.title} based on the query: "${query}". This visualization shows property appraisal data with relevant metrics and standards compliance indicators.`;

    return NextResponse.json({
      success: true,
      visualization: {
        tileId,
        title: visualizationData.title,
        type: visualizationData.type,
        data: visualizationData.data,
        metadata: visualizationData.metadata,
        summary
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate visualization' },
      { status: 500 }
    );
  }
}
