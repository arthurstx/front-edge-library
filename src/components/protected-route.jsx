import { Navigate, Outlet } from 'react-router'
import { useMe } from '../contexts/auth/login/hooks/use-me'
import Spinner from '../assets/spinner.svg?react'
import Icon from './icon'

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

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Icon animate={true} svg={Spinner} className=" size-30 fill-white" />
      </div>
    )

  if (!user) return <Navigate to={redirectTo} replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
