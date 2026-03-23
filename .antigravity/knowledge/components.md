# Component Creation Conventions

## Stack

- `cva` + `cx` from `class-variance-authority` for variant styling
- `twMerge` from `tailwind-merge` for className merging
- React with **JSDoc** for typing — `.d.ts` only for complex/shared prop types
- Component files use `.jsx` extension exclusively

---

## ⚠️ Core Philosophy: Composition over Props-as-Content

Components **must never** receive content through props like `text`, `label`, `title`, `description`, etc.  
Content is always passed as **`children`** or via **sub-components**, following the same pattern as ShadCN, Radix UI, and other modern libraries.

### ❌ Never do this

```jsx
<Card title="Hello" description="World" footer="OK" />
<Paragraph text="Some content" />
<Badge label="New" />
<Modal header="Confirm" body="Are you sure?" />
```

### ✅ Always do this

```jsx
<Card>
  <CardHeader>
    <CardTitle>Hello</CardTitle>
    <CardDescription>World</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>OK</CardFooter>
</Card>

<Paragraph>Some content</Paragraph>
<Badge>New</Badge>

<Modal>
  <ModalHeader>Confirm</ModalHeader>
  <ModalBody>Are you sure?</ModalBody>
</Modal>
```

### Why

- Consumers control markup, order, and nesting freely
- Each sub-component is individually styleable via `className`
- Follows the open/closed principle — extensible without changing the API
- Consistent with the ecosystem (ShadCN, Radix, Headless UI, etc.)

---

## 📁 One Component Per File

**Each file must export exactly one component.** Sub-components of a composite (e.g. `CardHeader`, `CardTitle`) live in their own files.  
Group them inside a folder named after the component family.

### ❌ Never do this

```
card/
└── card.jsx  ← exports Card, CardHeader, CardTitle, CardContent, CardFooter all at once
```

```jsx
// card.jsx ❌
export function Card() { ... }
export function CardHeader() { ... }
export function CardTitle() { ... }
export function CardContent() { ... }
export function CardFooter() { ... }
```

### ✅ Always do this

```
card/
├── card.jsx
├── card-header.jsx
├── card-title.jsx
├── card-content.jsx
├── card-footer.jsx
├── card.d.ts          → only if prop types are complex or shared across many files
└── index.js           → re-exports everything
```

```js
// card/index.js ✅
export { Card } from './card'
export { CardHeader } from './card-header'
export { CardTitle } from './card-title'
export { CardContent } from './card-content'
export { CardFooter } from './card-footer'
```

Consumers import from the folder, never from individual files:

```jsx
// ✅
import { Card, CardHeader, CardTitle } from '@/components/card'

// ❌
import { Card } from '@/components/card/card'
import { CardHeader } from '@/components/card/card-header'
```

### Why

- Each file has a single responsibility — easy to locate, test, and replace
- Avoids growing files that mix unrelated logic
- The `index.js` barrel keeps the public API clean and stable

---

## Structure

### Variants

- Define all variants with `cva` as a **non-exported `const`**
- One `cva` call per visual concern (e.g. `cardVariants`, `cardHeaderVariants`)
- Always declare `defaultVariants`
- Each `*Variants` const lives in the **same file as its component** — never in a shared variants file

```jsx
// card/card.jsx
const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export function Card({ size, className, children, ...props }) {
  return (
    <div className={twMerge(cardVariants({ size }), className)} {...props}>
      {children}
    </div>
  )
}
```

### Component

- All component files use **`.jsx` extension**
- Always use **named exports** (`export function Foo`, never `export default`)
- Apply `className` via `twMerge(variants({ prop }), className)` — never pass `className` into `cva` directly
- Spread `...props` onto the root element
- Use native HTML elements where possible (`<div>`, `<span>`, `<p>`, `<button>`, `<section>`, etc.)
- **Prefer `children` over any content prop** — if in doubt, use `children`
- **One component per file, always**

```jsx
// card/card-title.jsx ✅ — one component, one file
const cardTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight',
)

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={twMerge(cardTitleVariants(), className)} {...props}>
      {children}
    </h3>
  )
}
```

---

## When to Create Sub-components

Split into sub-components whenever a component has **distinct visual regions** (header, body, footer, label, icon, etc.).  
Each sub-component goes into its **own `.jsx` file** inside the component folder.

| Monolithic ❌            | Compositional ✅                                   |
| ------------------------ | -------------------------------------------------- |
| `<Card title footer />`  | `<Card><CardHeader /><CardFooter /></Card>`        |
| `<Alert icon message />` | `<Alert><AlertIcon /><AlertDescription /></Alert>` |
| `<Input label error />`  | `<Field><Label /><Input /><FieldError /></Field>`  |
| `<Badge text="New" />`   | `<Badge>New</Badge>`                               |

**Rule of thumb:** if it renders text or markup, it's a child — not a prop.

---

## Typing

The project uses **JavaScript only** — no `.tsx` or `.ts` files.  
There are two typing strategies depending on complexity:

### JSDoc — default for simple props

Use JSDoc directly in the `.jsx` file when the component has few props or they are self-explanatory:

```jsx
/**
 * @param {{ size?: 'sm' | 'md', className?: string, children: import('react').ReactNode }} props
 */
export function Card({ size, className, children, ...props }) { ... }
```

### `.d.ts` — for complex or shared prop types

Create a `component-name.d.ts` file **only when**:

- The component has many props
- Types are reused across multiple files
- Variants or unions are non-trivial

```
card/
└── card.d.ts
```

```ts
// card/card.d.ts
import * as React from 'react'

type CardSize = 'sm' | 'md'

export interface CardProps extends React.ComponentProps<'div'> {
  size?: CardSize
}

export interface CardHeaderProps extends React.ComponentProps<'div'> {}
export interface CardTitleProps extends React.ComponentProps<'h3'> {}
export interface CardContentProps extends React.ComponentProps<'div'> {}
export interface CardFooterProps extends React.ComponentProps<'div'> {}
```

One `.d.ts` per component family, placed inside the folder. It holds types for all sub-components of that family.

---

## Rules Summary

| Rule                   | Detail                                                         |
| ---------------------- | -------------------------------------------------------------- |
| File extension         | `.jsx` for all components, `.js` for barrel `index.js`         |
| Styling library        | `cx` from `class-variance-authority`                           |
| Styling library        | `twMerge` from `tailwind-merge`                                |
| Exports                | Named only (`export function`)                                 |
| `className`            | Always via `twMerge(variants({...}), className)`               |
| `*Variants` const      | Never exported, lives in same file as its component            |
| Typing strategy        | JSDoc by default — `.d.ts` only for complex/shared types       |
| `.d.ts` variants       | Inline union types, never `VariantProps<typeof ...>`           |
| HTML elements          | Prefer native over wrapper components                          |
| Props                  | Always spread `...props` onto root element                     |
| **Content via props**  | **Forbidden** — use `children` or sub-components               |
| **Sub-components**     | **Required** for distinct regions (header, body, footer, etc.) |
| **Prop naming**        | Never `text=`, `label=`, `title=` for rendered content         |
| **One component/file** | **Strictly one `export function` per `.jsx` file**             |
| **Folder structure**   | Component families live in a folder with an `index.js` barrel  |
| **Imports**            | Always from the folder (`@/components/card`), never deep paths |

### SVG Imports

SVGs must be imported as React components using the `?react` suffix, then passed to the `Icon` component located at `@/components/icon`.

```jsx
import MyIcon from './assets/my-icon.svg?react'
import Icon from '@/components/icon'

const Component = () => <Icon svg={MyIcon} />
```

The `Icon` component accepts all native `<svg>` props plus:

| Prop        | Type       | Default | Description                           |
| ----------- | ---------- | ------- | ------------------------------------- |
| `svg`       | `React.FC` | —       | The imported SVG component (required) |
| `animate`   | `boolean`  | `false` | Applies `animate-spin` when `true`    |
| `className` | `string`   | —       | Merged via `cx` on top of variants    |

```jsx
// ❌ Never render SVGs directly
import MyIcon from './assets/my-icon.svg?react'
const Component = () => <MyIcon className="w-4 h-4" />

// ✅ Always use the Icon component
import MyIcon from './assets/my-icon.svg?react'
import Icon from '@/components/icon'

const Component = () => <Icon svg={MyIcon} />
const Spinner = () => <Icon svg={MyIcon} animate />
const Sized = () => <Icon svg={MyIcon} className="w-6 h-6" />
```

---

## 🎨 Styling Guide

- **Tailwind CSS v4:** The sole source of styles.
- **Inline CSS:** Forbidden, except for dynamic values computed at runtime that cannot be resolved via utility classes.
- **CSS Files:** Do not create per-component `.css` files. Use Tailwind utilities and CVA for variants.

---

## 📐 Full Example — Table Component

```
table/
├── table.jsx
├── table-header.jsx
├── table-body.jsx
├── table-row.jsx
├── table-head.jsx
├── table-cell.jsx
├── table-caption.jsx
├── table.d.ts          → only because the family has many sub-components and shared types
└── index.js
```

```jsx
// table/table.jsx
const tableVariants = cva('w-full caption-bottom text-sm')

export function Table({ className, children, ...props }) {
  return (
    <div className="w-full overflow-auto">
      <table className={twMerge(tableVariants(), className)} {...props}>
        {children}
      </table>
    </div>
  )
}
```

```jsx
// table/table-row.jsx
const tableRowVariants = cva(
  'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
)

export function TableRow({ className, children, ...props }) {
  return (
    <tr className={twMerge(tableRowVariants(), className)} {...props}>
      {children}
    </tr>
  )
}
```

```js
// table/index.js
export { Table } from './table'
export { TableHeader } from './table-header'
export { TableBody } from './table-body'
export { TableRow } from './table-row'
export { TableHead } from './table-head'
export { TableCell } from './table-cell'
export { TableCaption } from './table-caption'
```

```jsx
// Usage
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/table'
;<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
