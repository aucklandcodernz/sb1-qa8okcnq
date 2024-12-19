
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { z } from 'zod';

const tokenSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']),
});

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const validatedToken = tokenSchema.parse(decoded);

    const user = await prisma.user.findUnique({
      where: { id: validatedToken.id },
      select: {
        id: true,
        email: true,
        role: true,
        organizationId: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(401).json({ error: 'Invalid token format' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
}
