
import { NextApiRequest, NextApiResponse } from 'next'
import { verify, JwtPayload } from 'jsonwebtoken'
import prisma from '../db'

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
  token?: string;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub as string },
      select: {
        id: true,
        email: true,
        role: true,
        organizationId: true
      }
    })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ message: error.message })
    }
    return res.status(401).json({ message: 'Authentication failed' })
  }
}

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }
    next()
  }
}
