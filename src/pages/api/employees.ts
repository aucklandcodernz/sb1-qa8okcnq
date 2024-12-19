
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware, AuthenticatedRequest } from '../../lib/middleware/authMiddleware';
import { handleDatabaseError } from '../../lib/middleware/errorHandler';

const prisma = new PrismaClient();

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  try {
    await authMiddleware(req, res, async () => {
      if (req.method === 'POST') {
        const { firstName, lastName, email, position, department, organizationId } = req.body;

        if (!firstName || !lastName || !email || !position || !department || !organizationId) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields'
          });
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
              create: {
                name: department,
                organizationId
              }
            }
          },
          include: {
            department: true
          }
        });

        return res.status(201).json({
          success: true,
          data: employee
        });
      }

      return res.status(405).json({ success: false, message: 'Method not allowed' });
    });
  } catch (error) {
    const handledError = handleDatabaseError(error);
    console.error('API Error:', handledError);
    return res.status(500).json({
      success: false,
      message: handledError.message || 'Internal server error'
    });
  }
}
