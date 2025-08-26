import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DASHBOARD_FILE = path.join(DATA_DIR, 'dashboard.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Read dashboard data
async function readDashboard() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DASHBOARD_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Return default dashboard if file doesn't exist
    return {
      dashboard: {
        dashboardId: 'dashboard-1',
        ownerId: 'user-1',
        dashboardName: 'Annual Assessment Uniformity Audit',
        layout: [
          ['tile-1', 'tile-2', 'tile-3', 'tile-4'],
          ['tile-5', 'tile-6'],
          ['tile-7']
        ]
      },
      tiles: [
        { tileId: 'tile-1', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 0, sizeType: 'small', tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
        { tileId: 'tile-2', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 1, sizeType: 'small', tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
        { tileId: 'tile-3', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 2, sizeType: 'small', tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
        { tileId: 'tile-4', dashboardId: 'dashboard-1', rowIndex: 0, columnIndex: 3, sizeType: 'small', tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
        { tileId: 'tile-5', dashboardId: 'dashboard-1', rowIndex: 1, columnIndex: 0, sizeType: 'medium', tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
        { tileId: 'tile-6', dashboardId: 'dashboard-1', rowIndex: 1, columnIndex: 1, sizeType: 'medium', tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
        { tileId: 'tile-7', dashboardId: 'dashboard-1', rowIndex: 2, columnIndex: 0, sizeType: 'large', tileTitle: null, visualizationFunction: null, chatSummary: null, cacheId: null, isPopulated: false, isLoading: false, error: null },
      ]
    };
  }
}

// Write dashboard data
async function writeDashboard(data: any) {
  await ensureDataDir();
  await fs.writeFile(DASHBOARD_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const dashboard = await readDashboard();
    return NextResponse.json(dashboard);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await writeDashboard(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save dashboard' }, { status: 500 });
  }
}
