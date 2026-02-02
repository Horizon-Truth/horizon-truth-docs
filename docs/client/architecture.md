# Client Architecture

The Horizon Truth Client follows a modular component-based architecture designed for scalability and maintainability.

## Project Structure

### `src/components`
Contains reusable UI components.
- `common/`: Shared base components (Buttons, Inputs, Modals).
- `layout/`: Global layouts (Navigation, Footer, Sidebars).
- `features/`: Complex UI blocks specific to platform features (Claim Cards, Review Forms).

### `src/hooks`
Custom React hooks for encapsulating business logic and data fetching.

### `src/stores` (or States)
Global state management using Context API or dedicated stores.

### `src/utils` & `src/types`
Helpers, formatters, and global TypeScript interfaces.

---

## Styling Pattern
The project uses **Tailwind CSS 4** for styling. We prioritize utility classes but maintain consistency through a unified theme definition in `src/index.css`.

## API Integration
Data fetching is handled via custom hooks, interacting with the Horizon Truth REST API.
