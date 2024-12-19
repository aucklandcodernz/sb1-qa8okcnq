
import { Request, Response } from 'express';
import { prisma } from '../../../lib/db';
import { employeeSchema } from '../../../lib/validations/employee';
import { z } from 'zod';

export async function updateEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedData = employeeSchema.partial().parse(req.body);
    const userId = req.headers['user-id'] as string;

    const [auditLog, employee] = await prisma.$transaction([
      prisma.auditLog.create({
        data: {
          employeeId: id,
          action: 'UPDATE',
          details: validatedData,
          performedBy: userId
        }
      }),
      prisma.employee.update({
        where: { id },
        data: {
          ...validatedData,
          lastModifiedBy: userId,
        }
      })
    ]);

    res.json({ employee, auditLog });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to update employee' });
    }
  }
}
