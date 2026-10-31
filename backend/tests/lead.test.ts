import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Employee from '../src/models/Employee';
import Lead from '../src/models/Lead';
import { connectDB, disconnectDB } from '../src/config/db';

describe('Lead Endpoints', () => {
  const baseURL = '/api/leads';
  let aliceToken: string;
  let bobToken: string;
  let aliceId: string;
  let bobId: string;

  const alice = { name: 'Alice Counselor', email: 'alice@crm.com', password: 'Password123!' };
  const bob = { name: 'Bob Counselor', email: 'bob@crm.com', password: 'Password123!' };

  const publicLead = {
    name: 'John Doe',
    email: 'john@example.com',
    courseInterest: 'Computer Science',
    message: 'Interested in CS program',
  };

  beforeAll(async () => {
    await connectDB();
  }, 60000);

  afterAll(async () => {
    await disconnectDB();
  }, 30000);

  beforeEach(async () => {
    await Employee.deleteMany({});
    await Lead.deleteMany({});

    await request(app).post('/api/auth/register').send(alice);
    const aliceLogin = await request(app).post('/api/auth/login').send({
      email: alice.email, password: alice.password,
    });
    aliceToken = aliceLogin.body.data.token;
    aliceId = aliceLogin.body.data.employee.id;

    await request(app).post('/api/auth/register').send(bob);
    const bobLogin = await request(app).post('/api/auth/login').send({
      email: bob.email, password: bob.password,
    });
    bobToken = bobLogin.body.data.token;
    bobId = bobLogin.body.data.employee.id;
  });

  describe('POST /leads/public (no auth)', () => {
    it('should create a public lead without authentication (201)', async () => {
      const res = await request(app).post(`${baseURL}/public`).send(publicLead);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.lead.status).toBe('unclaimed');
      expect(res.body.data.lead.claimedBy).toBeNull();
    });

    it('should reject unknown fields (strict validation)', async () => {
      const res = await request(app)
        .post(`${baseURL}/public`)
        .send({ ...publicLead, unknownField: 'should be rejected' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for missing required fields', async () => {
      const res = await request(app).post(`${baseURL}/public`).send({ name: 'No Email' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return existing lead if duplicate within 24 hours (200)', async () => {
      await request(app).post(`${baseURL}/public`).send(publicLead);
      const res = await request(app).post(`${baseURL}/public`).send(publicLead);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('already exists');
    });

    it('should create a new lead if different courseInterest', async () => {
      await request(app).post(`${baseURL}/public`).send(publicLead);
      const res = await request(app)
        .post(`${baseURL}/public`)
        .send({ ...publicLead, email: 'different@example.com', courseInterest: 'Law' });
      expect(res.status).toBe(201);
      expect(res.body.data.lead.courseInterest).toBe('Law');
    });
  });

  describe('GET /leads/unclaimed (auth required)', () => {
    beforeEach(async () => {
      for (let i = 0; i < 5; i++) {
        await Lead.create({ name: `Lead ${i}`, email: `lead${i}@example.com`, courseInterest: 'Computer Science', status: 'unclaimed' });
      }
      await Lead.create({ name: 'Claimed Lead', email: 'claimed@example.com', courseInterest: 'Law', status: 'claimed', claimedBy: new mongoose.Types.ObjectId(aliceId), claimedAt: new Date() });
    });

    it('should return only unclaimed leads with pagination', async () => {
      const res = await request(app).get(`${baseURL}/unclaimed`).set('Authorization', `Bearer ${aliceToken}`).query({ page: 1, limit: 3 });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.leads.length).toBe(3);
      expect(res.body.data.pagination.total).toBe(5);
      expect(res.body.data.pagination.totalPages).toBe(2);
      res.body.data.leads.forEach((lead: any) => expect(lead.status).toBe('unclaimed'));
    });

    it('should return 401 without token', async () => {
      const res = await request(app).get(`${baseURL}/unclaimed`);
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('claimed leads should not appear in unclaimed list', async () => {
      const res = await request(app).get(`${baseURL}/unclaimed`).set('Authorization', `Bearer ${aliceToken}`);
      const claimedLead = res.body.data.leads.find((l: any) => l.email === 'claimed@example.com');
      expect(claimedLead).toBeUndefined();
    });
  });

  describe('POST /leads/:id/claim (auth required)', () => {
    let unclaimedLeadId: string;
    beforeEach(async () => {
      const lead = await Lead.create({ name: 'Unclaimed Lead', email: 'unclaimed@example.com', courseInterest: 'Business Administration', status: 'unclaimed' });
      unclaimedLeadId = lead._id.toString();
    });

    it('should claim a lead successfully', async () => {
      const res = await request(app).post(`${baseURL}/${unclaimedLeadId}/claim`).set('Authorization', `Bearer ${aliceToken}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.lead.status).toBe('claimed');
      expect(res.body.data.lead.claimedBy).toBe(aliceId);
      expect(res.body.data.lead.claimedAt).toBeDefined();
    });

    it('should return 409 when a second counselor claims the same lead', async () => {
      await request(app).post(`${baseURL}/${unclaimedLeadId}/claim`).set('Authorization', `Bearer ${aliceToken}`);
      const res = await request(app).post(`${baseURL}/${unclaimedLeadId}/claim`).set('Authorization', `Bearer ${bobToken}`);
      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already claimed');
    });

    it('should return 404 for non-existent lead', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).post(`${baseURL}/${fakeId}/claim`).set('Authorization', `Bearer ${aliceToken}`);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for invalid ObjectId', async () => {
      const res = await request(app).post(`${baseURL}/invalid-id/claim`).set('Authorization', `Bearer ${aliceToken}`);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /leads/my (auth required)', () => {
    beforeEach(async () => {
      for (let i = 0; i < 2; i++) {
        await Lead.create({ name: `Alice Lead ${i}`, email: `alicelead${i}@example.com`, courseInterest: 'Computer Science', status: 'claimed', claimedBy: new mongoose.Types.ObjectId(aliceId), claimedAt: new Date() });
      }
      await Lead.create({ name: 'Bob Lead', email: 'boblead@example.com', courseInterest: 'Law', status: 'claimed', claimedBy: new mongoose.Types.ObjectId(bobId), claimedAt: new Date() });
    });

    it('should return only the authenticated employee\'s claimed leads', async () => {
      const res = await request(app).get(`${baseURL}/my`).set('Authorization', `Bearer ${aliceToken}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.leads.length).toBe(2);
      res.body.data.leads.forEach((lead: any) => expect(lead.claimedBy).toBe(aliceId));
    });

    it('should support ?search= on name/email', async () => {
      const res = await request(app).get(`${baseURL}/my`).set('Authorization', `Bearer ${aliceToken}`).query({ search: 'Alice Lead 0' });
      expect(res.status).toBe(200);
      expect(res.body.data.leads.length).toBe(1);
      expect(res.body.data.leads[0].name).toContain('Alice Lead 0');
    });

    it('should support pagination', async () => {
      const res = await request(app).get(`${baseURL}/my`).set('Authorization', `Bearer ${aliceToken}`).query({ page: 1, limit: 1 });
      expect(res.status).toBe(200);
      expect(res.body.data.leads.length).toBe(1);
      expect(res.body.data.pagination.totalPages).toBe(2);
    });
  });

  describe('POST /leads/:id/release (auth required)', () => {
    let claimedLeadId: string;
    beforeEach(async () => {
      const lead = await Lead.create({ name: 'Claimed Lead', email: 'claimedrelease@example.com', courseInterest: 'Data Science', status: 'claimed', claimedBy: new mongoose.Types.ObjectId(aliceId), claimedAt: new Date() });
      claimedLeadId = lead._id.toString();
    });

    it('should release a lead back to unclaimed (owner only)', async () => {
      const res = await request(app).post(`${baseURL}/${claimedLeadId}/release`).set('Authorization', `Bearer ${aliceToken}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.lead.status).toBe('unclaimed');
      expect(res.body.data.lead.claimedBy).toBeNull();
      expect(res.body.data.lead.claimedAt).toBeNull();
    });

    it('should return 403 when non-owner tries to release', async () => {
      const res = await request(app).post(`${baseURL}/${claimedLeadId}/release`).set('Authorization', `Bearer ${bobToken}`);
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should return 404 for non-existent lead', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).post(`${baseURL}/${fakeId}/release`).set('Authorization', `Bearer ${aliceToken}`);
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
