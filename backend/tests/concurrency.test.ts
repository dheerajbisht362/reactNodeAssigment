import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Employee from '../src/models/Employee';
import Lead from '../src/models/Lead';
import { connectDB, disconnectDB } from '../src/config/db';

describe('Concurrency: 5 simultaneous claims on one lead', () => {
  let counselorToken: string;
  let leadId: string;

  beforeAll(async () => {
    await connectDB();
  }, 60000);

  afterAll(async () => {
    await disconnectDB();
  }, 30000);

  beforeEach(async () => {
    await Employee.deleteMany({});
    await Lead.deleteMany({});

    // Create 5 counselors
    const counselors = Array.from({ length: 5 }, (_, i) => ({
      name: `Counselor ${i + 1}`,
      email: `counselor${i + 1}@crm.com`,
      password: 'Password123!',
    }));

    for (const c of counselors) {
      await Employee.create(c);
    }

    // Login as counselor 1 to get a token (all counselors use same password)
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: counselors[0].email, password: counselors[0].password });
    counselorToken = loginRes.body.data.token;

    // Create one unclaimed lead
    const lead = await Lead.create({
      name: 'Hot Lead',
      email: 'hot@example.com',
      courseInterest: 'Computer Science',
      status: 'unclaimed',
    });
    leadId = lead._id.toString();
  });

  it('exactly one claim should succeed and four should get 409', async () => {
    // Fire 5 simultaneous claims using the SAME counselor token
    // (simulates 5 requests racing for one lead)
    const results = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        request(app)
          .post(`/api/leads/${leadId}/claim`)
          .set('Authorization', `Bearer ${counselorToken}`)
      )
    );

    const successCount = results.filter((r) => r.status === 200).length;
    const conflictCount = results.filter((r) => r.status === 409).length;

    expect(successCount).toBe(1);
    expect(conflictCount).toBe(4);

    // Verify the lead is now claimed
    const updatedLead = await Lead.findById(leadId);
    expect(updatedLead?.status).toBe('claimed');
    expect(updatedLead?.claimedBy).toBeDefined();
  });
});
