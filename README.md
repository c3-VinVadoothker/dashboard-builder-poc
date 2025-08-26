# C3.ai Dashboard Builder

A dynamic, interactive dashboard builder with AI-powered visualization creation, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎨 Design & Theming
- **Modern UI**: Clean, minimalist design matching Figma specifications
- **Color Scheme**: Teal/turquoise primary colors with vibrant blue highlights and orange/red accents
- **Responsive Layout**: Dynamic resizing when chat panel opens/closes
- **Thin Sidebar**: Icon-only navigation with hover tooltips

### 📊 Dynamic Dashboard
- **4-2-1 Layout**: Initial layout with 4 small tiles, 2 medium tiles, and 1 large tile
- **Dynamic Tiles**: All tiles are fully dynamic and resizable
- **Drag & Drop**: Move tiles between sections and reorder entire rows
- **Cross-Section Movement**: Tiles automatically resize when moved to different sections

### 🤖 AI Assistant Integration
- **Chat Panel**: Right-side chat interface for creating visualizations
- **Tile Interaction Banner**: Subtle green banner showing which tile is being interacted with
- **Suggested Queries**: Auto-generated query suggestions for quick visualization creation
- **Loading States**: Real-time feedback during visualization generation
- **Error Handling**: Graceful error states with retry options

### 🔄 State Management
- **Persistent Data**: All data stored in JSON file with automatic saving
- **History Tracking**: Undo functionality for all actions
- **Auto-save**: Automatic saving with status indicators
- **Unsaved Changes**: Visual indicators for unsaved changes

### 🎯 Edit & View Modes
- **Edit Mode**: Full interactivity with drag & drop, chat, and tile editing
- **View Mode**: Read-only mode with disabled interactions
- **Mode Toggle**: Easy switching between edit and view modes

### 📱 Interactive Features
- **Row Dragging**: Drag entire rows using the left-side grip handle
- **Tile Dragging**: Drag individual tiles between empty slots
- **Chart/Grid Toggle**: Switch between chart and data grid views
- **Tile Actions**: Refresh, info, and clear tile functionality

### ⚠️ Warning & Error States
- **Loading Indicators**: Spinning loaders during visualization creation
- **Error Messages**: Clear error states with retry options
- **Warning Modals**: Confirmation dialogs for destructive actions
- **Progress Feedback**: Real-time status updates

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dashboard-builder-poc
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating Visualizations
1. Click the "Edit" button to enter edit mode
2. Click on any empty tile to open the AI assistant
3. Type a query or use the suggested queries
4. Wait for the visualization to be generated
5. The tile will automatically populate with the chart

### Managing Tiles
- **Move Tiles**: Drag populated tiles to empty slots
- **Reorder Rows**: Use the left grip handle to drag entire rows
- **Clear Tiles**: Use the trash icon to clear tile content
- **Toggle Views**: Switch between chart and grid views

### Using the Chat Assistant
- **Ask Questions**: Type natural language queries
- **Use Suggestions**: Click on suggested queries for quick results
- **Undo Actions**: Use the undo button to revert changes
- **View Mode**: Chat is disabled in view mode for read-only access

### Data Persistence
- All changes are automatically saved to `data/dashboard.json`
- Auto-save status is shown in the header
- Unsaved changes are indicated with an orange dot

## Project Structure

```
dashboard-builder-poc/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles and theming
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   └── dashboard/         # Dashboard-specific components
├── contexts/              # React contexts
├── data/                  # Data storage
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## API Endpoints

- `GET /api/dashboard` - Load dashboard data
- `PUT /api/dashboard` - Save dashboard data
- `POST /api/visualization` - Generate visualizations

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - UI components
- **Recharts** - Chart library
- **Lucide React** - Icons

## Development

### Key Features Implementation

1. **Dynamic Resizing**: Main content area resizes when chat panel opens/closes
2. **Drag & Drop**: Implemented with HTML5 drag and drop API
3. **State Management**: Custom React context with reducer pattern
4. **Data Persistence**: File-based storage with automatic saving
5. **Error Handling**: Comprehensive error states and recovery options

### Customization

- **Colors**: Update CSS variables in `app/globals.css`
- **Layout**: Modify the initial layout in `contexts/dashboard-context.tsx`
- **Visualizations**: Add new chart types in `components/dashboard/chart.tsx`
- **API**: Extend visualization generation in `app/api/visualization/route.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
