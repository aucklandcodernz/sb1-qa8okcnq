
import { prisma } from './db';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
    
    // Test query
    const orgs = await prisma.organization.findMany();
    console.log('Found organizations:', orgs.length);
    
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
