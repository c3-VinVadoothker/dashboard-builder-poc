# Demo Data Configuration

This directory contains the centralized demo data for the dashboard builder application.

## Files

- `demo-data.ts` - Main configuration file containing all hardcoded data
- `dashboard.json` - Runtime dashboard state (auto-generated)

## Demo Data Structure

The `demo-data.ts` file contains:

### Dashboard Configuration
- Dashboard name, ID, and layout structure
- Default tile configuration

### Suggested Queries
- Small, medium, and large tile query suggestions
- Each query explicitly linked to its visualization type
- Organized by tile size for contextual recommendations

### Visualization Data
- Mock data for all visualization types:
  - Coefficient of Dispersion (COD)
  - Price-Related Differential (PRD)
  - Sales Ratio Analysis
  - Sales Ratio Map (geographic)
  - Property Value Trends

### Query Matching Rules
- Keywords that trigger specific visualization types
- Flexible matching system for natural language queries

### Standards & Compliance
- Industry standards for assessment uniformity
- Threshold values for different metrics

### Color Scheme
- Professional color palette for visualizations
- Consistent branding across all charts

## Creating New Demos

To create a new demo scenario:

1. **Update Dashboard Name**: Change `dashboardName` in the dashboard object
2. **Modify Suggested Queries**: Update the `suggestedQueries` object with new prompts
3. **Add New Visualizations**: Extend `visualizationData` with new chart types
4. **Update Query Matching**: Add new keywords to `queryMatching` rules
5. **Customize Standards**: Modify `standards` for different compliance requirements
6. **Change Color Scheme**: Update `colorScheme` for different branding

## Example: Creating a Real Estate Demo

```typescript
// Change dashboard name
dashboardName: 'Real Estate Market Analysis'

// Add new suggested queries with explicit visualization links
suggestedQueries: {
  small: [
    { query: 'Show median home prices', visualizationType: 'home-prices' },
    { query: 'Display market trends', visualizationType: 'market-trends' },
    { query: 'Show inventory levels', visualizationType: 'inventory' }
  ],
  // ... etc
}

// Add new visualization data
visualizationData: {
  'home-prices': {
    title: 'Median Home Prices by Neighborhood',
    type: 'bar',
    data: { /* new data */ }
  }
}
```

This centralized approach makes it easy to:
- Switch between different demo scenarios
- Maintain consistency across the application
- Quickly prototype new features
- Customize for different client presentations
