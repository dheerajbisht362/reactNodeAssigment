import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

/**
 * Consistent JSON response shape used across all success and error responses:
 *   { success: boolean, message: string, data: any }
 */
export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: unknown = null
): Response => {
  return res.status(statusCode).json({ success, message, data });
};

/**
 * Centralized error handling middleware.
 * Always responds with { success, message, data }.
 * Never leaks stack traces in production.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  // Default values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let data: unknown = null;

  // --- Operational ApiError ---
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    return sendResponse(res, statusCode, false, message, data);
  }

  // --- Mongoose CastError (invalid ObjectId) ---
  if ((err as any).name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource ID';
    return sendResponse(res, statusCode, false, message, data);
  }

  // --- Mongoose validation error ---
  if ((err as any).name === 'ValidationError') {
    statusCode = 400;
    const errors: Record<string, string> = {};
    for (const [key, value] of Object.entries((err as any).errors)) {
      errors[(value as any).path || key] = (value as any).message || 'Invalid field';
    }
    message = 'Validation error';
    data = errors;
    return sendResponse(res, statusCode, false, message, data);
  }

  // --- Mongoose duplicate key (E11000) ---
  if ((err as any).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as any).keyValue || {})[0] || 'field';
    message = `${field} already exists`;
    return sendResponse(res, statusCode, false, message, data);
  }

  // --- JWT errors ---
  if ((err as any).name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    return sendResponse(res, statusCode, false, message, data);
  }

  if ((err as any).name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    return sendResponse(res, statusCode, false, message, data);
  }

  // --- Unexpected error ---
  console.error('Unexpected error:', err);

  if (env.NODE_ENV === 'development') {
    message = err.message || 'Internal Server Error';
    data = { stack: err.stack };
  }

  return sendResponse(res, statusCode, false, message, data);
};
