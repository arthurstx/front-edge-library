import { Navigate, Outlet } from 'react-router'
import { useMe } from '../contexts/auth/login/hooks/use-me'

/**
 * @typedef {Object} ProtectedRouteProps
 * @property {string[]} [allowedRoles]
 * @property {string} [redirectTo='/login']
 */

/**
 * @param {ProtectedRouteProps} props
 * @returns {JSX.Element}
 */
export function ProtectedRoute({ allowedRoles, redirectTo = '/' }) {
  const { user, isLoading } = useMe()

  if (isLoading) return <div className="text-white text-4xl">Carregando...</div>

  if (!user) return <Navigate to={redirectTo} replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
