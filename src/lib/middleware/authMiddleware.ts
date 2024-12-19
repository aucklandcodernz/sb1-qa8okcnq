
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { prisma } from '../db';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verify(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).userId },
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
