// redirect.jsx
import { Navigate } from 'react-router'
import { useMe } from '../contexts/auth/login/hooks/use-me'
import Icon from '../components/icon'
import Spinner from '../assets/spinner.svg?react'

export function Redirect() {
  const { user, isLoading } = useMe()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Icon animate={true} svg={Spinner} className=" size-30 fill-white" />
      </div>
    )
  }

  if (!user) return <Navigate to="/" replace />

  if (user.role === 'admin') return <Navigate to="/dashboard" replace />

  if (user.role === 'user') return <Navigate to="/home" replace />

  return <Navigate to="/" replace />
}
