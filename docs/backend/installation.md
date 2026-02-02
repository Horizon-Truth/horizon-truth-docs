# Backend Installation

Follow these steps to set up the Horizon Truth API on your local machine.

## Prerequisites
- **Node.js**: v18 or higher
- **npm** or **yarn**
- **PostgreSQL**: (Optional for local development, uses SQLite by default)

## Setup Steps

### 1. Installation
```bash
git clone https://github.com/Horizon-Truth/horizon-truth-api-v2
cd horizon-truth-api-v2
npm install
```

### 2. Environment Configuration
Copy the development environment template:
```bash
cp .env.development .env
```
Open `.env` and configure your database settings if you're not using the default SQLite setup.

### 3. Run the Application
Start the development server with hot-reload:
```bash
npm run dev
```
The API will be available at `http://localhost:3000`.

## Available Scripts
- `npm run start:dev`: Start with watch mode.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.
- `npm run test`: Run unit tests.
