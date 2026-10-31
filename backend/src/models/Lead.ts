import mongoose, { Document, Model } from 'mongoose';

export type LeadStatus = 'unclaimed' | 'claimed';

/**
 * Lead interface
 */
export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  courseInterest: string;
  message?: string;
  status: LeadStatus;
  claimedBy: mongoose.Types.ObjectId | null;
  claimedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Lead model interface with custom statics
 */
export interface LeadModel extends Model<ILead> {
  isDuplicateWithin24h(email: string, courseInterest: string): Promise<ILead | null>;
}

/**
 * Lead schema
 * - status enum: unclaimed | claimed (default unclaimed)
 * - claimedBy: ref Employee, default null
 * - claimedAt: Date, default null
 * - indexes: { status: 1, createdAt: -1 }, { claimedBy: 1, createdAt: -1 }
 */
const leadSchema = new mongoose.Schema<ILead>(
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
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    courseInterest: {
      type: String,
      required: [true, 'Course interest is required'],
      trim: true,
      maxlength: 100,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['unclaimed', 'claimed'],
      default: 'unclaimed',
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * Index for unclaimed leads sorted by newest first
 */
leadSchema.index({ status: 1, createdAt: -1 });

/**
 * Index for an employee's claimed leads sorted by newest first
 */
leadSchema.index({ claimedBy: 1, createdAt: -1 });

/**
 * Check if a lead with the same email and courseInterest was created within the last 24 hours.
 * Returns the existing lead document if found, otherwise null.
 */
leadSchema.statics.isDuplicateWithin24h = async function (
  this: any,
  email: string,
  courseInterest: string
): Promise<ILead | null> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const LeadModel = this as unknown as LeadModel;
  return LeadModel.findOne({
    email: email.toLowerCase(),
    courseInterest,
    createdAt: { $gte: twentyFourHoursAgo },
  }).lean<ILead>() as unknown as Promise<ILead | null>;
};

/**
 * Avoid re-registering model in hot-reload / test environments
 */
export const Lead: LeadModel =
  (mongoose.models.Lead as LeadModel) || mongoose.model<ILead, LeadModel>('Lead', leadSchema);

export default Lead;
