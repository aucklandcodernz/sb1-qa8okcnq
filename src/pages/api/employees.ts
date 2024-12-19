
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { employeeSchema, employeeUpdateSchema } from '../../lib/validations/employee';
import { z } from 'zod';

export async function createEmployee(req: Request, res: Response) {
  try {
    const validatedData = employeeSchema.parse(req.body);
    
    const employee = await prisma.employee.create({
      data: {
        ...validatedData,
        createdById: req.user?.id,
        organization: {
          connect: { id: req.body.organizationId }
        }
      },
      include: {
        department: true,
      }
    });

    await prisma.auditLog.create({
      data: {
        employeeId: employee.id,
        action: 'CREATE',
        details: validatedData,
        performedBy: req.user?.id || 'SYSTEM'
      }
    });
    
    res.status(201).json(employee);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Create employee error:', error);
      res.status(500).json({ error: 'Failed to create employee' });
    }
  }
}
