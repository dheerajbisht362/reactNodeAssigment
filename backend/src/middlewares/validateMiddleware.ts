import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';

/**
 * validateMiddleware - Factory that validates req.body against a strict Zod schema.
 * Strict schemas reject unknown fields automatically.
 * On validation failure, responds 400 with field-level error details.
 *
 * Usage:
 *   router.post('/', validate(createLeadSchema), controller);
 */
export const validateMiddleware =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        for (const issue of error.issues) {
          const path = issue.path.join('.');
          errors[path] = issue.message;
        }
        throw new ApiError(400, 'Validation error', true);
      }
      next(error);
    }
  };
