
import { Prisma } from '@prisma/client';

export const handleDatabaseError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new Error('A unique constraint would be violated.');
      case 'P2025':
        return new Error('Record not found.');
      default:
        return new Error('Database error occurred.');
    }
  }
  return error;
};
