
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  switch(method) {
    case 'POST':
      switch(req.query.auth?.[0]) {
        case 'login':
          return handleLogin(req, res);
        case 'register':
          return handleRegister(req, res);
        default:
          res.status(400).json({ error: 'Invalid endpoint' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );
    
    return res.status(200).json({ token, user: { 
      id: user.id,
      email: user.email,
      role: user.role
    }});
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleRegister(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password, organizationId } = req.body;
    
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        organizationId,
        role: 'USER'
      }
    });
    
    return res.status(201).json({ 
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
