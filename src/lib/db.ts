
import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'

const prismaClientConfig = {
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'warn', emit: 'event' }
  ],
  connectionLimit: 20
}

export const prisma = new PrismaClient(prismaClientConfig)

export const redis = new Redis(process.env.REDIS_URL || '')

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e.message)
})

export default prisma
