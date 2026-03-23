# Forms & Validation

This document covers form handling and validation patterns. For API calls triggered by forms, see `api.md`. For folder structure, see `conventions.md`.

---

## 1. Stack

| Concern                      | Library                   |
| ---------------------------- | ------------------------- |
| Form state & submission      | React Hook Form           |
| Schema validation            | Zod                       |
| Connecting both              | `@hookform/resolvers/zod` |
| User feedback (field errors) | `InputField` prop `error` |
| User feedback (API errors)   | Sonner (`toast`)          |

---

## 2. Schema Definition

Zod schemas live in the feature's `models/schemas.js`. Define once and reuse — never duplicate.

```js
// contexts/auth/login/models/schemas.js
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
```

---

## 3. Form Setup

Connect the Zod schema to React Hook Form via `zodResolver`:

```js
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from '@/components/input-field'
import { loginSchema } from '../models/schemas'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values) => {
    // values are already validated and typed
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  )
}
```

---

## 4. InputField & Error Display

The `InputField` component handles both the visual error state and the inline message in a single prop:

```jsx
<InputField
  label="Email"
  error={errors.email?.message} // string → shows message + red ring
  {...register('email')}
/>
```

- When `error` is a **string**, the component renders it below the field and applies `ring-2 ring-red-500`.
- When `error` is `undefined`, the field renders normally.
- Never render a separate `<span>` for field errors — `InputField` already does it.

| Error type                 | How to display                                    |
| -------------------------- | ------------------------------------------------- |
| Validation error (Zod/RHF) | `error={errors.<field>?.message}` on `InputField` |
| API error on submit        | `toast.error()` from Sonner — never inline        |

---

## 5. Submitting with the API

Delegate the API call to a `useMutation` hook. Handle `toast.success` and `toast.error` inside the mutation's `onSuccess`/`onError` — not in the form component.

```js
// hooks/use-login.js
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../helper/api'

export function useLogin() {
  return useMutation({
    mutationFn: async (body) => {
      const { data, error } = await api.post('/auth/login', body)
      if (error) throw new Error(error)
      return data
    },
    onSuccess: () => {
      toast.success('Logged in successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed')
    },
  })
}
```

```jsx
// components/login-form.jsx
import { useLogin } from '../hooks/use-login'
import { InputField } from '@/components/input-field'

export function LoginForm() {
  const { mutateAsync, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values) => {
    await mutateAsync(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <button type="submit" disabled={isPending}>
        Login
      </button>
    </form>
  )
}
```

---

## 6. What NOT to Do

- Do **not** validate form data manually — always use a Zod schema.
- Do **not** define schemas inline in the component — keep them in `models/schemas.js`.
- Do **not** render `<span>` manually for field errors — pass `error={errors.<field>?.message}` to `InputField`.
- Do **not** show API errors via `InputField` — use `toast.error()` instead.
- Do **not** manage form state with `useState` — use React Hook Form.
- Do **not** call `api.*` directly inside the form component — delegate to a mutation hook.
- Do **not** put `toast.success` / `toast.error` in the form component — they belong in `onSuccess` / `onError` of the mutation.
