import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import { Dashboard } from './pages/dashboard'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

export default App
