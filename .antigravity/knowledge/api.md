# API & Data Fetching

This document covers the HTTP client, authentication flow, and React Query patterns. For folder structure, see `conventions.md`. For forms, see `forms.md`.

---

## 1. HTTP Client

All HTTP calls must go through the centralized client at `src/helper/api.js`. Never call `fetch` directly in hooks or components.

```js
import { api } from '../helper/api'

api.get(path, options)
api.post(path, body, options)
api.put(path, body, options)
api.patch(path, body, options)
api.delete(path, options)
```

### Base URL

Configured via the `VITE_API_URL` environment variable (defined in `.env`).

---

## 2. Response Shape

Every `api.*` call returns a consistent `ApiResponse` object and **never throws**:

```js
// Success
{ data: any,  error: null,      status: 200 }

// API error
{ data: null, error: 'message', status: 400 }

// Network failure / unreachable
{ data: null, error: 'message', status: 0   }
```

Always check `error` before using `data`:

```js
const { data, error } = await api.get('/rentals')
if (error) {
  // handle error
  return
}
// use data safely
```

---

## 3. Authentication

- Tokens are stored and managed via `tokenStore` (from `src/helper/auth`).
- Authenticated requests require passing the token explicitly via the `token` option — the client will attach it as `Authorization: Bearer <token>`.

```js
import { tokenStore } from '../helper/auth'

const { data, error } = await api.get('/me', { token: tokenStore.get() })
```

---

## 4. Refresh Token Flow

The client handles token refresh **automatically and transparently**. Do not reimplement this logic in hooks.

1. On a `401` response, the client calls `POST /auth/refresh` with `credentials: 'include'` (uses the httpOnly refresh cookie).
2. If the refresh succeeds → stores the new token in `tokenStore` → retries the original request once.
3. Any requests that arrive while a refresh is in progress are **queued** and automatically resolved with the new token once it's available.
4. If the refresh fails → `tokenStore.clear()` is called → returns `{ data: null, error: 'Session expired', status: 401 }`. The UI layer is responsible for redirecting to login.

---

## 5. React Query

All data fetching in hooks uses React Query wrapping `api.*` calls. Convert the `error` string to a thrown exception so React Query can track query state correctly.

### useQuery pattern

```js
import { useQuery } from '@tanstack/react-query'
import { api } from '../../helper/api'
import { tokenStore } from '../../helper/auth'

export function useRentals() {
  return useQuery({
    queryKey: ['rentals'],
    queryFn: async () => {
      const { data, error } = await api.get('/rentals', {
        token: tokenStore.get(),
      })
      if (error) throw new Error(error)
      return data
    },
  })
}
```

### useMutation pattern

Always use `onSuccess` and `onError` to give visual feedback via Sonner. See Section 6.

```js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../helper/api'
import { tokenStore } from '../../helper/auth'

export function useCreateRental() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body) => {
      const { data, error } = await api.post('/rentals', body, {
        token: tokenStore.get(),
      })
      if (error) throw new Error(error)
      return data
    },
    onSuccess: () => {
      toast.success('Rental created successfully')
      queryClient.invalidateQueries({ queryKey: ['rentals'] })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create rental')
    },
  })
}
```

### Query Keys

Use arrays with the resource name as the first element. Add identifiers for specific records:

```js
queryKey: ['rentals'] // list
queryKey: ['rentals', id] // single record
queryKey: ['rentals', 'active'] // filtered list
```

---

## 6. Toast Notifications (Sonner)

All user-facing feedback uses **Sonner** (`import { toast } from 'sonner'`).

| Scenario                            | Method                                            |
| ----------------------------------- | ------------------------------------------------- |
| Action completed successfully       | `toast.success(message)`                          |
| API error on mutation               | `toast.error(message)` via `onError`              |
| API error on data fetch             | `toast.error(message)` via `useEffect` on `error` |
| Session expired (401 unrecoverable) | Redirect to login                                 |

### Mutation feedback

```js
onSuccess: () => {
  toast.success('Book created successfully')
},
onError: (error) => {
  toast.error(error.message || 'Failed to create book')
},
```

### Fetch error feedback

For `useQuery`, surface the error via `useEffect` in the component that owns the query:

```js
const { data, error } = useRentals()

useEffect(() => {
  if (error) toast.error(error.message || 'Failed to fetch rentals')
}, [error])
```

---

## 7. What NOT to Do

- Do **not** call `fetch` directly — always use `api.*`.
- Do **not** implement refresh token or retry logic in hooks — the client handles it.
- Do **not** call `api.*` directly in components or pages — always go through a hook.
- Do **not** use `async/await` inside `useEffect` for data fetching — use `useQuery` instead.
- Do **not** show API errors inline in form fields — use `toast.error()` instead.
- Do **not** leave mutations without `onSuccess` and `onError` feedback.
