
import { prisma } from './db';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();