export const c3AiReliabilityData = {
  dashboard: {
    dashboardId: 'dashboard-5',
    ownerId: 'user-1',
    dashboardName: 'Custom Dashboard',
    suggestedName: 'Critical Equipment Alert Triage Dashboard',
    layout: [
      ['tile-1', 'tile-2', 'tile-3', 'tile-4'],
      ['tile-5', 'tile-6'],
      ['tile-7']
    ]
  },
  suggestedQueries: {
    small: [
      { query: 'Show vibration severity trend', visualizationType: 'vibration-severity-chart' },
      { query: 'Display process variables', visualizationType: 'process-variables-chart' },
      { query: 'Show historical alerts', visualizationType: 'historical-alerts-chart' }
    ],
    medium: [
      { query: 'Show me the vibration severity trend for the hydrocracker compressor over the last 72 hours', visualizationType: 'vibration-severity-chart' },
      { query: 'Overlay motor current and upstream suction pressure for the same time period', visualizationType: 'process-variables-chart' },
      { query: 'Show me similar alerts on this compressor over the past 5 years, grouped by failure mode', visualizationType: 'historical-alerts-chart' }
    ],
    large: [
      { query: 'Create a comprehensive equipment health dashboard showing vibration trends, process variables, historical alerts, maintenance history, SOP compliance status, and predicted time-to-failure with recommended repair actions for the hydrocracker compressor', visualizationType: 'vibration-severity-chart' }
    ]
  },
  singleQuery: 'Show vibration severity trend',
  queryMatching: {
    'vibration-severity-chart': ['vibration', 'severity', 'trend', 'equipment'],
    'process-variables-chart': ['process', 'motor', 'pressure', 'current', 'variables'],
    'historical-alerts-chart': ['historical', 'alerts', 'failure', 'past', 'similar'],
    'maintenance-history-chart': ['maintenance', 'repair', 'work order', 'sap', 'history'],
    'sop-compliance-chart': ['sop', 'compliance', 'manual', 'procedure', 'shift'],
    'failure-prediction-chart': ['prediction', 'time-to-failure', 'recommendation', 'forecast']
  },
  visualizationData: {
    'vibration-severity-chart': {
      title: 'Vibration Severity Trend',
      description: 'Real-time vibration severity analysis for hydrocracker compressor',
      type: 'vibration-severity-chart',
      assistantMessage: 'The vibration severity trend shows a significant increase over the past 24 hours, indicating potential bearing wear. The trend is consistent with historical failure patterns for this equipment type.',
      data: {
        timeRange: '72 hours',
        equipment: 'Hydrocracker Compressor C-101',
        severityLevels: [
          { time: '2024-01-15T00:00:00Z', severity: 2.1, status: 'Normal' },
          { time: '2024-01-15T06:00:00Z', severity: 2.3, status: 'Normal' },
          { time: '2024-01-15T12:00:00Z', severity: 2.8, status: 'Caution' },
          { time: '2024-01-15T18:00:00Z', severity: 3.2, status: 'Warning' },
          { time: '2024-01-16T00:00:00Z', severity: 3.8, status: 'Warning' },
          { time: '2024-01-16T06:00:00Z', severity: 4.2, status: 'Critical' },
          { time: '2024-01-16T12:00:00Z', severity: 4.6, status: 'Critical' },
          { time: '2024-01-16T18:00:00Z', severity: 5.1, status: 'Critical' },
          { time: '2024-01-17T00:00:00Z', severity: 5.4, status: 'Critical' },
          { time: '2024-01-17T06:00:00Z', severity: 5.8, status: 'Critical' }
        ],
        thresholds: {
          normal: 2.5,
          caution: 3.0,
          warning: 4.0,
          critical: 5.0
        }
      }
    },
    'process-variables-chart': {
      title: 'Process Variables Overlay',
      description: 'Motor current and suction pressure correlation with vibration',
      type: 'process-variables-chart',
      assistantMessage: 'Motor current shows a 15% increase correlating with vibration severity. Suction pressure remains stable, indicating the issue is mechanical rather than process-related.',
      data: {
        timeRange: '72 hours',
        variables: [
          {
            name: 'Motor Current',
            unit: 'Amps',
            data: [
              { time: '2024-01-15T00:00:00Z', value: 245 },
              { time: '2024-01-15T06:00:00Z', value: 248 },
              { time: '2024-01-15T12:00:00Z', value: 252 },
              { time: '2024-01-15T18:00:00Z', value: 258 },
              { time: '2024-01-16T00:00:00Z', value: 265 },
              { time: '2024-01-16T06:00:00Z', value: 272 },
              { time: '2024-01-16T12:00:00Z', value: 278 },
              { time: '2024-01-16T18:00:00Z', value: 285 },
              { time: '2024-01-17T00:00:00Z', value: 290 },
              { time: '2024-01-17T06:00:00Z', value: 295 }
            ]
          },
          {
            name: 'Suction Pressure',
            unit: 'PSI',
            data: [
              { time: '2024-01-15T00:00:00Z', value: 125 },
              { time: '2024-01-15T06:00:00Z', value: 124 },
              { time: '2024-01-15T12:00:00Z', value: 126 },
              { time: '2024-01-15T18:00:00Z', value: 125 },
              { time: '2024-01-16T00:00:00Z', value: 127 },
              { time: '2024-01-16T06:00:00Z', value: 125 },
              { time: '2024-01-16T12:00:00Z', value: 126 },
              { time: '2024-01-16T18:00:00Z', value: 124 },
              { time: '2024-01-17T00:00:00Z', value: 125 },
              { time: '2024-01-17T06:00:00Z', value: 126 }
            ]
          }
        ]
      }
    },
    'historical-alerts-chart': {
      title: 'Historical Alerts by Failure Mode',
      description: 'Past 5 years of similar alerts grouped by failure type',
      type: 'historical-alerts-chart',
      assistantMessage: 'Historical analysis shows 12 similar alerts in the past 5 years. 67% were bearing-related failures, with an average time-to-failure of 48 hours after reaching critical severity.',
      data: {
        timeRange: '5 years',
        totalAlerts: 12,
        failureModes: [
          {
            mode: 'Bearing Wear',
            count: 8,
            percentage: 67,
            avgTimeToFailure: '48 hours',
            lastOccurrence: '2023-08-15',
            severity: 'High'
          },
          {
            mode: 'Seal Failure',
            count: 2,
            percentage: 17,
            avgTimeToFailure: '72 hours',
            lastOccurrence: '2022-11-03',
            severity: 'Medium'
          },
          {
            mode: 'Imbalance',
            count: 1,
            percentage: 8,
            avgTimeToFailure: '24 hours',
            lastOccurrence: '2023-03-22',
            severity: 'High'
          },
          {
            mode: 'Misalignment',
            count: 1,
            percentage: 8,
            avgTimeToFailure: '96 hours',
            lastOccurrence: '2021-09-14',
            severity: 'Low'
          }
        ],
        recentAlerts: [
          { date: '2023-08-15', mode: 'Bearing Wear', severity: 'Critical', resolved: '2023-08-17' },
          { date: '2023-03-22', mode: 'Imbalance', severity: 'Critical', resolved: '2023-03-23' },
          { date: '2022-11-03', mode: 'Seal Failure', severity: 'Warning', resolved: '2022-11-06' }
        ]
      }
    },
    'maintenance-history-chart': {
      title: 'Maintenance History & SAP Work Orders',
      description: 'Past repair records, duration, and parts used',
      type: 'maintenance-history-chart',
      assistantMessage: 'SAP records show 3 bearing replacements in the past 5 years. Average repair duration is 18 hours. Part #X123 (Bearing Assembly) is currently in stock.',
      data: {
        totalWorkOrders: 15,
        recentRepairs: [
          {
            workOrder: 'WO-2023-0847',
            date: '2023-08-17',
            type: 'Bearing Replacement',
            duration: '16 hours',
            parts: ['X123 - Bearing Assembly', 'X456 - Seal Kit'],
            crew: 'Maintenance Team A',
            cost: '$12,500',
            status: 'Completed'
          },
          {
            workOrder: 'WO-2023-0323',
            date: '2023-03-23',
            type: 'Rotor Balancing',
            duration: '8 hours',
            parts: ['X789 - Balance Weights'],
            crew: 'Maintenance Team B',
            cost: '$3,200',
            status: 'Completed'
          },
          {
            workOrder: 'WO-2022-1106',
            date: '2022-11-06',
            type: 'Seal Replacement',
            duration: '12 hours',
            parts: ['X456 - Seal Kit', 'X321 - Gasket Set'],
            crew: 'Maintenance Team A',
            cost: '$8,900',
            status: 'Completed'
          }
        ],
        partsInventory: [
          { partNumber: 'X123', description: 'Bearing Assembly', quantity: 2, status: 'In Stock' },
          { partNumber: 'X456', description: 'Seal Kit', quantity: 5, status: 'In Stock' },
          { partNumber: 'X789', description: 'Balance Weights', quantity: 1, status: 'Low Stock' }
        ],
        avgRepairDuration: '18 hours',
        totalMaintenanceCost: '$24,600'
      }
    },
    'sop-compliance-chart': {
      title: 'SOP Compliance & Operator Logs',
      description: 'Standard operating procedure compliance and shift log notes',
      type: 'sop-compliance-chart',
      assistantMessage: 'All current procedures are SOP-compliant. Shift logs from similar events show successful load reduction workarounds. Manual procedures are up-to-date and accessible.',
      data: {
        complianceStatus: 'Compliant',
        sopChecks: [
          { procedure: 'Critical Equipment Response', status: 'Compliant', lastUpdated: '2024-01-10' },
          { procedure: 'Vibration Monitoring', status: 'Compliant', lastUpdated: '2024-01-05' },
          { procedure: 'Emergency Shutdown', status: 'Compliant', lastUpdated: '2024-01-08' },
          { procedure: 'Load Reduction Protocol', status: 'Compliant', lastUpdated: '2024-01-12' }
        ],
        shiftLogs: [
          {
            date: '2023-08-16',
            shift: 'Day Shift',
            operator: 'J. Smith',
            notes: 'Reduced load by 20% as per SOP. Vibration decreased from 5.2 to 4.1. Bearing replacement scheduled for next day.',
            actions: ['Load Reduction', 'Monitoring', 'Work Order Created']
          },
          {
            date: '2023-03-22',
            shift: 'Night Shift',
            operator: 'M. Johnson',
            notes: 'Imbalance detected. Emergency shutdown initiated. Rotor balancing completed within 8 hours.',
            actions: ['Emergency Shutdown', 'Rotor Balancing', 'Restart']
          }
        ],
        manualReferences: [
          { title: 'Equipment Manual - Hydrocracker Compressor', version: 'v2.1', accessible: true },
          { title: 'Maintenance Procedures - Bearing Replacement', version: 'v1.8', accessible: true },
          { title: 'Emergency Response Guidelines', version: 'v3.0', accessible: true }
        ]
      }
    },
    'failure-prediction-chart': {
      title: 'Failure Prediction & Recommendations',
      description: 'Predicted time-to-failure and recommended repair actions',
      type: 'failure-prediction-chart',
      assistantMessage: 'Based on current vibration trends and historical data, predicted time-to-failure is 48 hours. Recommended action: Replace bearing (Part #X123, in stock). Optional workaround: Reduce load by 20%.',
      data: {
        predictedTimeToFailure: '48 hours',
        confidence: 85,
        failureMode: 'Bearing Wear',
        riskLevel: 'High',
        recommendations: [
          {
            action: 'Replace Bearing',
            priority: 'High',
            partNumber: 'X123',
            partDescription: 'Bearing Assembly',
            stockStatus: 'In Stock',
            estimatedDuration: '16 hours',
            cost: '$12,500',
            sopCompliant: true
          },
          {
            action: 'Load Reduction Workaround',
            priority: 'Medium',
            description: 'Reduce load by 20% to extend equipment life',
            estimatedDuration: '2 hours',
            cost: '$0',
            sopCompliant: true,
            effectiveness: 'Temporary (24-48 hours)'
          }
        ],
        riskFactors: [
          { factor: 'Vibration Severity', level: 'Critical', impact: 'High' },
          { factor: 'Motor Current Increase', level: 'Warning', impact: 'Medium' },
          { factor: 'Historical Pattern Match', level: 'High', impact: 'High' },
          { factor: 'Parts Availability', level: 'Good', impact: 'Low' }
        ],
        nextSteps: [
          'Create SAP work order for bearing replacement',
          'Notify maintenance crew (Team A)',
          'Implement load reduction workaround if needed',
          'Schedule equipment shutdown window',
          'Prepare replacement parts and tools'
        ]
      }
    }
  },
  defaultTiles: [
    { tileId: 'tile-1', dashboardId: 'dashboard-5', rowIndex: 0, columnIndex: 0, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-2', dashboardId: 'dashboard-5', rowIndex: 0, columnIndex: 1, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-3', dashboardId: 'dashboard-5', rowIndex: 0, columnIndex: 2, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-4', dashboardId: 'dashboard-5', rowIndex: 0, columnIndex: 3, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-5', dashboardId: 'dashboard-5', rowIndex: 1, columnIndex: 0, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-6', dashboardId: 'dashboard-5', rowIndex: 1, columnIndex: 1, sizeType: 'medium' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
    { tileId: 'tile-7', dashboardId: 'dashboard-5', rowIndex: 2, columnIndex: 0, sizeType: 'large' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null }
  ]
};
