
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { onboardingSchema } from '../../../../lib/validations/onboarding';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const onboarding = await prisma.onboarding.findUnique({
        where: { employeeId: id as string },
        include: {
          tasks: true,
          organization: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      if (!onboarding) {
        return res.status(404).json({ error: 'Onboarding not found' });
      }

      return res.status(200).json(onboarding);
    }

    if (req.method === 'PATCH') {
      const validatedData = onboardingSchema.parse(req.body);
      
      const updatedOnboarding = await prisma.onboarding.update({
        where: { employeeId: id as string },
        data: {
          ...validatedData,
          completedAt: validatedData.status === 'COMPLETED' ? new Date() : null,
          lastUpdatedBy: req.body.userId
        },
        include: {
          tasks: true,
          organization: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return res.status(200).json(updatedOnboarding);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Onboarding API error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data format', details: error.issues });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
