
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { performanceReviewSchema } from '../../lib/validations/review';
import { z } from 'zod';

export async function createReview(req: Request, res: Response) {
  try {
    const validatedData = performanceReviewSchema.parse(req.body);
    
    const review = await prisma.performanceReview.create({
      data: validatedData,
      include: {
        employee: true,
        reviewer: true,
      },
    });
    
    res.status(201).json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to create review' });
    }
  }
}

export async function getReviews(req: Request, res: Response) {
  try {
    const { employeeId, status } = req.query;
    
    const reviews = await prisma.performanceReview.findMany({
      where: {
        employeeId: employeeId as string,
        status: status as string,
      },
      include: {
        employee: true,
        reviewer: true,
      },
      orderBy: {
        reviewDate: 'desc',
      },
    });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
