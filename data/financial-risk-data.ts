export const financialRiskData = {
  dashboard: {
    dashboardId: 'dashboard-4',
    ownerId: 'user-1',
    dashboardName: 'Custom Dashboard',
    suggestedName: 'Portfolio Risk Management Dashboard',
    layout: [
      ['tile-1', 'tile-2', 'tile-3', 'tile-4'],
      ['tile-5', 'tile-6'],
      ['tile-7']
    ]
  },
  suggestedQueries: {
    small: [
      { query: 'Show portfolio risk exposure', visualizationType: 'portfolio-risk-chart' },
      { query: 'Display market volatility', visualizationType: 'volatility-analysis-chart' },
      { query: 'Show credit risk metrics', visualizationType: 'credit-risk-chart' }
    ],
    medium: [
      { query: 'Show me portfolio risk exposure by asset class for the current quarter', visualizationType: 'portfolio-risk-chart' },
      { query: 'Create a map of regional credit risk exposure', visualizationType: 'risk-distribution-map-chart' },
      { query: 'Display market volatility trends by sector', visualizationType: 'volatility-analysis-chart' }
    ],
    large: [
      { query: 'Show me portfolio risk exposure by asset class for the current quarter', visualizationType: 'portfolio-risk-chart' },
      { query: 'Create a map of regional credit risk exposure', visualizationType: 'risk-distribution-map-chart' },
      { query: 'Display market volatility trends by sector', visualizationType: 'volatility-analysis-chart' },
      { query: 'Generate credit risk assessment over time', visualizationType: 'credit-risk-chart' },
      { query: 'Show regulatory compliance metrics', visualizationType: 'regulatory-compliance-chart' }
    ]
  },
  singleQuery: 'Show portfolio risk exposure',
  visualizationData: {
    'portfolio-risk-chart': {
      title: 'Portfolio Risk Exposure by Asset Class',
      type: 'portfolio-risk-chart',
      data: {
        labels: ['Equities', 'Bonds', 'Real Estate', 'Commodities', 'Alternatives', 'Cash', 'Derivatives', 'International'],
        values: [12.5, 8.2, 15.8, 22.3, 18.7, 3.1, 25.4, 14.2],
        colors: ['#F59E0B', '#10B981', '#EF4444', '#EF4444', '#F59E0B', '#10B981', '#EF4444', '#F59E0B']
      },
      metadata: {
        standardLower: 5.0,
        standardUpper: 15.0,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows portfolio risk exposure by asset class.'
    },
    'volatility-analysis-chart': {
      title: 'Market Volatility by Sector',
      type: 'volatility-analysis-chart',
      data: {
        labels: ['Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer', 'Industrial', 'Utilities', 'Materials'],
        values: [18.5, 12.3, 22.7, 28.9, 15.2, 19.8, 8.4, 24.1],
        colors: ['#F59E0B', '#10B981', '#EF4444', '#EF4444', '#10B981', '#F59E0B', '#10B981', '#EF4444']
      },
      metadata: {
        standardLower: 10.0,
        standardUpper: 20.0,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows market volatility by sector.'
    },
    'credit-risk-chart': {
      title: 'Credit Risk Assessment',
      type: 'credit-risk-chart',
      data: {
        labels: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'D'],
        values: [0.1, 0.3, 0.8, 2.1, 4.5, 8.2, 15.7, 25.3],
        colors: ['#10B981', '#10B981', '#10B981', '#F59E0B', '#F59E0B', '#EF4444', '#EF4444', '#EF4444']
      },
      metadata: {
        standardLower: 0.5,
        standardUpper: 3.0,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows credit risk assessment by rating.'
    },
    'risk-distribution-map-chart': {
      title: 'Regional Credit Risk Exposure Map',
      type: 'risk-distribution-map-chart',
      data: {
        locations: [
          { name: 'North America', lat: 45.0, lng: -100.0, value: 8.5, category: 'Good' },
          { name: 'Europe', lat: 50.0, lng: 10.0, value: 12.3, category: 'Average' },
          { name: 'Asia Pacific', lat: 35.0, lng: 105.0, value: 15.7, category: 'Poor' },
          { name: 'Latin America', lat: -15.0, lng: -60.0, value: 22.1, category: 'Poor' },
          { name: 'Middle East', lat: 25.0, lng: 45.0, value: 18.9, category: 'Poor' },
          { name: 'Africa', lat: 0.0, lng: 20.0, value: 25.4, category: 'Poor' },
          { name: 'Oceania', lat: -25.0, lng: 135.0, value: 6.8, category: 'Good' },
          { name: 'Caribbean', lat: 20.0, lng: -75.0, value: 19.2, category: 'Poor' }
        ]
      },
      metadata: {
        standardLower: 5.0,
        standardUpper: 15.0,
        unit: '%'
      },
      assistantMessage: 'Done. The map now shows regional credit risk exposure.'
    },
    'regulatory-compliance-chart': {
      title: 'Regulatory Compliance Metrics',
      type: 'regulatory-compliance-chart',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Basel III Compliance',
            values: [98.5, 99.1, 97.8, 99.3, 98.9, 99.5, 98.2, 99.7, 99.1, 99.4, 98.8, 99.6]
          },
          {
            label: 'SOX Compliance',
            values: [96.2, 97.1, 95.8, 97.5, 96.9, 98.1, 96.5, 97.8, 97.2, 98.3, 97.1, 98.7]
          }
        ]
      },
      metadata: {
        standardLower: 0,
        standardUpper: 0,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows regulatory compliance metrics over time.'
    }
  },
  queryMatching: {
    'portfolio-risk-chart': ['risk', 'exposure', 'portfolio', 'asset'],
    'volatility-analysis-chart': ['volatility', 'market', 'sector', 'variance'],
    'credit-risk-chart': ['credit', 'risk', 'rating', 'default'],
    'risk-distribution-map-chart': ['regional', 'map', 'geographic', 'territory'],
    'regulatory-compliance-chart': ['compliance', 'regulatory', 'basel', 'sox']
  },
  standards: {
    riskExposure: {
      lower: 5.0,
      upper: 15.0,
      unit: '%',
      description: 'Target risk exposure range per asset class'
    },
    marketVolatility: {
      lower: 10.0,
      upper: 20.0,
      unit: '%',
      description: 'Acceptable market volatility range'
    },
    creditRisk: {
      lower: 0.5,
      upper: 3.0,
      unit: '%',
      description: 'Target credit risk default rate'
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
    { tileId: 'tile-1', dashboardId: 'dashboard-4', rowIndex: 0, columnIndex: 0, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-2', dashboardId: 'dashboard-4', rowIndex: 0, columnIndex: 1, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-3', dashboardId: 'dashboard-4', rowIndex: 0, columnIndex: 2, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-4', dashboardId: 'dashboard-4', rowIndex: 0, columnIndex: 3, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-5', dashboardId: 'dashboard-4', rowIndex: 1, columnIndex: 0, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-6', dashboardId: 'dashboard-4', rowIndex: 1, columnIndex: 1, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-7', dashboardId: 'dashboard-4', rowIndex: 2, columnIndex: 0, sizeType: 'large' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null }
  ]
};
