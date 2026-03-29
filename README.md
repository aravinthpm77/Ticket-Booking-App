# Booking Ticket Platform

A full-stack bus ticket booking platform with customer search and operator management workflows.

## Overview

This repository contains two applications:

- **Client**: React application for passengers and bus operators
- **Server**: Node.js + Express REST API with MySQL persistence and Clerk authentication

The platform supports:

- Public schedule discovery for passengers
- Operator onboarding and protected dashboard access
- Travel company profile management
- Route, bus, and schedule CRUD operations

## Tech Stack

### Frontend (client)

- React 18
- React Router
- Tailwind CSS
- Framer Motion
- Clerk React SDK

### Backend (server)

- Node.js (ES Modules)
- Express 5
- MySQL (`mysql2`)
- Clerk Node SDK
- dotenv + nodemon

## Repository Structure

```text
booking ticket/
  client/   # React frontend
  server/   # Express backend API
```

## Prerequisites

Install the following before running locally:

- Node.js 18+ and npm
- MySQL database (or compatible managed MySQL)
- Clerk account and API credentials
- SSL CA certificate file for DB connection (`server/ca.pem`)

## Environment Configuration

Create a `.env` file inside `server/`:

```env
PORT=5000
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
CLERK_SECRET_KEY=your-clerk-secret-key
```

Notes:

- `PORT` is required by `server.js`.
- The DB pool loads environment variables from `server/.env`.
- The database config expects `server/ca.pem` to exist.

## Installation

From the repository root, install dependencies for both apps:

```bash
cd client
npm install

cd ../server
npm install
```

## Running the Project

Run each app in a separate terminal.

### 1) Start backend

```bash
cd server
npm run dev
```

Default API URL:

- `http://localhost:5000`

### 2) Start frontend

```bash
cd client
npm start
```

Default web URL:

- `http://localhost:3000`

## Available Scripts

### Client (`client/package.json`)

- `npm start` - start development server
- `npm run build` - build production bundle
- `npm test` - run tests

### Server (`server/package.json`)

- `npm run dev` - start API with nodemon
- `npm start` - start API with node

## API Surface (Current)

Base path: `/api`

- `GET /travels/me` (protected)
- `POST /travels` (protected)
- `PUT /travels/me` (protected)
- `POST /routes` (protected)
- `GET /routes/me` (protected)
- `PUT /routes/:id` (protected)
- `DELETE /routes/:id` (protected)
- `POST /buses` (protected)
- `GET /buses` (protected)
- `DELETE /buses/:id` (protected)
- `GET /schedules/all` (public)
- `GET /schedules` (protected)
- `POST /schedules` (protected)
- `PUT /schedules/:id` (protected)
- `DELETE /schedules/:id` (protected)

## Authentication

Clerk is used for operator authentication.

- Frontend uses `@clerk/clerk-react`
- Backend protects routes with `ClerkExpressRequireAuth`

Ensure Clerk publishable and secret keys are configured appropriately for each environment.

## Deployment Notes

- Configure CORS in production to allow only trusted frontend origins.
- Replace hardcoded API URLs in the frontend with environment-driven configuration.
- Keep Clerk keys and DB credentials in secure environment variables.
- Use managed secrets in CI/CD and hosting platforms.

## Troubleshooting

- **Server exits on startup**: verify `PORT` is set in `server/.env`.
- **DB connection fails**: verify DB credentials and `server/ca.pem` path.
- **401 on protected routes**: verify Clerk token is included in `Authorization` header.
- **Mixed API behavior (local vs hosted)**: standardize API base URL configuration in client code.

## License

No license file is currently defined. Add a `LICENSE` file if you plan to distribute this project.
