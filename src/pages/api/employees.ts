
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { employeeSchema, employeeUpdateSchema } from '../../lib/validations/employee';
import { z } from 'zod';

export async function createEmployee(req: Request, res: Response) {
  try {
    const validatedData = employeeSchema.parse(req.body);
    
    // Check for duplicate email
    const existingEmployee = await prisma.employee.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingEmployee) {
      return res.status(409).json({ error: 'Employee with this email already exists' });
    }

    const employee = await prisma.employee.create({
      data: {
        ...validatedData,
        createdById: req.user?.id,
        version: 1,
      }
    });

    // Create audit log entry
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

export async function updateEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedData = employeeUpdateSchema.parse(req.body);
    
    const currentEmployee = await prisma.employee.findUnique({ 
      where: { id }
    });

    if (!currentEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        ...validatedData,
        updatedById: req.user?.id,
        version: { increment: 1 }
      }
    });
    
    res.json(employee);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Update employee error:', error);
      res.status(500).json({ error: 'Failed to update employee' });
    }
  }
}
