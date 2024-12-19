
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { z } from 'zod';

const employeeSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  position: z.string(),
  departmentId: z.string(),
  organizationId: z.string(),
});

export async function getEmployees(req: Request, res: Response) {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
        organization: true,
      },
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
}

export async function createEmployee(req: Request, res: Response) {
  try {
    const validatedData = employeeSchema.parse(req.body);
    const employee = await prisma.employee.create({
      data: validatedData,
      include: {
        department: true,
        organization: true,
      },
    });
    res.status(201).json(employee);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create employee' });
    }
  }
}
