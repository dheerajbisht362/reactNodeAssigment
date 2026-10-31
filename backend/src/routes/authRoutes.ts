import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { z } from 'zod';

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new employee
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: Employee name
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *                 description: Employee email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *                 description: Password (min 6 chars)
 *     responses:
 *       '201':
 *         description: Registered successfully
 *       '409':
 *         description: Email already registered
 *       '400':
 *         description: Validation error
 */

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
}).strict();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *                 description: Employee email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *                 description: Password
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid credentials
 */

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
}).strict();

/** POST /auth/register */
router.post('/register', validateMiddleware(registerSchema), register);

/** POST /auth/login */
router.post('/login', validateMiddleware(loginSchema), login);

export default router;
