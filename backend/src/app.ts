import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger/swaggerOptions';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { asyncHandler } from './utils/asyncHandler';
import { ApiError } from './utils/ApiError';

const app: Application = express();

// ------------------------------------------------------------------
// Security middleware
// ------------------------------------------------------------------
app.use(helmet());
app.use(cors());
app.use(mongoSanitize()); // Protect against NoSQL injection

// ------------------------------------------------------------------
// Logging
// ------------------------------------------------------------------
app.use(morgan('dev'));

// ------------------------------------------------------------------
// Body parser
// ------------------------------------------------------------------
app.use(express.json({ limit: '10kb' }));

// ------------------------------------------------------------------
// Rate limiting on public and auth routes
// ------------------------------------------------------------------
const publicAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later.', data: null },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/auth', publicAuthLimiter);
app.use('/leads/public', publicAuthLimiter);

// ------------------------------------------------------------------
// Swagger documentation
// ------------------------------------------------------------------
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ------------------------------------------------------------------
// Health check
// ------------------------------------------------------------------
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
app.get('/api/health', asyncHandler(async (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    data: { timestamp: new Date().toISOString(), uptime: process.uptime() },
  });
}));

// ------------------------------------------------------------------
// Base API routes
// ------------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// ------------------------------------------------------------------
// JSON 404 handler for any unmatched route
// ------------------------------------------------------------------
app.use((_req: Request, _res: Response) => {
  throw new ApiError(404, 'Resource not found');
});

// ------------------------------------------------------------------
// Centralized error handler (must be last)
// ------------------------------------------------------------------
app.use(errorHandler);

export default app;
