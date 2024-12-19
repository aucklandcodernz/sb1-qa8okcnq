
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { employeeSchema, employeeSkillSchema } from '../../lib/validations/employee';
import { z } from 'zod';

export async function getEmployees(req: Request, res: Response) {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
        organization: true,
        skills: true,
        history: true,
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
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
      },
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

export async function addEmployeeSkill(req: Request, res: Response) {
  try {
    const { employeeId } = req.params;
    const validatedData = employeeSkillSchema.parse(req.body);
    
    const skill = await prisma.employeeSkill.create({
      data: {
        ...validatedData,
        employeeId,
      },
    });
    res.status(201).json(skill);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to add employee skill' });
    }
  }
}
