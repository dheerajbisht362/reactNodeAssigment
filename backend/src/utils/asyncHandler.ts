import { RequestHandler, NextFunction } from 'express';

/**
 * asyncHandler - Wraps async Express route handlers so that rejections
 * are forwarded to next() instead of crashing the process.
 *
 * Usage:
 *   router.get('/', asyncHandler(async (req, res) => { ... }));
 */
export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
