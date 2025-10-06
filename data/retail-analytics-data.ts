export const retailAnalyticsData = {
  dashboard: {
    dashboardId: 'dashboard-2',
    ownerId: 'user-1',
    dashboardName: 'Custom Dashboard',
    suggestedName: 'Q4 Retail Performance Analysis',
    layout: [
      ['tile-1', 'tile-2', 'tile-3', 'tile-4'],
      ['tile-5', 'tile-6'],
      ['tile-7']
    ]
  },
  suggestedQueries: {
    small: [
      { query: 'Show sales by store', visualizationType: 'store-sales-chart' },
      { query: 'Display inventory levels', visualizationType: 'inventory-levels-chart' },
      { query: 'Show customer satisfaction', visualizationType: 'customer-satisfaction-chart' }
    ],
    medium: [
      { query: 'Show me sales performance by store location for Q4', visualizationType: 'store-sales-chart' },
      { query: 'Create a map of regional sales performance', visualizationType: 'regional-sales-map-chart' },
      { query: 'Display inventory turnover rates by category', visualizationType: 'inventory-levels-chart' }
    ],
    large: [
      { query: 'Show me sales performance by store location for Q4', visualizationType: 'store-sales-chart' },
      { query: 'Create a map of regional sales performance', visualizationType: 'regional-sales-map-chart' },
      { query: 'Display inventory turnover rates by category', visualizationType: 'inventory-levels-chart' },
      { query: 'Generate customer satisfaction trends over time', visualizationType: 'customer-satisfaction-chart' },
      { query: 'Show seasonal sales patterns', visualizationType: 'seasonal-trends-chart' }
    ]
  },
  singleQuery: 'Show sales by store',
  visualizationData: {
    'store-sales-chart': {
      title: 'Store Sales Performance',
      type: 'store-sales-chart',
      data: {
        labels: ['Downtown', 'Mall', 'Outlet', 'Airport', 'Suburban', 'Online', 'Pop-up', 'Flagship'],
        values: [125000, 98000, 87000, 156000, 112000, 234000, 45000, 189000],
        colors: ['#10B981', '#10B981', '#F59E0B', '#10B981', '#10B981', '#10B981', '#EF4444', '#10B981']
      },
      metadata: {
        standardLower: 80000,
        standardUpper: 150000,
        unit: '$'
      },
      assistantMessage: 'Done. The chart now shows store sales performance by location.'
    },
    'inventory-levels-chart': {
      title: 'Inventory Turnover Rates',
      type: 'inventory-levels-chart',
      data: {
        labels: ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'],
        values: [4.2, 6.8, 3.1, 5.5, 2.9, 7.2, 8.1, 2.3],
        colors: ['#10B981', '#10B981', '#F59E0B', '#10B981', '#EF4444', '#10B981', '#10B981', '#EF4444']
      },
      metadata: {
        standardLower: 4.0,
        standardUpper: 6.0,
        unit: 'x'
      },
      assistantMessage: 'Done. The chart now shows inventory turnover rates by category.'
    },
    'customer-satisfaction-chart': {
      title: 'Customer Satisfaction Scores',
      type: 'customer-satisfaction-chart',
      data: {
        labels: ['Service', 'Product Quality', 'Store Layout', 'Checkout Speed', 'Staff Knowledge'],
        values: [4.2, 4.5, 3.8, 4.1, 4.3],
        colors: ['#10B981', '#10B981', '#F59E0B', '#10B981', '#10B981']
      },
      metadata: {
        standardLower: 4.0,
        standardUpper: 5.0,
        unit: '/5'
      },
      assistantMessage: 'Done. The chart now shows customer satisfaction scores by category.'
    },
    'regional-sales-map-chart': {
      title: 'Regional Sales Performance Map',
      type: 'regional-sales-map-chart',
      data: {
        locations: [
          { name: 'North Region', lat: 40.7128, lng: -74.0060, value: 125000, category: 'Good' },
          { name: 'South Region', lat: 33.7490, lng: -84.3880, value: 98000, category: 'Average' },
          { name: 'East Region', lat: 25.7617, lng: -80.1918, value: 156000, category: 'Excellent' },
          { name: 'West Region', lat: 34.0522, lng: -118.2437, value: 112000, category: 'Good' },
          { name: 'Central Region', lat: 41.8781, lng: -87.6298, value: 87000, category: 'Average' },
          { name: 'Northwest Region', lat: 47.6062, lng: -122.3321, value: 134000, category: 'Good' },
          { name: 'Southeast Region', lat: 30.2672, lng: -97.7431, value: 145000, category: 'Good' },
          { name: 'Southwest Region', lat: 33.4484, lng: -112.0740, value: 76000, category: 'Poor' }
        ]
      },
      metadata: {
        standardLower: 100000,
        standardUpper: 150000,
        unit: '$'
      },
      assistantMessage: 'Done. The map now shows regional sales performance.'
    },
    'seasonal-trends-chart': {
      title: 'Seasonal Sales Trends',
      type: 'seasonal-trends-chart',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Physical Stores',
            values: [85000, 92000, 98000, 105000, 112000, 125000, 118000, 108000, 115000, 128000, 145000, 168000]
          },
          {
            label: 'Online Sales',
            values: [125000, 135000, 142000, 138000, 145000, 158000, 162000, 155000, 148000, 165000, 189000, 234000]
          }
        ]
      },
      metadata: {
        standardLower: 0,
        standardUpper: 0,
        unit: '$'
      },
      assistantMessage: 'Done. The chart now shows seasonal sales trends.'
    }
  },
  queryMatching: {
    'store-sales-chart': ['sales', 'store', 'performance', 'revenue'],
    'inventory-levels-chart': ['inventory', 'turnover', 'stock', 'levels'],
    'customer-satisfaction-chart': ['satisfaction', 'customer', 'rating', 'score'],
    'regional-sales-map-chart': ['regional', 'map', 'geographic', 'territory'],
    'seasonal-trends-chart': ['seasonal', 'trend', 'time', 'pattern']
  },
  standards: {
    storeSales: {
      lower: 80000,
      upper: 150000,
      unit: '$',
      description: 'Target monthly sales range per store'
    },
    inventoryTurnover: {
      lower: 4.0,
      upper: 6.0,
      unit: 'x',
      description: 'Ideal inventory turnover rate'
    },
    customerSatisfaction: {
      lower: 4.0,
      upper: 5.0,
      unit: '/5',
      description: 'Target customer satisfaction score'
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
    { tileId: 'tile-1', dashboardId: 'dashboard-2', rowIndex: 0, columnIndex: 0, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-2', dashboardId: 'dashboard-2', rowIndex: 0, columnIndex: 1, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-3', dashboardId: 'dashboard-2', rowIndex: 0, columnIndex: 2, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-4', dashboardId: 'dashboard-2', rowIndex: 0, columnIndex: 3, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-5', dashboardId: 'dashboard-2', rowIndex: 1, columnIndex: 0, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-6', dashboardId: 'dashboard-2', rowIndex: 1, columnIndex: 1, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-7', dashboardId: 'dashboard-2', rowIndex: 2, columnIndex: 0, sizeType: 'large' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null }
  ]
};
