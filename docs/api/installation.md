# API Installation

Follow these steps to set up the Horizon Truth Backend (API) on your local machine.

## Prerequisites

- **Node.js**: v18 or higher (v20+ recommended)
- **npm**
- **PostgreSQL**: A running PostgreSQL instance

## Setup Steps

### 1. Installation

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### 2. Environment Configuration

You must set up your environment variables. Create a `.env` file in the `backend` directory based on the expected environment variables for PostgreSQL connection, JWT secrets, etc.

Example `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=horizon_db
JWT_SECRET=supersecret
```

### 3. Database Seeding

The backend includes seeder scripts to populate your database with initial data (like admin accounts or default game scenarios).
To run the seeder:
```bash
npm run seed
```
To seed an admin account:
```bash
npm run seed:admin
```

### 4. Run the Application

Start the development server with hot-reload enabled:
```bash
npm run start:dev
```
The API will be available at `http://localhost:3000`.

## Available Scripts

- `npm run start:dev`: Start development mode (watch).
- `npm run build`: Build for production.
- `npm run format`: Format code with Prettier.
- `npm run lint`: Run ESLint to fix code style issues.
- `npm run test`: Run automated unit tests using Jest.
