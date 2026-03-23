# Conventions

This document defines the folder structure and architectural patterns of the project. For API and data fetching, see `api.md`. For forms and validation, see `forms.md`. For components, see `components.md`.

---

## 1. Folder Structure

```
src/
├── assets/       # Static files (images, SVGs)
├── components/   # Shared, reusable UI components (design system)
│   └── types/    # Component-level type definitions
├── contexts/     # Feature modules (see Section 2)
├── helper/       # Utility functions and the API client
├── pages/        # Top-level route components
└── types/        # Global/shared type definitions
```

### `src/assets/`

Static files. SVGs are imported as React components using the `?react` suffix:

```js
import Logo from '../assets/logo.svg?react'
```

### `src/components/`

Generic, reusable UI primitives that are not tied to any feature (e.g., `Button`, `Badge`, `Skeleton`, `Text`). If a component is used by more than one feature, it belongs here.

### `src/contexts/`

Feature modules. See Section 2.

### `src/helper/`

Utility functions and the centralized API client (`api.js`). No business logic — only pure utilities and the HTTP layer.

### `src/pages/`

Top-level route components. One file per route. Pages are thin — they import feature components and compose the layout. No business logic or API calls directly in pages.

### `src/types/`

Global TypeScript/JSDoc type definitions shared across multiple features.

---

## 2. Feature Architecture (`src/contexts/`)

Despite being named `contexts/`, this folder follows a **Feature-Based Architecture**. Each subdirectory is a self-contained domain module.

### Structure

```
contexts/
└── <domain>/               # e.g., auth, dashboard, rentals
    └── <sub-feature>/      # e.g., login, register
        ├── components/     # UI components exclusive to this feature
        ├── hooks/          # Business logic and React Query calls
        └── models/         # Zod schemas and data definitions
```

### Example

```
contexts/
└── auth/
    ├── login/
    │   ├── components/
    │   │   └── login-form.jsx
    │   ├── hooks/
    │   │   └── use-auth.js
    │   └── models/
    │       └── schemas.js
    └── register/
        ├── components/
        ├── hooks/
        └── models/
```

### Folder Responsibilities

| Folder        | Responsibility                                                      |
| ------------- | ------------------------------------------------------------------- |
| `components/` | UI components used only within this feature                         |
| `hooks/`      | Business logic, React Query (`useQuery`/`useMutation`), local state |
| `models/`     | Zod schemas and data shape definitions                              |

- A feature's `components/` must **not** be imported by other features. If sharing is needed, move the component to `src/components/`.
- All API calls for a feature are encapsulated in its `hooks/` folder.
- Zod schemas are defined once in `models/schemas.js` and never duplicated.

---

## 3. Routing

All route definitions live in `src/App.jsx`. Do not define routes in any other file.

---

## 4. File Naming

All files use **kebab-case**:

| Type      | Example              |
| --------- | -------------------- |
| Component | `login-form.jsx`     |
| Hook      | `use-auth.js`        |
| Schema    | `schemas.js`         |
| Page      | `dashboard-page.jsx` |
| Utility   | `format-date.js`     |

> Function and component names inside files follow their own conventions — PascalCase for React components, `use` + camelCase for hooks.

---

## 5. What NOT to Do

- Do **not** put feature-specific components in `src/components/`.
- Do **not** import components from one feature into another — extract to `src/components/` instead.
- Do **not** write business logic or call APIs directly in pages — always go through a hook in `hooks/`.
- Do **not** define routes outside of `src/App.jsx`.
- Do **not** duplicate Zod schemas — define once in `models/schemas.js` and reuse.
