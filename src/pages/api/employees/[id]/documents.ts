
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/db';
import { documentStatusSchema } from '../../../../lib/validations/employee';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const documents = await prisma.documentStatus.findMany({
        where: { employeeId: String(id) }
      });
      return res.json(documents);
    }

    if (req.method === 'POST') {
      const validatedData = documentStatusSchema.parse(req.body);
      const document = await prisma.documentStatus.create({
        data: {
          ...validatedData,
          employeeId: String(id)
        }
      });
      return res.json(document);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Document API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
