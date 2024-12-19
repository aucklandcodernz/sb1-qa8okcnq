
import { prisma } from '../db';

export interface ProgressItem {
  feature: string;
  status: 'completed' | 'in_progress' | 'pending';
  details: string;
}

export async function checkImplementationProgress(): Promise<ProgressItem[]> {
  const progress: ProgressItem[] = [];
  
  // Database Connection
  try {
    await prisma.$connect();
    progress.push({
      feature: 'Database Connection',
      status: 'completed',
      details: 'PostgreSQL connection established'
    });
  } catch {
    progress.push({
      feature: 'Database Connection',
      status: 'pending',
      details: 'PostgreSQL connection not configured'
    });
  }

  // Schema Migration
  try {
    const migrations = await prisma.$queryRaw`SELECT * FROM _prisma_migrations`;
    progress.push({
      feature: 'Schema Migration',
      status: 'completed',
      details: 'Database schema migrated successfully'
    });
  } catch {
    progress.push({
      feature: 'Schema Migration',
      status: 'pending',
      details: 'Database migrations pending'
    });
  }

  // Core Models
  const models = ['Organization', 'Employee', 'Department', 'Document', 'Attendance', 'Leave'];
  for (const model of models) {
    try {
      const count = await prisma[model.toLowerCase()].count();
      progress.push({
        feature: `${model} Model`,
        status: count > 0 ? 'completed' : 'in_progress',
        details: count > 0 ? `${model} model implemented with data` : `${model} model implemented without data`
      });
    } catch {
      progress.push({
        feature: `${model} Model`,
        status: 'pending',
        details: `${model} model not implemented`
      });
    }
  }

  return progress;
}
