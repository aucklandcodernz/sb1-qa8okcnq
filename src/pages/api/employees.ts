
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { employeeSchema, employeeUpdateSchema } from '../../lib/validations/employee';
import { z } from 'zod';
import { handleDatabaseError } from '../../lib/middleware/errorHandler';

// Get all employees with pagination and filtering
export async function getEmployees(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const organizationId = req.query.organizationId as string;

    const employees = await prisma.employee.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        department: true,
        onboarding: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.employee.count({
      where: { organizationId: organizationId },
    });

    res.status(200).json({
      data: employees,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    });
  } catch (error) {
    const dbError = handleDatabaseError(error);
    res.status(500).json({ error: dbError.message });
  }
}

// Create new employee
export async function createEmployee(req: Request, res: Response) {
  try {
    const validatedData = employeeSchema.parse(req.body);
    
    const employee = await prisma.employee.create({
      data: {
        ...validatedData,
        organization: {
          connect: { id: req.body.organizationId }
        },
        onboarding: {
          create: {
            status: 'PENDING',
            startDate: new Date(),
          }
        }
      },
      include: {
        department: true,
        onboarding: true,
      }
    });

    // Create audit log
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
      const dbError = handleDatabaseError(error);
      res.status(500).json({ error: dbError.message });
    }
  }
}

// Update employee
export async function updateEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedData = employeeUpdateSchema.parse(req.body);

    const employee = await prisma.employee.update({
      where: { id },
      data: validatedData,
      include: {
        department: true,
        onboarding: true,
      }
    });

    await prisma.auditLog.create({
      data: {
        employeeId: id,
        action: 'UPDATE',
        details: validatedData,
        performedBy: req.user?.id || 'SYSTEM'
      }
    });

    res.status(200).json(employee);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      const dbError = handleDatabaseError(error);
      res.status(500).json({ error: dbError.message });
    }
  }
}

// Delete employee
export async function deleteEmployee(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: { id }
    });

    await prisma.auditLog.create({
      data: {
        employeeId: id,
        action: 'DELETE',
        performedBy: req.user?.id || 'SYSTEM'
      }
    });

    res.status(204).send();
  } catch (error) {
    const dbError = handleDatabaseError(error);
    res.status(500).json({ error: dbError.message });
  }
}
