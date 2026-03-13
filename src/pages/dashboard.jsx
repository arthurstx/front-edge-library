import { Container } from '../components/container'
import { MainHeader } from '../components/main-header'
import { StatCard } from '../contexts/dashboard/components/stat-card'
import { BookForm, RentalForm } from '../contexts/dashboard/components/form'

export function Dashboard() {
  return (
    <>
      <MainHeader />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <StatCard variant="purple" label="Total Users" value={1000} />
          <StatCard variant="orange" label="Total Users" value={1000} />
          <StatCard variant="blue" label="Total Users" value={1000} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <BookForm />
          <RentalForm />
        </div>
      </Container>
    </>
  )
}
