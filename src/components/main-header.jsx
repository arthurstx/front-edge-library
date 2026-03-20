import { twMerge } from 'tailwind-merge'
import { Container } from './container'
import { Button } from '../components/button'
import { Text } from '../components/text'
import { useAuth } from '../contexts/auth/login/hooks/use-auth'

export function MainHeader({ className }) {
  const { logout } = useAuth()

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
          <Button variant="secondary" onClick={logout}>
            Sair
          </Button>
        </div>
      </Container>
    </header>
  )
}
