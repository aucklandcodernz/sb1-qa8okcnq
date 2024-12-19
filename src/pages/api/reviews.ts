
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/db';
import { handleError } from '../../lib/middleware/errorHandler';
import { z } from 'zod';

const reviewSchema = z.object({
  employeeId: z.string(),
  reviewerId: z.string(),
  reviewDate: z.string(),
  rating: z.number().min(1).max(5),
  comments: z.string().optional(),
  goals: z.object({}).passthrough().optional(),
  metrics: z.object({}).passthrough().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const data = reviewSchema.parse(req.body);
      const review = await prisma.performanceReview.create({
        data: {
          ...data,
          reviewDate: new Date(data.reviewDate),
          status: 'DRAFT'
        },
        include: {
          employee: true,
          reviewer: true
        }
      });
      return res.status(201).json(review);
    }

    if (req.method === 'GET') {
      const reviews = await prisma.performanceReview.findMany({
        include: {
          employee: true,
          reviewer: true
        },
        orderBy: {
          reviewDate: 'desc'
        }
      });
      return res.status(200).json(reviews);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    handleError(error, res);
  }
}
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/db'
import { reviewSchema } from '../../lib/validations/review'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res)
    if (!session) return res.status(401).json({ error: 'Unauthorized' })

    switch (req.method) {
      case 'POST': {
        const data = reviewSchema.parse(req.body)
        const review = await prisma.performanceReview.create({ data })
        return res.status(201).json(review)
      }

      case 'GET': {
        const { employeeId } = req.query
        const reviews = await prisma.performanceReview.findMany({
          where: { employeeId: employeeId as string },
          orderBy: { date: 'desc' }
        })
        return res.json(reviews)
      }

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
