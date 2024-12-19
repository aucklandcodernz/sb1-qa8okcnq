
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';
import { employeeUpdateSchema } from '../../../lib/validations/employee';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const employee = await prisma.employee.findUnique({
        where: { id: String(id) },
        include: { skillAssessments: true }
      });
      
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      
      return res.json(employee);
    }

    if (req.method === 'PUT') {
      const validatedData = employeeUpdateSchema.parse(req.body);
      
      const employee = await prisma.employee.update({
        where: { id: String(id) },
        data: {
          ...validatedData,
          version: { increment: 1 },
          updatedAt: new Date(),
        },
        include: { skillAssessments: true }
      });
      
      return res.json(employee);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
