import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';

/**
 * Employee interface
 */
export interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * Employee schema
 * - email: unique, lowercase, trimmed, indexed
 * - password: select: false (never returned in queries by default)
 * - timestamps: createdAt, updatedAt
 */
const employeeSchema = new mongoose.Schema<IEmployee>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // never return password unless explicitly requested
    },
  },
  { timestamps: true }
);

/**
 * Hash password before saving if modified
 */
employeeSchema.pre<IEmployee>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

/**
 * Compare candidate password with hashed password
 */
employeeSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Avoid re-registering model in hot-reload / test environments
 */
export const Employee: Model<IEmployee> =
  (mongoose.models.Employee as Model<IEmployee>) ||
  mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
