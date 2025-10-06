export const healthcareMetricsData = {
  dashboard: {
    dashboardId: 'dashboard-3',
    ownerId: 'user-1',
    dashboardName: 'Custom Dashboard',
    suggestedName: 'Patient Care Quality Dashboard',
    layout: [
      ['tile-1', 'tile-2', 'tile-3', 'tile-4'],
      ['tile-5', 'tile-6'],
      ['tile-7']
    ]
  },
  suggestedQueries: {
    small: [
      { query: 'Show patient outcomes', visualizationType: 'patient-outcomes-chart' },
      { query: 'Display readmission rates', visualizationType: 'readmission-rates-chart' },
      { query: 'Show treatment effectiveness', visualizationType: 'treatment-effectiveness-chart' }
    ],
    medium: [
      { query: 'Show me patient outcome metrics by department for the last quarter', visualizationType: 'patient-outcomes-chart' },
      { query: 'Create a map of readmission rates by facility', visualizationType: 'facility-readmission-map-chart' },
      { query: 'Display treatment effectiveness scores by specialty', visualizationType: 'treatment-effectiveness-chart' }
    ],
    large: [
      { query: 'Show me patient outcome metrics by department for the last quarter', visualizationType: 'patient-outcomes-chart' },
      { query: 'Create a map of readmission rates by facility', visualizationType: 'facility-readmission-map-chart' },
      { query: 'Display treatment effectiveness scores by specialty', visualizationType: 'treatment-effectiveness-chart' },
      { query: 'Generate patient satisfaction trends over time', visualizationType: 'patient-satisfaction-chart' },
      { query: 'Show resource utilization patterns', visualizationType: 'resource-utilization-chart' }
    ]
  },
  singleQuery: 'Show patient outcomes',
  visualizationData: {
    'patient-outcomes-chart': {
      title: 'Patient Outcome Metrics',
      type: 'patient-outcomes-chart',
      data: {
        labels: ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology', 'Emergency', 'Surgery', 'Pediatrics', 'Internal Medicine'],
        values: [92.5, 88.3, 94.1, 89.7, 85.2, 91.8, 96.2, 87.9],
        colors: ['#10B981', '#10B981', '#10B981', '#10B981', '#F59E0B', '#10B981', '#10B981', '#F59E0B']
      },
      metadata: {
        standardLower: 85.0,
        standardUpper: 95.0,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows patient outcome metrics by department.'
    },
    'readmission-rates-chart': {
      title: 'Readmission Rates by Department',
      type: 'readmission-rates-chart',
      data: {
        labels: ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology', 'Emergency', 'Surgery', 'Pediatrics', 'Internal Medicine'],
        values: [8.2, 12.5, 6.8, 11.3, 15.7, 9.1, 4.2, 13.8],
        colors: ['#10B981', '#F59E0B', '#10B981', '#F59E0B', '#EF4444', '#10B981', '#10B981', '#EF4444']
      },
      metadata: {
        standardLower: 5.0,
        standardUpper: 10.0,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows readmission rates by department.'
    },
    'treatment-effectiveness-chart': {
      title: 'Treatment Effectiveness Scores',
      type: 'treatment-effectiveness-chart',
      data: {
        labels: ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology', 'Emergency', 'Surgery', 'Pediatrics', 'Internal Medicine'],
        values: [4.3, 4.1, 4.5, 4.0, 3.8, 4.4, 4.6, 3.9],
        colors: ['#10B981', '#10B981', '#10B981', '#F59E0B', '#F59E0B', '#10B981', '#10B981', '#F59E0B']
      },
      metadata: {
        standardLower: 4.0,
        standardUpper: 5.0,
        unit: '/5'
      },
      assistantMessage: 'Done. The chart now shows treatment effectiveness scores by specialty.'
    },
    'facility-readmission-map-chart': {
      title: 'Facility Readmission Rate Map',
      type: 'facility-readmission-map-chart',
      data: {
        locations: [
          { name: 'Main Hospital', lat: 40.7589, lng: -73.9851, value: 8.5, category: 'Good' },
          { name: 'North Campus', lat: 40.7614, lng: -73.9776, value: 12.3, category: 'Average' },
          { name: 'South Clinic', lat: 40.7505, lng: -73.9934, value: 6.8, category: 'Excellent' },
          { name: 'East Medical Center', lat: 40.7282, lng: -73.7949, value: 15.2, category: 'Poor' },
          { name: 'West Facility', lat: 40.6892, lng: -74.0445, value: 9.1, category: 'Good' },
          { name: 'Central Hospital', lat: 40.7505, lng: -73.9934, value: 7.4, category: 'Good' },
          { name: 'Specialty Center', lat: 40.7614, lng: -73.9776, value: 5.9, category: 'Excellent' },
          { name: 'Urgent Care', lat: 40.7282, lng: -73.7949, value: 11.7, category: 'Average' }
        ]
      },
      metadata: {
        standardLower: 5.0,
        standardUpper: 10.0,
        unit: '%'
      },
      assistantMessage: 'Done. The map now shows readmission rates by facility.'
    },
    'patient-satisfaction-chart': {
      title: 'Patient Satisfaction Trends',
      type: 'patient-satisfaction-chart',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Overall Satisfaction',
            values: [4.1, 4.2, 4.0, 4.3, 4.1, 4.4, 4.2, 4.3, 4.5, 4.4, 4.3, 4.6]
          },
          {
            label: 'Care Quality',
            values: [4.3, 4.4, 4.2, 4.5, 4.3, 4.6, 4.4, 4.5, 4.7, 4.6, 4.5, 4.8]
          }
        ]
      },
      metadata: {
        standardLower: 0,
        standardUpper: 0,
        unit: '/5'
      },
      assistantMessage: 'Done. The chart now shows patient satisfaction trends over time.'
    },
    'resource-utilization-chart': {
      title: 'Resource Utilization Patterns',
      type: 'resource-utilization-chart',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Bed Occupancy',
            values: [78, 82, 85, 79, 83, 88, 86, 84, 87, 89, 85, 91]
          },
          {
            label: 'Staff Utilization',
            values: [85, 88, 92, 86, 90, 94, 91, 89, 93, 95, 92, 97]
          }
        ]
      },
      metadata: {
        standardLower: 0,
        standardUpper: 0,
        unit: '%'
      },
      assistantMessage: 'Done. The chart now shows resource utilization patterns.'
    }
  },
  queryMatching: {
    'patient-outcomes-chart': ['outcomes', 'patient', 'success', 'recovery'],
    'readmission-rates-chart': ['readmission', 'return', 'readmit', 'rates'],
    'treatment-effectiveness-chart': ['treatment', 'effectiveness', 'therapy', 'intervention'],
    'facility-readmission-map-chart': ['facility', 'map', 'geographic', 'location'],
    'patient-satisfaction-chart': ['satisfaction', 'patient', 'rating', 'experience'],
    'resource-utilization-chart': ['resource', 'utilization', 'capacity', 'usage']
  },
  standards: {
    patientOutcomes: {
      lower: 85.0,
      upper: 95.0,
      unit: '%',
      description: 'Target patient outcome success rate'
    },
    readmissionRates: {
      lower: 5.0,
      upper: 10.0,
      unit: '%',
      description: 'Acceptable readmission rate range'
    },
    treatmentEffectiveness: {
      lower: 4.0,
      upper: 5.0,
      unit: '/5',
      description: 'Target treatment effectiveness score'
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
    { tileId: 'tile-1', dashboardId: 'dashboard-3', rowIndex: 0, columnIndex: 0, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-2', dashboardId: 'dashboard-3', rowIndex: 0, columnIndex: 1, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-3', dashboardId: 'dashboard-3', rowIndex: 0, columnIndex: 2, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-4', dashboardId: 'dashboard-3', rowIndex: 0, columnIndex: 3, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-5', dashboardId: 'dashboard-3', rowIndex: 1, columnIndex: 0, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-6', dashboardId: 'dashboard-3', rowIndex: 1, columnIndex: 1, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-7', dashboardId: 'dashboard-3', rowIndex: 2, columnIndex: 0, sizeType: 'large' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null }
  ]
};
