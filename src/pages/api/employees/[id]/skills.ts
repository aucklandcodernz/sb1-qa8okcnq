
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/db';
import { skillAssessmentSchema } from '../../../../lib/validations/employee';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const skills = await prisma.skillAssessment.findMany({
        where: { employeeId: String(id) },
        include: { history: true }
      });
      return res.json(skills);
    }

    if (req.method === 'POST') {
      const validatedData = skillAssessmentSchema.parse(req.body);
      
      const existingSkill = await prisma.skillAssessment.findFirst({
        where: {
          employeeId: String(id),
          skillName: validatedData.skillName
        }
      });

      if (existingSkill) {
        const skill = await prisma.skillAssessment.update({
          where: { id: existingSkill.id },
          data: {
            level: validatedData.level,
            notes: validatedData.notes,
            assessedAt: new Date(),
            assessedBy: validatedData.assessedBy,
            history: {
              create: {
                previousLevel: existingSkill.level,
                newLevel: validatedData.level,
                changedBy: validatedData.assessedBy,
                reason: validatedData.reason
              }
            }
          },
          include: { history: true }
        });
        return res.json(skill);
      }

      const skill = await prisma.skillAssessment.create({
        data: {
          ...validatedData,
          employeeId: String(id),
        },
        include: { history: true }
      });
      return res.json(skill);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Skills API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
