
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient,
  pool: Pool 
}

// Initialize Prisma
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error', 'warn'],
})

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
