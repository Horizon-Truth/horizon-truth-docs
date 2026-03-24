# API Modules

The Horizon Truth Backend is organized into specialized NestJS modules, located in `backend/src/`.

Below is a breakdown of the core modules driving the platform:

## Core Modules

### `auth` & `users`
Handles user registration, login, stateless authentication using JWT, and profile/role management.

### `database`
Centralizes database configuration and TypeORM connection logic.

### `engine` & `gamification`
The core analysis engine that processes user interactions, scores them, and directly manages the gamification layer (achievements, badges, progression).

### `organizations` & `players`
Entity management for verified organizations and tracking the stats and scenarios for players.

### `analytics` & `telemetry`
Aggregates session data, user telemetry, and engine performance metrics for dashboards.

### `audit-logs` & `reports` & `incidents`
Tracks user actions for security, generates platform-wide reports, and handles incident management.

### `contacts`, `feedback`, `newsletter`, `blogs`
Communication and engagement modules to handle support contacts, user feedback, marketing newsletters, and blog posts.

### `resources`
Manages static and dynamic assets needed by the platform.

### `shared`
Contains shared utilities, constants, decorators, and generic guards used across multiple modules.

---

> **Tip**: All controllers are automatically documented using Swagger. When the backend is running, you can typcally visit `/api` (or the configured swagger path) to interact with the interactive API documentation.
