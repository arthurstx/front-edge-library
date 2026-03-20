import { twMerge } from 'tailwind-merge'
import { Container } from './container'
import { Button } from '../components/button'
import { Text } from '../components/text'
import { useAuth } from '../contexts/auth/login/hooks/use-auth'
import React from 'react'

export function MainHeader({ className }) {
  const { logout } = useAuth()

  const [isloading, setIsloading] = React.useTransition()

  function handleLogout() {
    setIsloading(logout)
  }

  return (
    <header
      className={twMerge(
        'flex items-center justify-between px-5 h-15 bg-zinc-900 border-b border-zinc-900',
        className,
      )}
    >
      <Container className={'flex items-center justify-between'}>
        <Text variant="heading-medium">Edge Library</Text>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            handling={isloading}
            disabled={isloading}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </Container>
    </header>
  )
}
