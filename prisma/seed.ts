
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create test organization
  const org = await prisma.organization.create({
    data: {
      name: 'Test Organization',
      departments: {
        create: [
          { name: 'HR' },
          { name: 'Engineering' }
        ]
      }
    }
  })

  console.log('Seeded test data successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
