# Backend Documentation - horizon-truth-api-v2

Welcome to the documentation for the **Horizon Truth Backend**.

## Overview
This project is a NestJS application providing a RESTful API for the Horizon Truth system.

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Redis (optional, for caching)

### Installation
```bash
cd horizon-truth-api-v2
npm install
```

### Running Locally
```bash
npm run start:dev
```

## API Modules
- `src/auth`: Authentication and authorization logic.
- `src/users`: User management.
- `src/attendance`: Attendance tracking features.
