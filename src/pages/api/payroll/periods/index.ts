
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { calculatePayrollForEmployee } from '../../../../lib/payroll/calculations';

const payrollPeriodSchema = z.object({
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'POST':
        const data = payrollPeriodSchema.parse(req.body);
        
        // Create payroll period
        const payrollPeriod = await prisma.payrollPeriod.create({
          data: {
            startDate: data.startDate,
            endDate: data.endDate,
            status: 'PROCESSING'
          }
        });

        // Get all employees
        const employees = await prisma.employee.findMany({
          include: {
            payrollDetails: true,
            attendance: {
              where: {
                date: {
                  gte: data.startDate,
                  lte: data.endDate
                }
              }
            }
          }
        });

        // Generate payslips for each employee
        const payslips = await Promise.all(
          employees.map(async (employee) => {
            const payrollCalc = await calculatePayrollForEmployee({
              employee,
              startDate: data.startDate,
              endDate: data.endDate
            });

            return prisma.payslip.create({
              data: {
                employeeId: employee.id,
                payrollPeriodId: payrollPeriod.id,
                grossPay: payrollCalc.grossPay,
                netPay: payrollCalc.netPay,
                payeTax: payrollCalc.payeTax,
                kiwiSaver: payrollCalc.kiwiSaver,
                accLevy: payrollCalc.accLevy,
                hoursWorked: payrollCalc.hoursWorked,
                deductions: payrollCalc.deductions,
                allowances: payrollCalc.allowances
              }
            });
          })
        );

        // Update period status to completed
        await prisma.payrollPeriod.update({
          where: { id: payrollPeriod.id },
          data: { status: 'COMPLETED' }
        });

        return res.status(200).json({ payrollPeriod, payslips });

      case 'GET':
        const periods = await prisma.payrollPeriod.findMany({
          orderBy: { startDate: 'desc' },
          include: {
            payslips: {
              include: {
                employee: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        });
        return res.status(200).json(periods);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Payroll API error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
import { prisma } from '../../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { organizationId } = req.query;

  try {
    const payrollPeriods = await prisma.payrollPeriod.findMany({
      where: { organizationId: String(organizationId) },
      include: {
        payslips: {
          include: {
            employee: {
              select: {
                id: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: { startDate: 'desc' }
    });

    return res.status(200).json(payrollPeriods);
  } catch (error) {
    console.error('Fetch payroll periods error:', error);
    return res.status(400).json({ error: 'Failed to fetch payroll periods' });
  }
}
