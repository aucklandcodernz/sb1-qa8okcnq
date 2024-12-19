
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const handleDatabaseError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({ error: 'Unique constraint violation' });
      case 'P2025':
        return res.status(404).json({ error: 'Record not found' });
      default:
        return res.status(500).json({ error: 'Database error' });
    }
  }
  next(error);
};
