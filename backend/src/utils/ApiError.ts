/**
 * ApiError - Custom error class for operational errors in the CRM API.
 *
 * Usage:
 *   throw new ApiError(404, 'Lead not found');
 *   throw new ApiError(409, 'Lead already claimed');
 *
 * Centralized error handler will convert these into a consistent JSON response:
 *   { success: false, message: '<message>', data: null }
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace, excluding this constructor from it
    Error.captureStackTrace(this, this.constructor);

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
