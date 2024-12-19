
import { PrismaClient } from '@prisma/client'

const prismaClientConfig = {
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'warn', emit: 'event' }
  ],
}

const prisma = new PrismaClient(prismaClientConfig)

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e.message)
})

export default prisma
