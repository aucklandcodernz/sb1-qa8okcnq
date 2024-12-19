
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  console.log('Seeded test data successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create test users
  const testUsers = [
    { email: 'super-admin@test.com', name: 'Super Admin', role: 'super-admin' },
    { email: 'org-admin@test.com', name: 'Org Admin', role: 'org-admin' },
    { email: 'hr-manager@test.com', name: 'HR Manager', role: 'hr-manager' },
    { email: 'dept-manager@test.com', name: 'Dept Manager', role: 'dept-manager' },
    { email: 'supervisor@test.com', name: 'Supervisor', role: 'supervisor' },
    { email: 'employee@test.com', name: 'Employee', role: 'employee' }
  ]

  for (const user of testUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Seed organizations
  const org = await prisma.organization.create({
    data: {
      name: 'Test Organization',
      users: {
        create: [{
          email: 'admin@test.com',
          name: 'Admin User',
          role: 'ADMIN'
        }]
      },
      departments: {
        create: [{
          name: 'HR Department'
        }]
      }
    }
  })

  // Seed employees
  await prisma.employee.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      organizationId: org.id,
      departmentId: org.departments[0].id
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
