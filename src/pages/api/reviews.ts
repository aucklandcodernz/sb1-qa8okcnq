
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
        achievements: validatedData.achievements || {},
        status: 'DRAFT'
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const [reviews, total] = await Promise.all([
      prisma.performanceReview.findMany({
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
        orderBy: { reviewDate: 'desc' },
        skip,
        take: limit,
      }),
      prisma.performanceReview.count({
        where: {
          employeeId: employeeId as string,
          status: status as string,
          department: department as string,
        }
      })
    ]);
    
    res.json({
      reviews,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page
      }
    });
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
