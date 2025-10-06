export const propertyAppraisalData = {
  dashboard: {
    dashboardId: 'dashboard-1',
    ownerId: 'user-1',
    dashboardName: 'Custom Dashboard',
    suggestedName: 'Annual Assessment Uniformity Audit',
    layout: [
      ['tile-1', 'tile-2', 'tile-3', 'tile-4'],
      ['tile-5', 'tile-6'],
      ['tile-7']
    ]
  },
  suggestedQueries: {
    small: [
      { query: 'Show COD by property type', visualizationType: 'coefficient-dispersion-chart' },
      { query: 'Display sales ratio', visualizationType: 'sales-ratio-chart' },
      { query: 'Show PRD analysis', visualizationType: 'prd-analysis-chart' }
    ],
    medium: [
      { query: 'Show me the Coefficient of Dispersion by property type for all sales in the last 12 months', visualizationType: 'coefficient-dispersion-chart' },
      { query: 'Create a map visualization of sales ratios by neighborhood', visualizationType: 'sales-map-chart' },
      { query: 'Display Price-Related Differential analysis for residential properties', visualizationType: 'prd-analysis-chart' }
    ],
    large: [
      { query: 'Show me the Coefficient of Dispersion by property type for all sales in the last 12 months', visualizationType: 'coefficient-dispersion-chart' },
      { query: 'Create a map visualization of sales ratios by neighborhood', visualizationType: 'sales-map-chart' },
      { query: 'Display Price-Related Differential analysis for residential properties', visualizationType: 'prd-analysis-chart' },
      { query: 'Generate a bar chart of appraisal accuracy metrics', visualizationType: 'sales-ratio-chart' },
      { query: 'Show property value trends over time', visualizationType: 'property-trends-chart' }
    ]
  },
  singleQuery: 'Show COD by property type',
  visualizationData: {
    'coefficient-dispersion-chart': {
      title: 'Coefficient of Dispersion by Property Type',
      type: 'coefficient-dispersion-chart',
      data: {
        labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7', 'Type 8'],
        values: [7.3, 8.1, 6.8, 9.2, 7.9, 3.2, 8.7, 11.0],
        colors: ['#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981']
      },
      metadata: {
        standardLower: 6,
        standardUpper: 12,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows coefficient of dispersion by property type.'
    },
    'prd-analysis-chart': {
      title: 'Price-Related Differential Analysis',
      type: 'prd-analysis-chart',
      data: {
        labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7', 'Type 8'],
        values: [1.78, 1.07, 0.71, 1.23, 0.71, 1.45, 1.12, 0.89],
        colors: ['#10B981', '#3B82F6', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981']
      },
      metadata: {
        standardLower: 0.8,
        standardUpper: 1.0,
        unit: ''
      },
      assistantMessage: 'Done. The chart now shows price-related differential analysis.'
    },
    'sales-ratio-chart': {
      title: 'Sales Ratio Analysis',
      type: 'sales-ratio-chart',
      data: {
        labels: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed Use'],
        values: [0.95, 0.88, 1.02, 0.92, 0.97],
        colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']
      },
      metadata: {
        standardLower: 0.9,
        standardUpper: 1.1,
        unit: ''
      },
      assistantMessage: 'Done. The chart now shows sales ratio analysis by property type.'
    },
    'sales-map-chart': {
      title: 'Sales Ratio Map',
      type: 'sales-map-chart',
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
      },
      assistantMessage: 'Done. The map now shows sales ratios by neighborhood.'
    },
    'property-trends-chart': {
      title: 'Property Value Trends',
      type: 'property-trends-chart',
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
      },
      assistantMessage: 'Done. The chart now shows property value trends over time.'
    }
  },
  queryMatching: {
    'coefficient-dispersion-chart': ['cod', 'coefficient', 'dispersion'],
    'prd-analysis-chart': ['price-related', 'prd', 'differential'],
    'sales-ratio-chart': ['sales ratio', 'sales ratios'],
    'sales-map-chart': ['map', 'geographic', 'neighborhood', 'location'],
    'property-trends-chart': ['trend', 'time', 'temporal', 'over time']
  },
  standards: {
    coefficientOfDispersion: {
      lower: 6,
      upper: 12,
      unit: '%',
      description: 'Industry standard for assessment uniformity'
    },
    priceRelatedDifferential: {
      lower: 0.8,
      upper: 1.0,
      unit: '',
      description: 'Ideal range for price-related differential'
    },
    salesRatio: {
      lower: 0.9,
      upper: 1.1,
      unit: '',
      description: 'Acceptable range for sales-to-assessment ratios'
    }
  },
  colorScheme: {
    good: '#10B981',
    average: '#3B82F6', 
    warning: '#F59E0B',
    poor: '#EF4444',
    mixed: '#8B5CF6'
  },
  defaultTiles: [
    { tileId: 'tile-1', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 0, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-2', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 1, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-3', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 2, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-4', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 3, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-5', dashboardId: 'dashboard-1', rowIndex: 1, columnIndex: 0, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-6', dashboardId: 'dashboard-1', rowIndex: 1, columnIndex: 1, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-7', dashboardId: 'dashboard-1', rowIndex: 2, columnIndex: 0, sizeType: 'large' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null }
  ]
};
