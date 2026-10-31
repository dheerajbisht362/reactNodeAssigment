import dotenv from 'dotenv';
import { z } from 'zod';

/**
 * Load .env file
 */
dotenv.config();

/**
 * Zod schema to validate all environment variables at startup.
 * If validation fails, the process exits immediately.
 */
const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)).default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // MongoDB Atlas URI
  MONGODB_URI: z.string().url(),

  // JWT Authentication
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),

  // Password hashing
  BCRYPT_SALT_ROUNDS: z.string().transform((val) => parseInt(val, 10)).default('10'),

  // Test MongoDB URI
  TEST_MONGODB_URI: z.string().url().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
