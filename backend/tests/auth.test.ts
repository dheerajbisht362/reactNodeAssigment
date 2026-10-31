import request from 'supertest';
import app from '../src/app';
import Employee from '../src/models/Employee';
import { connectDB, disconnectDB } from '../src/config/db';

describe('Auth Endpoints', () => {
  const baseURL = '/api/auth';
  const employeeData = {
    name: 'Test Employee',
    email: 'testemployee@example.com',
    password: 'TestPass123!',
  };

  beforeAll(async () => {
    await connectDB();
  }, 60000);

  afterAll(async () => {
    await disconnectDB();
  }, 30000);

  beforeEach(async () => {
    await Employee.deleteMany({});
  });

  describe('POST /auth/register', () => {
    it('should register a new employee and return a JWT', async () => {
      const res = await request(app).post(`${baseURL}/register`).send(employeeData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.employee.email).toBe(employeeData.email.toLowerCase());
      expect(res.body.data.employee.password).toBeUndefined();
      expect(res.body.data.employee.name).toBe(employeeData.name);
    });

    it('should return 400 for validation errors', async () => {
      const res = await request(app).post(`${baseURL}/register`).send({
        name: 'X',
        email: 'invalid-email',
        password: '123',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 409 for duplicate email', async () => {
      await Employee.create({
        name: 'Existing',
        email: 'testemployee@example.com',
        password: 'hashedpassword',
      });

      const res = await request(app).post(`${baseURL}/register`).send(employeeData);

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already registered');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await Employee.create({
        name: 'Test Employee',
        email: 'testemployee@example.com',
        password: 'TestPass123!',
      });
    });

    it('should login successfully and return a JWT', async () => {
      const res = await request(app).post(`${baseURL}/login`).send({
        email: 'testemployee@example.com',
        password: 'TestPass123!',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.employee.password).toBeUndefined();
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app).post(`${baseURL}/login`).send({
        email: 'testemployee@example.com',
        password: 'WrongPassword',
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 401 for non-existent user', async () => {
      const res = await request(app).post(`${baseURL}/login`).send({
        email: 'nonexistent@example.com',
        password: 'TestPass123!',
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
