import { Container } from '../components/container'
import { Text } from '../components/text'
import { StatCard } from '../contexts/dashboard/components/stat-card'
import {
  ActiveRentalCard,
  ActiveRentalCover,
  ActiveRentalContent,
  ActiveRentalInfo,
  ActiveRentalMeta,
  ActiveRentalDate,
  ActiveRentalStatus,
} from '../contexts/rentals/components/active-rental-card'
import {
  RentalHistoryTable,
  RentalHistoryHeader,
  RentalHistoryRow,
} from '../contexts/rentals/components/rental-history-table'
import { Badge } from '../components/badge'
import { useRentalsActive } from '../contexts/rentals/hooks/use-rentals-active'
import { Skeleton } from '../components/skeleton'
import { useRentalsHistory } from '../contexts/rentals/hooks/use-rentals-history'
import { useRentalsStatsTotal, useRentalsStatsActive } from '../contexts/rentals/hooks/use-rentals-stats'

export function Home() {
  const { activeRentals, isLoading } = useRentalsActive()
  const { rentals, isLoadingRentals } = useRentalsHistory()
  const { data: totalRentals, isLoading: isLoadingTotal } = useRentalsStatsTotal()
  const { data: activeRentalsCount, isLoading: isLoadingActiveCount } = useRentalsStatsActive()

  const formatIsoDate = (isoStr) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoStr))
  }

  /**
   * @type {import('../rental-history-table/types/rental-history-table').RentalHistoryItem[]}
   */

  return (
    <Container className={'space-y-8 py-5'}>
      <div className={'flex flex-col gap-2 pt-8'}>
        <Text variant={'heading-large'}>Hello, Arthur Teixeira 👋</Text>
        <Text
          className={'font-base  text-zinc-300'}
          variant={'paragraph-large'}
        >
          Welcome to the library
        </Text>
      </div>
      <div className={'grid md:grid-cols-2 gap-4 pt-5 max-w-200 mx-auto'}>
        <StatCard 
          label="Total rental" 
          value={isLoadingTotal ? <Skeleton className="h-8 w-16" /> : totalRentals} 
        />
        <StatCard 
          label="Rental active" 
          value={isLoadingActiveCount ? <Skeleton className="h-8 w-16" /> : activeRentalsCount} 
        />
      </div>
      <div className="flex items-baseline justify-between gap-2 mb-2 w-full px-3">
        <Text className="" variant="label-medium">
          Active Rentals
        </Text>
        <Text className="text-zinc-400">GET /rentals/active</Text>
      </div>
      <div className="flex flex-col gap-2.5">
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-20" />
          ))}
        {!isLoading && activeRentals.length === 0 && (
          <Text className="text-center" variant="paragraph-medium">
            Nenhum aluguel ativo
          </Text>
        )}
        {!isLoading &&
          activeRentals.length > 0 &&
          activeRentals.map((rental) => (
            <ActiveRentalCard key={rental.id}>
              <ActiveRentalCover title={rental.book.title} />
              <ActiveRentalContent>
                <ActiveRentalInfo
                  title={rental.book.title}
                  author={rental.book.author}
                  genre={rental.book.category}
                />
                <ActiveRentalMeta>
                  <ActiveRentalDate
                    label="Retirada"
                    value={formatIsoDate(rental.startDate)}
                  />
                  <ActiveRentalDate
                    label="Devolução"
                    value={formatIsoDate(rental.endDate)}
                  />
                  <ActiveRentalStatus endDate={rental.endDate} />
                </ActiveRentalMeta>
              </ActiveRentalContent>
            </ActiveRentalCard>
          ))}
      </div>
      <div className="flex items-baseline justify-between gap-2 mb-2 w-full px-3">
        <Text className="" variant="label-medium">
          History of Rentals
        </Text>
        <Text className="text-zinc-400">GET /rentals/history</Text>
      </div>
      <RentalHistoryTable>
        <RentalHistoryHeader />
        {isLoadingRentals &&
          Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-20" />
          ))}
        {!isLoadingRentals && rentals.length === 0 && (
          <Text className="text-center" variant="paragraph-medium">
            Nenhum aluguel no histórico
          </Text>
        )}
        {!isLoadingRentals &&
          rentals.length > 0 &&
          rentals.map((item) => (
            <RentalHistoryRow key={item.id}>
              <div className="flex flex-col gap-0.5 min-w-0">
                <Text variant="heading-small" as="p" className="truncate">
                  {item.book.title}
                </Text>
                <Text
                  variant="paragraph-small"
                  as="p"
                  className="text-zinc-500 truncate"
                >
                  {item.book.author}
                </Text>
              </div>
              {
                <Text
                  variant="paragraph-small"
                  as="span"
                  className="text-zinc-300"
                >
                  18 Fev 2026
                </Text>
              }
              <Badge
                variant={item.status === 'returned' ? 'success' : 'danger'}
              >
                {item.status === 'returned' ? 'Devolvido' : 'Atrasado'}
              </Badge>
            </RentalHistoryRow>
          ))}
      </RentalHistoryTable>
    </Container>
  )
}
