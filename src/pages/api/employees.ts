
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { employeeSchema, statusHistorySchema } from '../../lib/validations/employee';
import { z } from 'zod';

export async function updateEmployeeStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedData = statusHistorySchema.parse(req.body);
    
    const [statusHistory, employee] = await prisma.$transaction([
      prisma.employeeStatusHistory.create({
        data: {
          employeeId: id,
          ...validatedData
        }
      }),
      prisma.employee.update({
        where: { id },
        data: {
          status: validatedData.status,
          lastStatusUpdate: new Date()
        }
      })
    ]);
    
    res.json({ statusHistory, employee });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to update employee status' });
    }
  }
}
