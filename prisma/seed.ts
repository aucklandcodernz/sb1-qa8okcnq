
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  });

  // Create a test employee
  await prisma.employee.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      organizationId: org.id,
      departmentId: org.departments[0].id
    }
  });

  console.log('Database seeded successfully');
}

// Execute the seed
main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
