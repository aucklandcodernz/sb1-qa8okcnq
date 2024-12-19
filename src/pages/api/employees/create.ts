
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { onboarding, ...employeeData } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      // Create employee
      const employee = await tx.employee.create({
        data: employeeData
      });

      // Create onboarding
      const onboardingRecord = await tx.onboarding.create({
        data: {
          employeeId: employee.id,
          templateId: onboarding.templateId,
          startDate: new Date(onboarding.startDate),
          totalTasks: onboarding.totalTasks,
          currentPhase: onboarding.currentPhase,
          tasks: {
            create: onboarding.tasks
          }
        },
        include: {
          tasks: true
        }
      });

      return { employee, onboarding: onboardingRecord };
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({ error: 'Failed to create employee' });
  }
}
