# API Modules

The Horizon Truth API is structured into several core modules, each responsible for a specific domain.

## Core Modules

### `users`
Handles user registration, profile management, and role assignment.

### `auth`
Stateless authentication logic using JWT and API Keys.

### `claims`
The heart of the system—tracks and manages public claims through their entire lifecycle.

### `reviews`
Facilitates community-driven verification and moderator oversight.

## Specialized Modules

### `engine`
The analysis engine that processes claims and generates automated scores.

### `gamification`
Manages user progress, achievements, and engagement rewards.

### `incidents`
Tracking system for reporting and managing platform-related issues.

### `analytics`
Aggregates data for dashboards and reporting.

### `organizations` & `players`
Entity management for verified organizations and high-profile individuals/entities.

---

For detailed API endpoint documentation, refer to the [Swagger UI] (if enabled at `/api/docs`).
