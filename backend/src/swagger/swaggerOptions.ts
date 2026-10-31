import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM Backend API',
      version: '1.0.0',
      description: 'CRM REST API for employee/counselor lead management with JWT authentication',
    },
    servers: [
      { url: 'http://localhost:5000/api', description: 'Server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token: Bearer <token>',
        },
      },
      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', minLength: 2, maxLength: 100, description: 'Employee name' },
            email: { type: 'string', format: 'email', description: 'Employee email' },
            password: { type: 'string', minLength: 6, description: 'Password (min 6 chars)' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', description: 'Employee email' },
            password: { type: 'string', minLength: 1, description: 'Password' },
          },
        },
        EmployeeResponse: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Employee ID' },
            name: { type: 'string', description: 'Employee name' },
            email: { type: 'string', format: 'email', description: 'Employee email' },
          },
        },
        LeadResponse: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Lead ID' },
            name: { type: 'string', description: 'Lead name' },
            email: { type: 'string', format: 'email', description: 'Lead email' },
            phone: { type: 'string', nullable: true, description: 'Lead phone' },
            courseInterest: { type: 'string', description: 'Course interest' },
            message: { type: 'string', nullable: true, description: 'Lead message' },
            status: { type: 'string', enum: ['unclaimed', 'claimed'], description: 'Lead status' },
            claimedBy: { type: 'string', nullable: true, description: 'Employee ID who claimed' },
            claimedAt: { type: 'string', format: 'date-time', nullable: true, description: 'Claim timestamp' },
            createdAt: { type: 'string', format: 'date-time', description: 'Created at' },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Current page' },
            limit: { type: 'number', description: 'Items per page' },
            total: { type: 'number', description: 'Total leads' },
            totalPages: { type: 'number', description: 'Total pages' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts', './src/app.ts'],
};

