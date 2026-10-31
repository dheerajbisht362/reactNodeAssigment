import { Router } from 'express';
import {
  createPublicLead,
  getUnclaimedLeads,
  claimLead,
  getMyLeads,
  releaseLead,
} from '../controllers/leadController';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { z } from 'zod';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /leads/public:
 *   post:
 *     summary: Submit a public enquiry (no auth required)
 *     tags: [Leads]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, courseInterest]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Smith"
 *                 description: Prospective client name
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane@example.com"
 *                 description: Client email
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: Phone number (optional)
 *               courseInterest:
 *                 type: string
 *                 example: "Computer Science"
 *                 description: Course interest
 *               message:
 *                 type: string
 *                 example: "Interested in CS program"
 *                 description: Additional message (optional)
 *     responses:
 *       '201':
 *         description: Public enquiry submitted successfully
 *       '400':
 *         description: Validation error
 *       '200':
 *         description: Lead already exists within 24 hours
 */

const publicLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20, 'Phone too long').optional().nullable(),
  courseInterest: z.string().min(1, 'Course interest is required').max(100),
  message: z.string().max(1000, 'Message too long').optional().nullable(),
}).strict();

router.post('/public', validateMiddleware(publicLeadSchema), createPublicLead);

/**
 * @openapi
 * /leads/unclaimed:
 *   get:
 *     summary: List all unclaimed leads
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: number
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Items per page
 *         schema:
 *           type: number
 *           default: 10
 *     responses:
 *       '200':
 *         description: List of unclaimed leads
 *       '401':
 *         description: Authentication required
 */
router.get('/unclaimed', authMiddleware, getUnclaimedLeads);

/**
 * @openapi
 * /leads/{id}/claim:
 *   post:
 *     summary: Claim an unclaimed lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Lead ID (e.g. 507f1f77bcf86cd799439011)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lead claimed successfully
 *       '404':
 *         description: Lead not found
 *       '409':
 *         description: Lead already claimed
 *       '400':
 *         description: Invalid lead ID
 *       '401':
 *         description: Authentication required
 */
router.post('/:id/claim', authMiddleware, claimLead);

/**
 * @openapi
 * /leads/my:
 *   get:
 *     summary: List my (claimed) leads
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: number
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Items per page
 *         schema:
 *           type: number
 *           default: 10
 *       - name: search
 *         in: query
 *         description: Search by name or email
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of my claimed leads
 *       '401':
 *         description: Authentication required
 */
router.get('/my', authMiddleware, getMyLeads);

/**
 * @openapi
 * /leads/{id}/release:
 *   post:
 *     summary: Release a claimed lead (owner only)
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Lead ID (e.g. 507f1f77bcf86cd799439011)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lead released successfully
 *       '404':
 *         description: Lead not found
 *       '403':
 *         description: Not the owner or not claimed
 *       '400':
 *         description: Invalid lead ID
 *       '401':
 *         description: Authentication required
 */
router.post('/:id/release', authMiddleware, releaseLead);

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     security: []
 *     responses:
 *       '200':
 *         description: Server healthy
 */
router.get('/health', asyncHandler(async (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    data: { timestamp: new Date().toISOString(), uptime: process.uptime() },
  });
}));

export default router;