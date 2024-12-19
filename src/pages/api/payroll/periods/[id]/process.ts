
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
import { prisma } from '../../../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const payrollPeriod = await prisma.payrollPeriod.findUnique({
      where: { id: String(id) },
      include: { payslips: true }
    });

    if (!payrollPeriod) {
      return res.status(404).json({ error: 'Payroll period not found' });
    }

    if (payrollPeriod.status === 'COMPLETED') {
      return res.status(400).json({ error: 'Payroll period already processed' });
    }

    await prisma.payrollPeriod.update({
      where: { id: String(id) },
      data: {
        status: 'PROCESSING',
        processedAt: new Date()
      }
    });

    // Update all payslips status to PROCESSED
    await prisma.payslip.updateMany({
      where: { payrollPeriodId: String(id) },
      data: { status: 'PROCESSED' }
    });

    await prisma.payrollPeriod.update({
      where: { id: String(id) },
      data: { status: 'COMPLETED' }
    });

    return res.status(200).json({ message: 'Payroll period processed successfully' });
  } catch (error) {
    console.error('Payroll processing error:', error);
    return res.status(400).json({ error: 'Failed to process payroll period' });
  }
}
