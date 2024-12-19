
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { employeeSchema } from '../../lib/validations/employee';
import { z } from 'zod';

export async function getEmployees(req: Request, res: Response) {
  try {
    const { organizationId, status, departmentId } = req.query;
    
    const employees = await prisma.employee.findMany({
      where: {
        organizationId: organizationId as string,
        status: status as string,
        departmentId: departmentId as string,
      },
      include: {
        department: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        },
        directReports: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        }
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
        manager: true,
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
