
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handleDatabaseError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new Error('A unique constraint would be violated.');
      case 'P2025':
        return new Error('Record not found.');
      default:
        return new Error('Database operation failed.');
    }
  }
  return error;
}
