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

export function Home() {
  const activeRentalsMock = [
    {
      id: '1',
      book: {
        title: 'O Senhor dos Anéis',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasia',
        coverUrl: '',
      },
      status: 'rented',
      start_date: '2026-03-10T10:00:00.000Z',
      end_date: '2026-03-24T10:00:00.000Z',
    },
    {
      id: '2',
      book: {
        title: 'Duna',
        author: 'Frank Herbert',
        genre: 'Ficção Científica',
        coverUrl: '',
      },
      status: 'rented',
      start_date: '2026-03-15T10:00:00.000Z',
      end_date: '2026-03-30T10:00:00.000Z',
    },
    {
      id: '3',
      book: {
        title: '1984',
        author: 'George Orwell',
        genre: 'Distopia',
        coverUrl: '',
      },
      status: 'returned',
      start_date: '2026-03-01T10:00:00.000Z',
      end_date: '2026-03-15T10:00:00.000Z',
    },
  ]

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
  const rentalHistoryMock = [
    {
      id: '1',
      title: '1984',
      author: 'George Orwell',
      returnDate: '05 Mar 2026',
      status: 'returned',
    },
    {
      id: '2',
      title: 'Duna',
      author: 'Frank Herbert',
      returnDate: '18 Fev 2026',
      status: 'returned',
    },
    {
      id: '3',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      returnDate: '02 Jan 2026',
      status: 'returned',
    },
    {
      id: '4',
      title: 'Fundação',
      author: 'Isaac Asimov',
      returnDate: '10 Dez 2025',
      status: 'overdue',
    },
    {
      id: '5',
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      returnDate: '28 Nov 2025',
      status: 'returned',
    },
  ]
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
        <StatCard label="Total rental" value={10} />
        <StatCard label="Rental active" value={2} />
      </div>
      <div className="flex items-baseline justify-between gap-2 mb-2 w-full px-3">
        <Text className="" variant="label-medium">
          Active Rentals
        </Text>
        <Text className="text-zinc-400">GET /rentals/active</Text>
      </div>
      <div className="flex flex-col gap-2.5">
        {activeRentalsMock.map((rental) => (
          <ActiveRentalCard key={rental.id}>
            <ActiveRentalCover
              coverUrl={rental.book.coverUrl}
              title={rental.book.title}
            />
            <ActiveRentalContent>
              <ActiveRentalInfo
                title={rental.book.title}
                author={rental.book.author}
                genre={rental.book.genre}
              />
              <ActiveRentalMeta>
                <ActiveRentalDate
                  label="Retirada"
                  value={formatIsoDate(rental.start_date)}
                />
                <ActiveRentalDate
                  label="Devolução"
                  value={formatIsoDate(rental.end_date)}
                />
                <ActiveRentalStatus
                  endDate={rental.end_date}
                />
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
        {rentalHistoryMock.map((item) => (
          <RentalHistoryRow key={item.id}>
            <div className="flex flex-col gap-0.5 min-w-0">
              <Text variant="heading-small" as="p" className="truncate">
                {item.title}
              </Text>
              <Text
                variant="paragraph-small"
                as="p"
                className="text-zinc-500 truncate"
              >
                {item.author}
              </Text>
            </div>
            <Text variant="paragraph-small" as="span" className="text-zinc-300">
              {item.returnDate}
            </Text>
            <Badge variant={item.status === 'returned' ? 'success' : 'danger'}>
              {item.status === 'returned' ? 'Devolvido' : 'Atrasado'}
            </Badge>
          </RentalHistoryRow>
        ))}
      </RentalHistoryTable>
    </Container>
  )
}
