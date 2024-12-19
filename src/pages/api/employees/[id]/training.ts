
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const trainingSchema = z.object({
  title: z.string().min(2, 'Training title is required'),
  provider: z.string().min(2, 'Training provider is required'),
  completionDate: z.string().transform(str => new Date(str)),
  expiryDate: z.string().optional().transform(str => str ? new Date(str) : null),
  certificateNumber: z.string().optional(),
  status: z.enum(['COMPLETED', 'IN_PROGRESS', 'EXPIRED']),
  isNZQAAccredited: z.boolean().default(false),
  complianceCategory: z.enum(['HEALTH_SAFETY', 'SKILLS', 'COMPLIANCE', 'PROFESSIONAL']),
  notes: z.string().optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    switch (req.method) {
      case 'GET':
        const records = await prisma.employeeTraining.findMany({
          where: { employeeId: String(id) },
          orderBy: { completionDate: 'desc' }
        });
        return res.status(200).json(records);

      case 'POST':
        const validatedData = trainingSchema.parse(req.body);
        const newRecord = await prisma.employeeTraining.create({
          data: {
            ...validatedData,
            employeeId: String(id)
          }
        });
        return res.status(201).json(newRecord);

      case 'PUT':
        const { trainingId, ...updateData } = req.body;
        const validatedUpdate = trainingSchema.partial().parse(updateData);
        const updatedRecord = await prisma.employeeTraining.update({
          where: { id: trainingId },
          data: validatedUpdate
        });
        return res.status(200).json(updatedRecord);

      case 'DELETE':
        const { trainingId: deleteId } = req.body;
        await prisma.employeeTraining.delete({
          where: { id: deleteId }
        });
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Training API error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Training record already exists' });
    }
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
