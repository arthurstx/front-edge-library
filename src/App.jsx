import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import { Dashboard } from './pages/dashboard'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { ProtectedRoute } from './components/protected-route'
import { LayoutMain } from './pages/layout/layout-main'
import { LayoutDashboard } from './pages/layout/layout-dashboard'
import { Home } from './pages/home'
import { Redirect } from './pages/redirect'
import { PublicRoute } from './components/public-route'
import { RentalsPage } from './pages/rentals/rentals-page'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <Routes>
            <Route path="redirect" element={<Redirect />} />

            {/* Públicas */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="auth/register" element={<Register />} />
            </Route>
            {/* Admin */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<LayoutDashboard />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/rentals" element={<RentalsPage />} />
              </Route>
            </Route>

            {/* User */}
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              <Route element={<LayoutMain />}>
                <Route path="home" element={<Home />} />
              </Route>
            </Route>

            <Route path="unauthorized" element={<div>Sem permissão.</div>} />
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

export default App
