
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
import { NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleError = (error: unknown, res: NextApiResponse) => {
  console.error('Error:', error)

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message
    })
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors
    })
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        message: 'A record with this value already exists'
      })
    }
  }

  return res.status(500).json({
    message: 'Internal server error'
  })
}
