import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/auth';
import { AuthenticationError } from '../utils/errors';
import { prisma } from '../utils/database';
import { AuthenticatedRequest } from '../types';

export async function authenticateUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AuthenticationError('Authentication failed'));
  }
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    next(new AuthenticationError('Authentication required'));
    return;
  }
  next();
}

export function optionalAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const token = req.headers.authorization;
    if (token) {
      const extractedToken = extractTokenFromHeader(token);
      const payload = verifyToken(extractedToken);
      
      prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      }).then(user => {
        if (user) {
          req.user = user;
        }
        next();
      }).catch(() => next());
    } else {
      next();
    }
  } catch (error) {
    next();
  }
} 