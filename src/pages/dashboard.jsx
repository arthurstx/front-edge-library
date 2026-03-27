import { Container } from '../components/container'
import { MainHeader } from '../components/main-header'
import { StatCard } from '../contexts/dashboard/components/stat-card'
import { BookForm, RentalForm } from '../contexts/dashboard/components/form'
import { BookTable } from '../contexts/dashboard/components/book-table'
import { Skeleton } from '../components/skeleton'
import {
  useAdminStatsUsers,
  useAdminStatsRentals,
  useAdminStatsUsersWithRentals,
} from '../contexts/dashboard/hooks/use-admin-stats'

export function Dashboard() {
  const { data: usersData, isLoading: isLoadingUsers } = useAdminStatsUsers()
  const { data: rentalsData, isLoading: isLoadingRentals } = useAdminStatsRentals()
  const { data: usersWithRentalsData, isLoading: isLoadingUsersWithRentals } = useAdminStatsUsersWithRentals()

  return (
    <>
      <Container className={'space-y-4'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          <StatCard 
            variant="default" 
            label="Total Users" 
            value={isLoadingUsers ? <Skeleton className="h-8 w-16" /> : usersData} 
          />
          <StatCard
            variant="default"
            accent={true}
            label="Active Rentals"
            value={isLoadingRentals ? <Skeleton className="h-8 w-16" /> : rentalsData}
          />
          <StatCard 
            variant="default" 
            label="Active Users" 
            value={isLoadingUsersWithRentals ? <Skeleton className="h-8 w-16" /> : usersWithRentalsData} 
          />
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
