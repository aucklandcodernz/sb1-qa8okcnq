
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/db';
import { employeeQualificationSchema } from '../../../../lib/validations/employee';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    switch (req.method) {
      case 'GET':
        const qualifications = await prisma.employeeQualification.findMany({
          where: { employeeId: String(id) },
          include: { attachments: true }
        });
        return res.status(200).json(qualifications);

      case 'POST':
        const validatedData = employeeQualificationSchema.parse(req.body);
        const newQualification = await prisma.employeeQualification.create({
          data: {
            ...validatedData,
            employeeId: String(id),
            verificationStatus: 'PENDING'
          }
        });
        return res.status(201).json(newQualification);

      case 'PUT':
        const { qualificationId, ...updateData } = employeeQualificationSchema.parse(req.body);
        const updatedQualification = await prisma.employeeQualification.update({
          where: { id: qualificationId },
          data: updateData
        });
        return res.status(200).json(updatedQualification);

      case 'DELETE':
        const { qualificationId: deleteId } = req.body;
        await prisma.employeeQualification.delete({
          where: { id: deleteId }
        });
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Qualification API error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Qualification already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
