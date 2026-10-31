import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import Employee from '../models/Employee';
import { ApiError } from '../utils/ApiError';

/**
 * Authenticated user payload attached to req.user
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

/**
 * Extended Request interface with authenticated user
 */
export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

/**
 * authMiddleware - Reads "Authorization: Bearer <token>", verifies the JWT,
 * loads the employee from the database (password excluded), and attaches it to req.user.
 * Returns 401 if the token is missing, invalid, expired, or the employee no longer exists.
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify JWT
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
      name: string;
    };

    // 3. Load employee from DB (password excluded via select: false + explicit '-password')
    const employee = await Employee.findById(decoded.id).select('-password');

    if (!employee) {
      throw new ApiError(401, 'Token is valid but user not found. Please log in again.');
    }

    // 4. Attach user to request
    req.user = {
      id: employee._id.toString(),
      email: employee.email,
      name: employee.name,
    };

    next();
  } catch (error) {
    next(error);
  }
};
