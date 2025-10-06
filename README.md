# Dashboard Builder POC | C3.ai

A proof-of-concept dashboard builder application that allows users to create, edit, and manage interactive data visualizations through a chat-based interface.

## 🚀 Features

- **Interactive Dashboard Creation**: Drag-and-drop interface for building dashboards
- **AI-Powered Visualizations**: Chat-based interface for creating data visualizations
- **Real-time Editing**: Live preview and editing capabilities
- **Undo/Redo System**: Full history management for all changes
- **Responsive Design**: Works on desktop and mobile devices
- **Multiple Chart Types**: Bar charts, line charts, maps, and more
- **View/Edit Modes**: Toggle between presentation and editing modes

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **State Management**: React Context API with useReducer
- **Charts**: Custom chart components with D3.js
- **Build Tool**: Turbopack (Next.js)

## 📁 Project Structure

```
dashboard-builder-poc/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── dashboard/            # Dashboard CRUD operations
│   │   └── visualization/        # Visualization generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main dashboard page
├── components/                   # React components
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── chart.tsx            # Chart rendering component
│   │   ├── chat-panel.tsx       # AI chat interface
│   │   ├── grid.tsx             # Dashboard grid layout
│   │   ├── header.tsx           # Dashboard header
│   │   ├── sidebar.tsx          # Navigation sidebar
│   │   └── tile.tsx             # Individual dashboard tiles
│   └── ui/                      # Reusable UI components
├── contexts/                     # React contexts
│   └── dashboard-context.tsx    # Main dashboard state management
├── data/                        # Static data and configurations
│   └── dashboard.json           # Initial dashboard data
├── hooks/                       # Custom React hooks
│   └── use-mobile.ts           # Mobile detection hook
└── lib/                         # Utility functions
    └── utils.ts                 # Common utilities
```

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
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### Creating Visualizations

1. **Enter Edit Mode**: Click the "Edit" button in the header
2. **Select a Tile**: Click on any empty tile to open the chat panel
3. **Request a Visualization**: Type natural language requests like:
   - "Show me the Coefficient of Dispersion by property type"
   - "Create a map visualization of sales ratios"
   - "Display Price-Related Differential analysis"
4. **View Results**: The visualization will appear in the selected tile

### Managing Dashboards

- **Drag & Drop**: Reorder tiles by dragging them
- **Row Reordering**: Hover over rows and drag the handle to reorder
- **Undo/Redo**: Use the undo/redo buttons in the header
- **View Mode**: Switch to view mode for presentation

### Supported Queries

The AI assistant supports various types of data visualization requests:

- **Property Analysis**: COD, PRD, sales ratios
- **Geographic Data**: Maps with location-based data
- **Time Series**: Trends over time
- **Comparative Analysis**: Multi-property comparisons

## 🔧 Development

### Key Files to Understand

#### State Management
- `contexts/dashboard-context.tsx`: Main state management with undo/redo functionality
- `components/dashboard/grid.tsx`: Grid layout and drag-and-drop logic
- `components/dashboard/chat-panel.tsx`: AI chat interface

#### Visualization System
- `components/dashboard/chart.tsx`: Chart rendering component
- `app/api/visualization/route.ts`: API for generating visualizations
- `components/dashboard/tile.tsx`: Individual tile component

#### UI Components
- `components/dashboard/header.tsx`: Header with edit/view toggle
- `components/dashboard/sidebar.tsx`: Navigation sidebar
- `components/ui/`: Reusable UI components

### Adding New Features

#### Adding a New Chart Type

1. **Update API Route** (`app/api/visualization/route.ts`):
   ```typescript
   'new-chart-type': {
     title: 'New Chart Title',
     type: 'new-type',
     data: { /* chart data */ },
     metadata: { /* chart metadata */ }
   }
   ```

2. **Update Chart Component** (`components/dashboard/chart.tsx`):
   ```typescript
   case 'new-type':
     return <NewChartComponent data={data} metadata={metadata} />;
   ```

#### Adding New Query Types

1. **Update Query Detection** (`app/api/visualization/route.ts`):
   ```typescript
   if (query.toLowerCase().includes('new-query-type')) {
     visualizationType = 'new-chart-type';
   }
   ```

### Code Style

- **TypeScript**: Strict typing throughout
- **Components**: Functional components with hooks
- **State**: Context API with useReducer for complex state
- **Styling**: Tailwind CSS classes
- **Icons**: Lucide React icons

## 🧪 Testing

### Manual Testing Checklist

- [ ] Create visualizations through chat
- [ ] Drag and drop tiles
- [ ] Reorder rows
- [ ] Undo/redo functionality
- [ ] Switch between edit/view modes
- [ ] Responsive design on mobile
- [ ] Error handling for failed requests

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

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Common Issues

**Build Errors**
- Ensure Node.js version is 18+
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`

**Visualization Not Loading**
- Check browser console for errors
- Verify API routes are working
- Check network tab for failed requests

**Undo/Redo Not Working**
- Ensure you're in edit mode
- Check that actions are being saved to history
- Verify state management is working correctly

### Getting Help

- Check the browser console for error messages
- Review the network tab for API failures
- Examine the React DevTools for state issues

## 📊 Performance

- **Bundle Size**: Optimized with Next.js and Turbopack
- **Loading**: Lazy loading for chart components
- **State**: Efficient state management with Context API
- **Rendering**: Optimized re-renders with React.memo where needed

---


