# Client Architecture

The Horizon Truth Client follows a feature-based, modular architecture designed for high scalability and maintainability.

## Project Structure

The source code (`src/`) is organized into the following primary directories:

### `src/modules/`
This is the core of the application organization. Each distinct domain or feature of the application is encapsulated in its own module directory.
Examples include:
- `admin`, `analytics`, `auth`, `engine`, `gamification`, `dashboard`, `users`, `players`, etc.

Inside a module, you will typically find:
- **`components/`**: UI components specific to this module.
- **`pages/`**: Route-level React components for this module.
- **`hooks/`**: Custom React hooks housing business logic for this module.

### `src/shared/`
Contains global, reusable assets that are explicitly shared across multiple modules.
- **`components/`**: Reusable generic UI components (e.g., Buttons, Inputs, Modals, specialized Radix UI wrappers).
- **`hooks/`**: Global hooks (e.g., specific auth wrappers, theme hooks).

### `src/services/`
Contains API integration and data fetching logic setup. Often houses Axios instances and global query utilities.

### `src/store/`
Global state management using **Zustand**. Defines stores that need to be accessed globally outside of the standard React Query cache (e.g., active user session, UI theme state).

---

## Styling Architecture
The project heavily utilizes **Tailwind CSS v4**. Styling is kept local to components using utility classes, reducing the need for sprawling CSS files. Unified theme definitions and global CSS variables are concentrated within `src/index.css`.

## Data Fetching Architecture
Data fetching, caching, and synchronization are handled predominantly by **React Query**. This abstracts away loading states, error handling, and cache invalidation, ensuring the client remains smoothly in sync with the NestJS backend.
