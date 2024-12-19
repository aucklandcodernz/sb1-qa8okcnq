
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient,
  pool: Pool 
}

// Initialize Prisma with error handling
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'pretty',
});

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

testConnection();

// Initialize connection pool
const pool = globalForPrisma.pool || new Pool({
  connectionString: process.env.DATABASE_URL?.replace('.us-east-2', '-pooler.us-east-2'),
  max: 10
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.pool = pool
}

export { pool }
export default prisma
