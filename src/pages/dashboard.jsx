import { Container } from '../components/container'
import { MainHeader } from '../components/main-header'
import { StatCard } from '../contexts/dashboard/components/stat-card'
import { BookForm, RentalForm } from '../contexts/dashboard/components/form'
import { BookTable } from '../contexts/dashboard/components/book-table'

export function Dashboard() {
  return (
    <>
      <Container className={'space-y-4'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          <StatCard variant="default" label="Total Users" value={1284} />
          <StatCard
            variant="default"
            accent={true}
            label="Active Rentals"
            value={43}
          />
          <StatCard variant="default" label="Active Users" value={820} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <BookForm />
          <RentalForm />
        </div>
        <BookTable />
      </Container>
    </>
  )
}
