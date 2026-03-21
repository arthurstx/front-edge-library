# Front-Edge Library - Project Specifications

## 🚀 Overview

This project is a component and functionality library built with a focus on performance, maintainability, and developer experience.

### Main Tech Stack

- **Framework:** React 19
- **Routing:** React Router v7
- **Forms:** React Hook Form + Zod
- **Components:** CVA (class-variance-authority) + clsx + tailwind-merge
- **Notifications:** Sonner
- **Bundler:** Vite 8
- **SVG:** vite-plugin-svgr

---

# Component Creation Conventions

## Stack

- `cva` + `cx` from `class-variance-authority` for variant styling
- React with TypeScript or JSDoc for typing

---

## Structure

### Variants

- Define all variants with `cva` as a **non-exported `const`**
- One `cva` call per visual concern (e.g. `badgeVariants`, `badgeTextVariants`, `badgeSkeletonVariants`)
- Always declare `defaultVariants`

```ts
const buttonVariants = cva('base-classes', {
  variants: {
    size: {
      sm: '...',
      md: '...',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
```

### Component

- Always use **named exports** (`export function Foo`, never `export default`)
- Apply `className` via `twMerge(variants({ prop }), className)` — never pass `className` into `cva` directly
- Spread `...props` onto the root element
- Use native HTML elements where possible (e.g. `<div>`, `<span>`, `<button>`)

```tsx
export function Badge({ variant, size, className, children, ...props }) {
  return (
    <div
      className={twMerge(badgeVariants({ variant, size }), className)}
      {...props}
    >
      <span className={badgeTextVariants({ size })}>{children}</span>
    </div>
  )
}
```

---

## Typing

### Use a `.d.ts` file when:

- The component has multiple props or complex types
- It is shared across many files
- Variants are non-trivial

```ts
// badge.d.ts
import * as React from 'react'

type BadgeVariant = 'none' | 'ghost'
type BadgeSize = 'xs' | 'sm'

export interface BadgeProps extends React.ComponentProps<'div'> {
  variant?: BadgeVariant
  size?: BadgeSize
  loading?: boolean
}
```

- **Never extend `VariantProps<typeof variants>`** — always inline the union types manually
- **Never export `*Variants`** from the component file — if the `.d.ts` needs variant types, declare them inline

Import in component:

```ts
import type { BadgeProps } from './types/badge'
```

### Use JSDoc when:

- The component is small and self-contained
- Props are few and simple

```jsx
/**
 * @param {{ rounded?: 'sm' | 'lg' | 'full', className?: string } & React.ComponentProps<'div'>} props
 */
export function Skeleton({ rounded, className, ...props }) { ... }
```

---

## Rules Summary

| Rule              | Detail                                               |
| ----------------- | ---------------------------------------------------- |
| Styling library   | `cx` from `class-variance-authority`                 |
| Styling library   | `twMerge` from `tailwind-merge`                      |
| Exports           | Named only (`export function`)                       |
| `className`       | Always via `twMerge(variants({...}), className)`     |
| `*Variants` const | Never exported                                       |
| Typing strategy   | `.d.ts` for complex, JSDoc for simple                |
| `.d.ts` variants  | Inline union types, never `VariantProps<typeof ...>` |
| HTML elements     | Prefer native over wrapper components                |
| Props             | Always spread `...props` onto root element           |

### SVG Imports

SVGs must be imported as React components using the `?react` suffix:

```jsx
import MyIcon from './assets/my-icon.svg?react'

const Component = () => <MyIcon className="w-4 h-4" />
```

---

## 🎨 Styling Guide

- **Tailwind CSS v4:** The sole source of styles.
- **Inline CSS:** Forbidden, except for dynamic values computed at runtime that cannot be resolved via utility classes.
- **CSS Files:** Do not create per-component `.css` files. Use Tailwind utilities and CVA for variants.

---

## 📝 Forms Guide

Required pattern: **React Hook Form** + **Zod**.

```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
})

const MyForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })
  // ...
}
```

---

## 🌐 Data Fetching Guide

Use **React Query v5** for all asynchronous API interactions.

- Follow the Query Keys convention (arrays).
- Centralize mutation/query hooks whenever possible.

---

## 🔔 Notifications

Use **Sonner** for visual feedback.

```javascript
import { toast } from 'sonner'

toast.success('Operation completed successfully!')
toast.error('An error occurred.')
```
