# API Intro

The **Horizon Truth API** is the core backend engine for the platform. It is a secure, modular, and scalable API built with **NestJS**, **TypeORM**, and **PostgreSQL**.

## Architecture Principles

- **Modularity**: The backend is highly modular. Each domain (e.g., Auth, Users, Engine, Analytics) is encapsulated in its own NestJS module.
- **Stateless Authentication**: Uses JWT-based authentication combined with guards for Role-Based Access Control (RBAC).
- **Type Safety**: Strictly typed with TypeScript and validated at runtime using Zod and class-validator.
- **Data Integrity**: Uses TypeORM for robust migrations, seeding, and database transactions.

## Key Technologies
- **Framework**: [NestJS v11](https://nestjs.com/)
- **Language**: TypeScript v5.7
- **Database**: PostgreSQL
- **ORM**: [TypeORM](https://typeorm.io/)
- **Validation**: Zod & class-validator
- **Security**: Passport, bcrypt, Helmet, Throttler

Explore the [Modules](./modules) section to see a detailed breakdown of the features.
