
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const onboarding = await prisma.onboarding.findFirst({
        where: { employeeId: id as string },
        include: {
          tasks: true,
        }
      });

      if (!onboarding) {
        return res.status(404).json({ error: 'Onboarding not found' });
      }

      return res.status(200).json(onboarding);
    } catch (error) {
      console.error('Error fetching onboarding:', error);
      return res.status(500).json({ error: 'Failed to fetch onboarding' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { taskId, status } = req.body;
      
      const updatedTask = await prisma.onboardingTask.update({
        where: { id: taskId },
        data: { status }
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating onboarding task:', error);
      return res.status(500).json({ error: 'Failed to update task' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
