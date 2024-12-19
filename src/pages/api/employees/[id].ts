
import { Request, Response } from 'express';
import { prisma } from '../../../lib/db';
import { employeeUpdateSchema } from '../../../lib/validations/employee';
import { z } from 'zod';

export async function updateEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedData = employeeUpdateSchema.parse(req.body);
    const userId = req.headers['user-id'] as string;

    const result = await prisma.$transaction(async (tx) => {
      const currentEmployee = await tx.employee.findUnique({
        where: { id },
        select: { version: true }
      });

      if (!currentEmployee) {
        throw new Error('Employee not found');
      }

      if (currentEmployee.version !== validatedData.version) {
        throw new Error('Version mismatch - please refresh and try again');
      }

      const [auditLog, employee] = await Promise.all([
        tx.auditLog.create({
          data: {
            employeeId: id,
            action: 'UPDATE',
            details: validatedData,
            performedBy: userId
          }
        }),
        tx.employee.update({
          where: { 
            id,
            version: validatedData.version
          },
          data: {
            ...validatedData,
            version: {
              increment: 1
            },
            lastModifiedBy: userId
          }
        })
      ]);

      return { employee, auditLog };
    });

    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else if (error.message.includes('Version mismatch')) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update employee' });
    }
  }
}
