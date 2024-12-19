
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, position, department, organizationId } = req.body;

    if (!firstName || !lastName || !email || !position || !department || !organizationId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

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

    return res.status(201).json({ success: true, data: employee });
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({ success: false, message: 'Failed to create employee' });
  }
}
