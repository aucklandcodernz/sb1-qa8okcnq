
import { prisma } from '../db';

export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

export async function reconnectIfNeeded() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error('Database reconnection failed:', error);
  }
}
