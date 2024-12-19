
import { prisma } from '../../../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const payrollPeriod = await prisma.payrollPeriod.update({
      where: { id: String(id) },
      data: { status: 'PROCESSED' },
      include: {
        payslips: true,
      },
    });

    // Update all associated payslips to PROCESSED
    await prisma.payslip.updateMany({
      where: { payrollPeriodId: String(id) },
      data: { status: 'PROCESSED' },
    });

    return res.status(200).json(payrollPeriod);
  } catch (error) {
    console.error('Error processing payroll period:', error);
    return res.status(500).json({ error: 'Failed to process payroll period' });
  }
}
