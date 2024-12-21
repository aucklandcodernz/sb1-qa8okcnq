
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    const payrollData = {
      stats: {
        totalProcessed: await prisma.payrollPeriod.count({ where: { status: 'PROCESSED' }}),
        pendingApproval: await prisma.payrollPeriod.count({ where: { status: 'PENDING' }}),
        totalEmployees: await prisma.employee.count()
      },
      summary: {
        currentPeriod: await prisma.payrollPeriod.findFirst({
          where: { status: 'ACTIVE' },
          include: { employees: true }
        }),
        lastProcessed: await prisma.payrollPeriod.findFirst({
          where: { status: 'PROCESSED' },
          orderBy: { endDate: 'desc' }
        })
      },
      workflow: await prisma.payrollPeriod.findMany({
        take: 5,
        orderBy: { startDate: 'desc' },
        include: { employees: true }
      })
    };

    return new Response(JSON.stringify(payrollData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Payroll API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch payroll data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
