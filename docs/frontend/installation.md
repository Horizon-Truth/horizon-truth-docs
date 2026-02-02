# Frontend Installation

Follow these steps to set up the Horizon Truth Client on your local machine.

## Prerequisites
- **Node.js**: v18 or higher
- **yarn**: (Recommended) or **npm**

## Setup Steps

### 1. Installation
```bash
git clone https://github.com/Horizon-Truth/horizon-truth-client-v2.git
cd horizon-truth-client-v2
yarn install
```

### 2. Environment Configuration
Copy the development environment template:
```bash
cp .env.development .env.local
```
Update `VITE_API_URL` in `.env.local` to point to your running backend:
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Run the Application
Start the development server:
```bash
yarn dev
```
The application will be available at `http://localhost:5173`.

## Available Scripts
- `yarn dev`: Start development server with HMR.
- `yarn build`: Build for production.
- `yarn test`: Run unit tests.
- `yarn lint`: Run ESLint.
