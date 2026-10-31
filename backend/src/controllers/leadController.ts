
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Lead from '../models/Lead';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const createPublicLead = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, courseInterest, message } = req.body;
  const existing = await Lead.isDuplicateWithin24h(email, courseInterest);
  if (existing) {
    return res.status(200).json({ success: true, message: 'Lead already exists from the last 24 hours. Returning existing record.', data: { lead: { id: existing._id.toString(), name: existing.name, email: existing.email, phone: existing.phone || null, courseInterest: existing.courseInterest, message: existing.message || null, status: existing.status, claimedBy: existing.claimedBy, claimedAt: existing.claimedAt, createdAt: existing.createdAt } } });
  }
  const lead = await Lead.create({ name, email: email.toLowerCase(), phone: phone || null, courseInterest, message: message || null, status: 'unclaimed', claimedBy: null, claimedAt: null });
  return res.status(201).json({ success: true, message: 'Public enquiry submitted successfully', data: { lead: { id: lead._id.toString(), name: lead.name, email: lead.email, phone: lead.phone || null, courseInterest: lead.courseInterest, message: lead.message || null, status: lead.status, claimedBy: lead.claimedBy, claimedAt: lead.claimedAt, createdAt: lead.createdAt } } });
});

export const getUnclaimedLeads = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit as string, 10) || 10, 1), 100);
  const skip = (page - 1) * limit;
  const [leads, total] = await Promise.all([
    Lead.find({ status: 'unclaimed' }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Lead.countDocuments({ status: 'unclaimed' }),
  ]);
  return res.json({ success: true, message: 'Unclaimed leads retrieved successfully', data: { leads: leads.map((l: any) => ({ id: l._id.toString(), name: l.name, email: l.email, phone: l.phone || null, courseInterest: l.courseInterest, message: l.message || null, status: l.status, claimedBy: l.claimedBy, claimedAt: l.claimedAt, createdAt: l.createdAt })), pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
});

export const claimLead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, 'Invalid lead ID');
  const lead = await Lead.findOneAndUpdate({ _id: id, status: 'unclaimed' }, { $set: { status: 'claimed', claimedBy: new mongoose.Types.ObjectId(req.user!.id), claimedAt: new Date() } }, { new: true }).lean();
  if (!lead) {
    const existing = await Lead.findById(id).lean();
    if (!existing) throw new ApiError(404, 'Lead not found');
    throw new ApiError(409, 'Lead already claimed');
  }
  return res.json({ success: true, message: 'Lead claimed successfully', data: { lead: { id: lead._id.toString(), name: lead.name, email: lead.email, courseInterest: lead.courseInterest, status: lead.status, claimedBy: lead.claimedBy, claimedAt: lead.claimedAt } } });
});

export const getMyLeads = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit as string, 10) || 10, 1), 100);
  const skip = (page - 1) * limit;
  const search = (req.query.search as string) || '';
  const filter: any = { claimedBy: new mongoose.Types.ObjectId(req.user!.id) };
  if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  const [leads, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Lead.countDocuments(filter),
  ]);
  return res.json({ success: true, message: 'My leads retrieved successfully', data: { leads: leads.map((l: any) => ({ id: l._id.toString(), name: l.name, email: l.email, phone: l.phone || null, courseInterest: l.courseInterest, message: l.message || null, status: l.status, claimedBy: l.claimedBy, claimedAt: l.claimedAt, createdAt: l.createdAt })), pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
});

export const releaseLead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, 'Invalid lead ID');
  const lead = await Lead.findOneAndUpdate({ _id: id, claimedBy: new mongoose.Types.ObjectId(req.user!.id), status: 'claimed' }, { $set: { status: 'unclaimed', claimedBy: null, claimedAt: null } }, { new: true }).lean();
  if (!lead) {
    const existing = await Lead.findById(id).lean();
    if (!existing) throw new ApiError(404, 'Lead not found');
    throw new ApiError(403, 'You are not the owner of this lead or it is not claimed');
  }
  return res.json({ success: true, message: 'Lead released successfully', data: { lead: { id: lead._id.toString(), name: lead.name, email: lead.email, status: lead.status, claimedBy: lead.claimedBy, claimedAt: lead.claimedAt } } });
});
