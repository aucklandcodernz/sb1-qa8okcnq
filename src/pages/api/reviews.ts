
import { Request, Response } from 'express';
import { prisma } from '../../lib/db';
import { performanceReviewSchema } from '../../lib/validations/review';
import { z } from 'zod';

export async function createReview(req: Request, res: Response) {
  try {
    const validatedData = performanceReviewSchema.parse(req.body);
    
    const review = await prisma.performanceReview.create({
      data: {
        ...validatedData,
        lastReminderSent: null,
        competencies: validatedData.competencies || {},
        developmentPlans: validatedData.developmentPlans || {},
        achievements: validatedData.achievements || {}
      },
      include: {
        employee: true,
        reviewer: true,
        feedback: true
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
    const { employeeId, status, department } = req.query;
    
    const reviews = await prisma.performanceReview.findMany({
      where: {
        employeeId: employeeId as string,
        status: status as string,
        department: department as string,
      },
      include: {
        employee: true,
        reviewer: true,
        feedback: true
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

export async function updateReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedData = performanceReviewSchema.partial().parse(req.body);
    
    const review = await prisma.performanceReview.update({
      where: { id },
      data: validatedData,
      include: {
        employee: true,
        reviewer: true,
        feedback: true
      },
    });
    
    res.json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Failed to update review' });
    }
  }
}
