
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  dueDate: z.string().transform(str => new Date(str)),
  category: z.enum(['DOCUMENTATION', 'TRAINING', 'HEALTH_SAFETY', 'POLICIES', 'SYSTEMS_ACCESS']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE']),
  assignedTo: z.string().uuid(),
  nzCompliance: z.object({
    healthSafetyBriefing: z.boolean().default(false),
    employmentAgreement: z.boolean().default(false),
    kiwiSaverForms: z.boolean().default(false),
    taxDeclaration: z.boolean().default(false)
  }).optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { taskId } = req.query;

    switch (req.method) {
      case 'GET':
        const task = await prisma.onboardingTask.findUnique({
          where: { id: String(taskId) },
          include: {
            assignedTo: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        });
        
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
        return res.status(200).json(task);

      case 'PUT':
        const validatedData = taskSchema.parse(req.body);
        const updatedTask = await prisma.onboardingTask.update({
          where: { id: String(taskId) },
          data: validatedData
        });
        return res.status(200).json(updatedTask);

      case 'DELETE':
        await prisma.onboardingTask.delete({
          where: { id: String(taskId) }
        });
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Onboarding task API error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors 
      });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
