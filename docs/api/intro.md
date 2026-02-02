# API Intro

**Horizon Truth API** is the backend engine for the Horizon Truth platform. It is a high-performance, secure, and scalable API built with **NestJS**, **TypeORM**, and **PostgreSQL**.

## Project Mission
The API aims to provide a reliable source of truth for public claims, leveraging community verification and automated engine analysis.

## Key Features
- **Stateless Authentication**: JWT-based security with Passport.js.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for users, moderators, and admins.
- **Claim Lifecycle Management**: From submission to verification and archiving.
- **Engine Analytics**: Automated processing of claims.
- **Gamification**: Incentivizing community participation.

## Tech Stack
- **Framework**: [NestJS v11](https://nestjs.com/)
- **Language**: TypeScript v5.7
- **Database**: PostgreSQL (Production), SQLite (Development)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Validation**: Zod
