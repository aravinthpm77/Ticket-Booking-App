# Booking Ticket Platform

Full-stack bus ticket booking application for passengers and operators, built with React, Express, MySQL, and Clerk authentication.

## Project Status

- Monorepo with separate client and server applications
- Core operator workflow implemented: travels profile, routes, buses, schedules
- Public schedule listing implemented for customer-side discovery

## Highlights

- Passenger-facing schedule discovery flow
- Operator dashboard with protected route access
- REST API with modular route handlers
- MySQL-backed persistence layer
- Clerk-powered authentication and authorization

## Architecture

```text
booking ticket/
  client/   React frontend (CRA + Tailwind)
  server/   Express API (ESM + MySQL)
```

## Tech Stack

### Frontend

- React 18
- React Router
- Tailwind CSS
- Framer Motion
- Clerk React SDK

### Backend

- Node.js (ES Modules)
- Express 5
- MySQL via mysql2
- Clerk Node SDK
- dotenv and nodemon

## Quick Start

### 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Configure backend environment

Create a .env file in server/:

```env
PORT=5000
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
CLERK_SECRET_KEY=your-clerk-secret-key
```

Required local files:

- server/.env
- server/ca.pem

### 3. Start backend

```bash
cd server
npm run dev
```

API base URL: http://localhost:5000

### 4. Start frontend

```bash
cd client
npm start
```

Web app URL: http://localhost:3000

## Available Scripts

### Client

- npm start: Runs the React development server
- npm run build: Creates production build artifacts
- npm test: Runs test suite

### Server

- npm run dev: Starts API with nodemon
- npm start: Starts API with node

## API Reference

Base path: /api

### Travels

- GET /travels/me (protected)
- POST /travels (protected)
- PUT /travels/me (protected)

### Routes

- POST /routes (protected)
- GET /routes/me (protected)
- PUT /routes/:id (protected)
- DELETE /routes/:id (protected)

### Buses

- POST /buses (protected)
- GET /buses (protected)
- DELETE /buses/:id (protected)

### Schedules

- GET /schedules/all (public)
- GET /schedules (protected)
- POST /schedules (protected)
- PUT /schedules/:id (protected)
- DELETE /schedules/:id (protected)

## Authentication

Authentication is handled with Clerk:

- Client integration: @clerk/clerk-react
- Server route protection: ClerkExpressRequireAuth

Use environment-specific Clerk keys for local, staging, and production.

## Configuration Notes

- Server listens on the value of PORT from server/.env
- Database configuration reads DB_* values from server/.env
- SSL CA certificate is read from server/ca.pem

## Known Gaps

- Frontend currently mixes local and hosted API URLs in some places
- Clerk publishable key is currently hardcoded in the client entry point

Recommended next step: move all API and auth configuration to environment variables for consistent local and production behavior.

## Troubleshooting

- Server exits on startup: confirm PORT exists in server/.env
- Database connection fails: validate DB credentials and ca.pem file path
- 401 on protected routes: ensure auth token is sent in Authorization header
- CORS issues: verify allowed origins in backend CORS configuration

## License

No license file is currently defined.
