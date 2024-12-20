
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    const currentPeriod = await prisma.payrollPeriod.findFirst({
      where: {
        endDate: {
          gte: new Date()
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    });

    const totalProcessed = await prisma.payrollPeriod.count({
      where: { status: 'COMPLETED' }
    });

    const totalPending = await prisma.payrollPeriod.count({
      where: { status: 'PENDING' }
    });

    const payrollData = {
      stats: {
        totalProcessed,
        totalPending,
        totalAmount: 0
      },
      summary: {
        currentPeriod: currentPeriod || {
          startDate: new Date(),
          endDate: new Date(),
          status: 'PENDING'
        },
        totalEmployees: await prisma.employee.count()
      },
      items: await prisma.payrollPeriod.findMany({
        take: 5,
        orderBy: { startDate: 'desc' }
      })
    };

    return new Response(JSON.stringify(payrollData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch payroll data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
