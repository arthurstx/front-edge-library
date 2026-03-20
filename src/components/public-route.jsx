// components/public-route.jsx
import { Navigate, Outlet } from 'react-router'
import { useMe } from '../contexts/auth/login/hooks/use-me'
import Spinner from '../assets/spinner.svg?react'
import Icon from './icon'

export function PublicRoute() {
  const { user, isLoading } = useMe()

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Icon animate={true} svg={Spinner} className="size-30 fill-white" />
      </div>
    )

  if (user?.role === 'admin') return <Navigate to="/dashboard" replace />
  if (user?.role === 'user') return <Navigate to="/home" replace />

  return <Outlet />
}
