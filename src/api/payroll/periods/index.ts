
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    const periods = await prisma.payrollPeriod.findMany({
      include: {
        payslips: true,
        transactions: true
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    const totalProcessed = periods.filter(p => p.status === 'COMPLETED').length;
    const totalPending = periods.filter(p => p.status === 'PENDING').length;
    const totalAmount = periods.reduce((sum, p) => sum + (p.totalAmount || 0), 0);

    const payrollData = {
      stats: {
        totalProcessed,
        totalPending,
        totalAmount
      },
      summary: {
        currentPeriod: periods[0] || {
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          status: 'PENDING'
        },
        totalEmployees: await prisma.employee.count()
      },
      items: periods
    };

    return new Response(JSON.stringify(payrollData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Payroll API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch payroll data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
