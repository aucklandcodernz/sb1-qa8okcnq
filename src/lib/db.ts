
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'minimal',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e.message)
})

export default prisma
