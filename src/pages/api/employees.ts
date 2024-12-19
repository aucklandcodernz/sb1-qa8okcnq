
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, position, department, organizationId } = req.body;

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        position,
        employeeId: `EMP${Date.now()}`,
        organizationId,
        department: {
          connectOrCreate: {
            where: {
              name_organizationId: {
                name: department,
                organizationId
              }
            },
            create: {
              name: department,
              organizationId
            }
          }
        }
      }
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Failed to create employee' });
  }
}
