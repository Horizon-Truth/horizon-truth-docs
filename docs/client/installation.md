# Client Installation

Follow these steps to set up the Horizon Truth Client on your local machine.

## Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **npm** (the default package manager used in this project)

## Setup Steps

### 1. Installation
Navigate to the frontend directory and install the dependencies:
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create a `.env.local` or `.env` file in the `frontend` root to configure your environment variables. 
Ensure your Vite API URL points to the local NestJS backend:

```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Run the Application
Start the development server with HMR (Hot Module Replacement):
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Available Scripts
- `npm run dev`: Start development server with Vite.
- `npm run build`: Compile TypeScript and build for production.
- `npm run lint`: Run ESLint.
- `npm run test`: Run unit tests using Vitest.
- `npm run test:ui`: Run Vitest with the UI interface.
- `npm run preview`: Preview the production build locally.
