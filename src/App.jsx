import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import { Dashboard } from './pages/dashboard'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { ProtectedRoute } from './components/protected-route'
import { LayoutMain } from './pages/layout/layout-main'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<Login />} />
            <Route path="auth/register" element={<Register />} />

            {/* Admin */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<LayoutMain />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>

            {/* Member (quando criar) */}
            {/* <Route element={<ProtectedRoute allowedRoles={['member']} />}>
              <Route path="home" element={<Home />} />
            </Route> */}

            <Route path="unauthorized" element={<div>Sem permissão.</div>} />
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

export default App
