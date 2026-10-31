import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import Employee from '../models/Employee';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

/**
 * Generate a JWT for an employee
 * Expires in 1 day by default (env.JWT_EXPIRES_IN)
 */
const generateToken = (employeeId: string): string => {
  return jwt.sign({ id: employeeId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

/**
 * POST /auth/register
 * Body: { name, email, password }
 * Returns the employee (no password) and a JWT.
 * Rejects duplicate emails with 409.
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
  if (existingEmployee) {
    throw new ApiError(409, 'Email already registered');
  }

  // Create employee (password hashed by pre-save hook)
  const employee = await Employee.create({ name, email: email.toLowerCase(), password });

  // Return employee without password + JWT
  const token = generateToken(employee._id.toString());

  res.status(201).json({
    success: true,
    message: 'Employee registered successfully',
    data: {
      employee: {
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
      },
      token,
    },
  });
});

/**
 * POST /auth/login
 * Body: { email, password }
 * Returns a JWT and the employee (no password).
 * Returns 401 on invalid credentials.
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find employee and explicitly select password (it has select: false)
  const employee = await Employee.findOne({ email: email.toLowerCase() }).select('+password');

  if (!employee) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Compare passwords
  const isMatch = await employee.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Generate token
  const token = generateToken(employee._id.toString());

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      employee: {
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
      },
      token,
    },
  });
});
