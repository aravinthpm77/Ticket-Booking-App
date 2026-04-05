# GOBus Ticketing & Fleet System

Full-stack bus ticket booking application for passengers and operators, built with React, Express, MySQL, and Clerk authentication.

## Overview

This repository includes:

- client: React frontend for passengers and operators
- server: Express API with MySQL and Clerk-based auth

## Structure

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

### 1) Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2) Configure server environment

Create `server/.env`:

```env
PORT=5000
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
CLERK_SECRET_KEY=your-clerk-secret-key
```

Required files:

- server/.env
- server/ca.pem

### 3) Start backend

```bash
cd server
npm run dev
```

API base URL: http://localhost:5000

### 4) Start frontend

```bash
cd client
npm start
```

Web app URL: http://localhost:3000

### 5) Frontend API base URL

Create `client/.env` for local development:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

In Vercel, add the same key in Project Settings -> Environment Variables:

```env
REACT_APP_API_BASE_URL=https://ticket-booking-app-h1ws.onrender.com
```

## API (Current)

Base path: /api

- Travels: GET /travels/me, POST /travels, PUT /travels/me
- Routes: POST /routes, GET /routes/me, PUT /routes/:id, DELETE /routes/:id
- Buses: POST /buses, GET /buses, DELETE /buses/:id
- Schedules: GET /schedules/all (public), GET /schedules, POST /schedules, PUT /schedules/:id, DELETE /schedules/:id

## Authentication

Clerk secures operator routes.

- Frontend: @clerk/clerk-react
- Backend: ClerkExpressRequireAuth

## Troubleshooting

- Server exits on startup: confirm PORT exists in server/.env
- Database connection fails: validate DB credentials and ca.pem file path
- 401 on protected routes: ensure auth token is sent in Authorization header
- CORS issues: verify allowed origins in backend CORS configuration

## License

No license file is currently defined.
