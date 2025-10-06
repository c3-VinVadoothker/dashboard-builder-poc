# Dashboard Builder Demo | C3.ai

A demo dashboard builder application that allows users to create, edit, and manage interactive data visualizations through a chat-based interface with input system and presentation mode.

## 🚀 Features

- **Interactive Dashboard Creation**: Drag-and-drop interface for building dashboards
- **AI-Powered Visualizations**: Chat-based interface with cycling input for creating data visualizations
- **Presentation Mode**: Full-screen presentation mode with smooth transitions
- **Real-time Editing**: Live preview and editing capabilities
- **Undo/Redo System**: Full history management for all changes
- **Responsive Design**: Works on desktop and mobile devices
- **Multiple Chart Types**: Custom canvas-based charts for different scenarios
- **Scenario-Based**: Multiple industry scenarios with tailored data and visualizations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **State Management**: React Context API with useReducer
- **Charts**: Custom canvas-based chart components
- **Build Tool**: Turbopack (Next.js)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone {URL}
   cd dashboard-builder-poc
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### Creating Visualizations

1. **Select a Scenario**: Choose from the demo scenarios page
2. **Enter Edit Mode**: Click the "Edit" button in the header
3. **Select a Tile**: Click on any empty tile to open the chat panel
4. **Use Cycling Input**: Click the input field to cycle through predefined queries
5. **Send Query**: Click Send or press Enter to generate the visualization
6. **View Results**: The visualization will appear in the selected tile

### Presentation Mode

1. **Click Presentation Icon**: Click the presentation icon in the sidebar
2. **Full-Screen Display**: View the C3 AI logo and scenario title
3. **Exit**: Click anywhere or press Enter/Escape to return to dashboard

### Managing Dashboards

- **Drag & Drop**: Reorder tiles by dragging them
- **Row Reordering**: Hover over rows and drag the handle to reorder
- **Undo/Redo**: Use the undo/redo buttons in the header
- **View Mode**: Switch to view mode for presentation

## 🔧 Development

### Key Files

- `contexts/dashboard-context.tsx`: Main state management with undo/redo functionality
- `components/dashboard/grid.tsx`: Grid layout and drag-and-drop logic
- `components/dashboard/chat-panel.tsx`: AI chat interface with cycling input system
- `components/charts/chart-factory.tsx`: Chart factory for rendering different chart types
- `app/api/visualization/route.ts`: API for generating visualizations
- `data/[scenario]-data.ts`: Scenario-specific data and configurations

## 🚀 Adding New Features

### Creating a New Scenario

1. **Create Scenario Data File** (`data/new-scenario-data.ts`):
   ```typescript
   export const newScenarioData = {
     dashboard: {
       dashboardId: 'dashboard-X',
       ownerId: 'user-1',
       dashboardName: 'Custom Dashboard',
       suggestedName: 'Your Scenario Name',
       layout: [['tile-1', 'tile-2', 'tile-3', 'tile-4']]
     },
     suggestedQueries: {
       small: [{ query: 'Show basic metric', visualizationType: 'basic-chart' }]
     },
     singleQuery: 'Show basic metric',
     visualizationData: {
       'basic-chart': {
         title: 'Basic Chart',
         type: 'basic-chart',
         data: { /* your data */ },
         metadata: { /* metadata */ },
         assistantMessage: 'Done. The chart now shows basic metrics.'
       }
     },
     queryMatching: {
       'basic-chart': ['basic', 'metric', 'data']
     },
     defaultTiles: [
       { tileId: 'tile-1', dashboardId: 'dashboard-X', rowIndex: 0, columnIndex: 0, sizeType: 'small' as const, tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null }
     ]
   };
   ```

2. **Add to Demo Data** (`data/demo-data.ts`):
   ```typescript
   export const scenarios = {
     'new-scenario': {
       id: 'new-scenario',
       title: 'Your Scenario Title',
       subtitle: 'Scenario Subtitle',
       description: 'Description of your scenario',
       icon: '🔧',
       color: 'blue',
       c3Application: 'c3-ai-your-app',
       dashboard: { dashboardId: 'dashboard-X' }
     }
   };
   ```

3. **Update Dashboard Page** (`app/dashboard/page.tsx`):
   ```typescript
   import { newScenarioData } from "@/data/new-scenario-data";
   
   case 'new-scenario':
     setDemoData(newScenarioData);
     break;
   ```

4. **Update API Route** (`app/api/visualization/route.ts`):
   ```typescript
   import { newScenarioData } from '@/data/new-scenario-data';
   
   case 'new-scenario':
     currentDemoData = newScenarioData;
     break;
   ```

### Adding New Chart Types

1. **Create Chart Component** (`components/charts/[scenario]/new-chart.tsx`):
   ```typescript
   import React, { useEffect, useRef } from 'react';

   interface NewChartProps {
     data: any;
     metadata?: any;
     sizeType: 'small' | 'medium' | 'large';
   }

   export function NewChart({ data, metadata, sizeType }: NewChartProps) {
     const canvasRef = useRef<HTMLCanvasElement>(null);

     useEffect(() => {
       const canvas = canvasRef.current;
       if (!canvas || !data) return;

       const ctx = canvas.getContext('2d');
       if (!ctx) return;

       // Set canvas size and render chart
       const rect = canvas.getBoundingClientRect();
       canvas.width = rect.width * window.devicePixelRatio;
       canvas.height = rect.height * window.devicePixelRatio;
       ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

       // Your chart rendering logic here
     }, [data, metadata, sizeType]);

     return (
       <div className="w-full h-full flex flex-col">
         <canvas ref={canvasRef} className="w-full h-full" />
       </div>
     );
   }
   ```

2. **Update Chart Factory** (`components/charts/chart-factory.tsx`):
   ```typescript
   import { NewChart } from './[scenario]/new-chart';
   
   case 'new-chart':
     return <NewChart data={data} metadata={metadata} sizeType={sizeType} />;
   ```

### Chart Development Guidelines

- Use HTML5 Canvas for custom visualizations
- Implement responsive sizing with `devicePixelRatio`
- Handle different `sizeType` values (small, medium, large)
- Include proper error handling for missing data

#### Data Structure
```typescript
interface ChartData {
  labels?: string[];
  values?: number[];
  datasets?: Array<{
    label: string;
    values: number[];
    color?: string;
  }>;
}

interface ChartMetadata {
  standardLower?: number;
  standardUpper?: number;
  unit?: string;
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Create visualizations through cycling input
- [ ] Drag and drop tiles
- [ ] Reorder rows
- [ ] Undo/redo functionality
- [ ] Switch between edit/view modes
- [ ] Presentation mode transitions
- [ ] Responsive design on mobile

### Development Testing

```bash
# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Build for production
pnpm build
```

## 🚀 Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Common Issues

**Build Errors**
- Ensure Node.js version is 18+
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`

**Visualization Not Loading**
- Check browser console for errors
- Verify API routes are working

**Undo/Redo Not Working**
- Ensure you're in edit mode
- Check that actions are being saved to history

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-scenario`
3. **Make your changes**: Follow the guidelines above
4. **Test thoroughly**: Use the testing checklist
5. **Submit a pull request**: Include description of changes

## 📝 License

This project is a demo showcasing C3.ai dashboard building capabilities.
