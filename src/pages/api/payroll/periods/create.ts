
import { prisma } from '../../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { calculatePayrollForEmployee } from '../../../../lib/payroll/calculations';
import { z } from 'zod';

const createPayrollPeriodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  organizationId: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { startDate, endDate, organizationId } = createPayrollPeriodSchema.parse(req.body);

    // Create payroll period
    const payrollPeriod = await prisma.payrollPeriod.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        organizationId,
        status: 'DRAFT',
      },
    });

    // Get all active employees
    const employees = await prisma.employee.findMany({
      where: {
        organizationId,
        status: 'ACTIVE',
      },
      include: {
        payrollDetails: true,
      },
    });

    // Generate payslips for all employees
    const payslips = await Promise.all(
      employees.map(async (employee) => {
        const payrollCalculation = await calculatePayrollForEmployee({
          employee,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        });

        return prisma.payslip.create({
          data: {
            employeeId: employee.id,
            payrollPeriodId: payrollPeriod.id,
            grossPay: payrollCalculation.grossPay,
            netPay: payrollCalculation.netPay,
            taxDeductions: payrollCalculation.taxDeductions,
            kiwiSaverEmployee: payrollCalculation.kiwiSaver.employeeContribution,
            kiwiSaverEmployer: payrollCalculation.kiwiSaver.employerContribution,
            status: 'DRAFT',
          },
        });
      })
    );

    return res.status(200).json({
      payrollPeriod,
      payslips,
    });
  } catch (error) {
    console.error('Error creating payroll period:', error);
    return res.status(400).json({
      error: error instanceof z.ZodError ? error.errors : 'Failed to create payroll period'
    });
  }
}
import { prisma } from '../../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { calculatePayrollForEmployee } from '../../../../lib/payroll/calculations';

const createPayrollPeriodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  organizationId: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { startDate, endDate, organizationId } = createPayrollPeriodSchema.parse(req.body);

    const payrollPeriod = await prisma.payrollPeriod.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        organizationId,
        status: 'PENDING'
      }
    });

    const employees = await prisma.employee.findMany({
      where: { organizationId },
      include: { payrollDetails: true }
    });

    const payslips = await Promise.all(
      employees.map(async (employee) => {
        const calculations = await calculatePayrollForEmployee({ employee, startDate, endDate });
        
        return prisma.payslip.create({
          data: {
            employeeId: employee.id,
            payrollPeriodId: payrollPeriod.id,
            grossPay: calculations.grossPay,
            netPay: calculations.netPay,
            taxDeductions: calculations.taxDeductions,
            kiwiSaver: calculations.kiwiSaver,
            status: 'GENERATED'
          }
        });
      })
    );

    await prisma.payrollPeriod.update({
      where: { id: payrollPeriod.id },
      data: { status: 'COMPLETED' }
    });

    return res.status(200).json({ payrollPeriod, payslips });
  } catch (error) {
    console.error('Payroll period creation error:', error);
    return res.status(400).json({ error: 'Failed to create payroll period' });
  }
}
