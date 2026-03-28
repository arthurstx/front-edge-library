import { Container } from '../components/container'
import { UserTable } from '../contexts/users/components/user-table'

export function UsersPage() {
  return (
    <Container className="pt-5 flex flex-col gap-4">
      <UserTable />
    </Container>
  )
}
