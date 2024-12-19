
import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'minimal',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const redis = new Redis(process.env.REDIS_URL || '')

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e.message)
})

export default prisma
