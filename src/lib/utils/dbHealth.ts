
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function checkDatabaseHealth() {
  try {
    // Try to query the database
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', message: 'Database connection successful' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}
