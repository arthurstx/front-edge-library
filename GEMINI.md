# Front-Edge Library - AI Guidelines

You are assisting with the **Front-Edge Library** project. To remain fast and efficient, avoid guessing project-specific patterns. Consult the localized knowledge base located at `.antigravity/knowledge/` before generating code.

## Knowledge Base Map (When to read what)

Before starting a task, identify the domain and **always use your file reading tools to check the appropriate `.md` file** below:

- **`.antigravity/knowledge/components.md`** 
  👉 **Read when:** Creating or refactoring UI components (Cards, Tables, Badges, Modals, etc).
  *What it contains:* Rules for `cva` variants, `tailwind-merge`, SVGs, barrel file structures, and composition over props.

- **`.antigravity/knowledge/forms.md`**
  👉 **Read when:** Implementing forms, inputs, validations, or submission logic.
  *What it contains:* Standards for `react-hook-form`, `zod` schemas, and the internal form components (`Field`, `Control`, `Label`, `Error`).

- **`.antigravity/knowledge/api.md`**
  👉 **Read when:** Developing data fetching, mutations, or API integration.
  *What it contains:* Rules for `axios` instances, endpoints, React Query, and error handling patterns.

- **`.antigravity/knowledge/conventions.md`**
  👉 **Read when:** Structuring new folders, creating utility functions, or needing general project guidelines.
  *What it contains:* Global naming conventions, file architecture, and coding standards.

- **`.antigravity/knowledge/stack.md`**
  👉 **Read when:** Need context on allowed libraries and the technology stack.
  *What it contains:* The exact stack details (React, Vite, Tailwind v4, dependencies).

---

## 🛑 Core Unbreakable Rules (Memorize these)
To save processing time, memorize these universal rules for this workspace:

1. **Exports:** ALWAYS use named exports (`export function Component()`). NEVER use `export default`.
2. **Composition:** NEVER pass textual content via props (`title="Hello"` ou `label="Close"`). ALWAYS use `children` or specific compositional sub-components.
3. **File Strictness:** STRICTLY ONE component per `.jsx` file. Group sub-components in a folder with an `index.js` barrel file.
4. **Styling:** ALWAYS use Tailwind CSS v4 class names combined with `twMerge` and `cva`. NO inline styles unless strictly dynamic.
