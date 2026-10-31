## Running Tests

Integration tests use **Jest + Supertest** against your MongoDB Atlas cluster (separate test database `crm_test`).

```bash
npm test
```

Tests cover:
- Register / Login / Duplicate email (409) / Invalid credentials (401)
- Public lead creation without token
- Strict validation rejecting unknown fields
- 24-hour duplicate detection (returns existing lead 200)
- Unclaimed lead list with pagination
- Claim success, second counselor gets 409
- Claimed leads disappear from unclaimed
- `/leads/my` returns only owner's leads with pagination and search
- Invalid ObjectId returns 400
- Release lead (owner 200, non-owner 403, non-existent 404)
- **Concurrency**: 5 simultaneous claims → exactly 1 succeeds, 4 get 409

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Start production server |
| `npm run seed` | Seed database with 2 employees and 15 leads |
| `npm test` | Run integration test suite |

## Response Format

All responses follow a consistent shape:

```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## License

ISC

## API Endpoints

Base path: `/api`

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register employee, returns JWT | No |
| POST | `/auth/login` | Login, returns JWT | No |

### Leads

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/leads/public` | Submit public enquiry (creates unclaimed lead) | No |
| GET | `/leads/unclaimed` | List unclaimed leads (paginated) | Yes |
| POST | `/leads/:id/claim` | Claim an unclaimed lead | Yes |
| GET | `/leads/my` | List my claimed leads (paginated, searchable) | Yes |
| POST | `/leads/:id/release` | Release my claimed lead back to unclaimed | Yes |

### System

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/health` | Health check | No |
| GET | `/api/docs` | Swagger UI documentation | No |

## Example cURL Requests

### 1. Register an employee

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Counselor","email":"alice@crm.com","password":"Password123!"}'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@crm.com","password":"Password123!"}'
```

Save the returned `token` for authenticated requests.

### 3. Submit a public enquiry (no auth)

```bash
curl -X POST http://localhost:5000/api/leads/public \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","courseInterest":"Computer Science","message":"Interested in CS"}'
```

### 4. Get unclaimed leads (auth required)

```bash
curl -X GET "http://localhost:5000/api/leads/unclaimed?page=1&limit=10" \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 5. Claim a lead (auth required)

```bash
curl -X POST http://localhost:5000/api/leads/<LEAD_ID>/claim \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 6. Get my claimed leads (auth required)

```bash
curl -X GET "http://localhost:5000/api/leads/my?page=1&limit=10&search=John" \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 7. Release a claimed lead (auth required, owner only)

```bash
curl -X POST http://localhost:5000/api/leads/<LEAD_ID>/release \
  -H "Authorization: Bearer <your-jwt-token>"
```

### 8. Health check

```bash
curl http://localhost:5000/api/health
```

# CRM Backend REST API

Production-quality CRM REST API built with **Node.js, Express, TypeScript, MongoDB (Mongoose), and JWT**.

## Features

- **Employee authentication**: Register / Login with JWT (1-day expiry), bcrypt password hashing
- **Public enquiry form**: `POST /api/leads/public` — no auth required, strict zod validation, 24-hour duplicate detection
- **Lead claiming**: Employees claim unclaimed leads atomically (prevents double-claiming)
- **My leads**: Employees see only their own claimed leads with pagination and search
- **Lead release**: Owners can release a claimed lead back to the public pool
- **Security**: Helmet, CORS, express-mongo-sanitize (NoSQL injection), express-rate-limit on public/auth routes
- **Validation**: Zod strict schemas (reject unknown fields)
- **Error handling**: Centralized middleware, consistent `{ success, message, data }` response shape
- **Docs**: Swagger UI at `/api/docs`
- **Logging**: Morgan request logger
- **Graceful shutdown**: SIGTERM/SIGINT handling

## Folder Structure

```
backend/
├── src/
│   ├── config/        # env validation (zod), db connection
│   ├── controllers/   # authController, leadController
│   ├── middlewares/   # auth, validate, errorHandler
│   ├── models/        # Employee, Lead (Mongoose)
│   ├── routes/        # authRoutes, leadRoutes
│   ├── scripts/       # seed script
│   ├── swagger/       # Swagger OpenAPI options
│   ├── utils/         # ApiError, asyncHandler
│   ├── app.ts         # Express app setup
│   └── server.ts      # Server entry + graceful shutdown
├── tests/             # Jest + Supertest integration tests
├── .env               # Environment variables (local)
├── .env.example       # Example environment variables
├── .gitignore
├── backend.api.http   # REST client request file
├── jest.config.js
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js v18+ (tested on v24)
- npm
- MongoDB Atlas cluster (connection string provided in `.env.example`)

## Setup

### 1. Install dependencies

```bash
cd d:\Home\backend
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` (already created) and ensure `MONGODB_URI` points to your Atlas cluster:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.xxx.mongodb.net/crm?retryWrites=true&w=majority
JWT_SECRET=<your-secret>
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
```

### 3. Seed the database (optional)

Creates 2 employees and 15 leads:

```bash
npm run seed
```

Seed credentials:
- `alice@crm.com` / `Password123!`
- `bob@crm.com` / `Password123!`

### 4. Run the server

Development (with auto-reload):
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```

Server runs at `http://localhost:5000`. Swagger docs at `http://localhost:5000/api/docs`.
