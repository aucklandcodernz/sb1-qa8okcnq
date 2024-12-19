
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { employeeId } = req.query;

  if (req.method === 'GET') {
    try {
      const onboarding = await prisma.onboarding.findFirst({
        where: { employeeId: employeeId as string },
        include: {
          tasks: true,
        },
      });

      if (!onboarding) {
        return res.status(404).json({ error: 'Onboarding not found' });
      }

      return res.status(200).json(onboarding);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch onboarding data' });
    }
  }

  if (req.method === 'PATCH') {
    const { taskId, status } = req.body;
    
    try {
      const updatedTask = await prisma.onboardingTask.update({
        where: { id: taskId },
        data: { status },
      });

      // Update overall progress
      const allTasks = await prisma.onboardingTask.findMany({
        where: { onboardingId: updatedTask.onboardingId },
      });
      
      const completedTasks = allTasks.filter(task => task.status === 'COMPLETED').length;
      
      await prisma.onboarding.update({
        where: { id: updatedTask.onboardingId },
        data: { 
          completedTasks,
          status: completedTasks === allTasks.length ? 'COMPLETED' : 'IN_PROGRESS',
        },
      });

      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update task' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
