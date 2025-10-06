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
    // Return default dashboard from demo data if file doesn't exist
    const { demoData } = await import('@/data/demo-data');
    return {
      dashboard: demoData.dashboard,
      tiles: demoData.defaultTiles
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
