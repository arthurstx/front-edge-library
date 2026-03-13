# Front-Edge Library - Especificações do Projeto

## 🚀 Visão Geral

Este projeto é uma biblioteca de componentes e funcionalidades construída com foco em performance, manutenibilidade e experiência do desenvolvedor.

### Tech Stack Principal

- **Framework:** React 19
- **Roteamento:** React Router v7
- **Data Fetching:** React Query v5 (@tanstack/react-query)
- **Estilização:** Tailwind CSS v4 (via @tailwindcss/vite)
- **Formulários:** React Hook Form + Zod
- **Componentes:** CVA (class-variance-authority) + clsx + tailwind-merge
- **Notificações:** Sonner
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
- Apply `className` via `cx(variants({ prop }), className)` — never pass `className` into `cva` directly
- Spread `...props` onto the root element
- Use native HTML elements where possible (e.g. `<div>`, `<span>`, `<button>`)

```tsx
export function Badge({ variant, size, className, children, ...props }) {
  return (
    <div className={cx(badgeVariants({ variant, size }), className)} {...props}>
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
| Styling library   | `cva` + `cx` from `class-variance-authority`         |
| Exports           | Named only (`export function`)                       |
| `className`       | Always via `cx(variants({...}), className)`          |
| `*Variants` const | Never exported                                       |
| Typing strategy   | `.d.ts` for complex, JSDoc for simple                |
| `.d.ts` variants  | Inline union types, never `VariantProps<typeof ...>` |
| HTML elements     | Prefer native over wrapper components                |
| Props             | Always spread `...props` onto root element           |

### Importação de SVGs

SVGs devem ser importados como componentes React através do sufixo `?react`:

```jsx
import MyIcon from './assets/my-icon.svg?react'

const Component = () => <MyIcon className="w-4 h-4" />
```

---

## 🎨 Guia de Estilização

- **Tailwind CSS v4:** Única fonte de estilos.
- **CSS Inline:** Proibido, exceto para valores dinâmicos calculados em tempo de execução que não podem ser resolvidos via classes.
- **Arquivos CSS:** Não crie arquivos `.css` por componente. Utilize as utilidades do Tailwind e o CVA para variantes.

---

## 📝 Guia de Formulários

Padrão obrigatório: **React Hook Form** + **Zod**.

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

## 🌐 Guia de Data Fetching

Utilize **React Query v5** para todas as interações assíncronas com APIs.

- Siga a convenção de Query Keys (arrays).
- Centralize hooks de mutation/query quando possível.

---

## 🔔 Notificações

Utilize o **Sonner** para feedbacks visuais.

```javascript
import { toast } from 'sonner'

toast.success('Operação realizada com sucesso!')
toast.error('Ocorreu um erro.')
```
