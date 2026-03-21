import { Container } from '../components/container'
import { Text } from '../components/text'
import { StatCard } from '../contexts/dashboard/components/stat-card'
import { ActiveRentalCard } from '../contexts/rentals/components/active-rental-card'
import { RentalHistoryTable } from '../contexts/rentals/components/rental-history-table'

export function Home() {
  const activeRentalsMock = [
    {
      title: 'O Senhor dos Anéis',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasia',
      withdrawalDate: '10 Mar 2026',
      returnDate: '24 Mar 2026',
      status: 'due_soon',
      statusLabel: 'Vence em 3 dias',
    },
    {
      title: 'Duna',
      author: 'Frank Herbert',
      genre: 'Ficção Científica',
      withdrawalDate: '15 Mar 2026',
      returnDate: '30 Mar 2026',
      status: 'on_time',
      statusLabel: 'No prazo',
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Distopia',
      withdrawalDate: '1 Mar 2026',
      returnDate: '15 Mar 2026',
      status: 'overdue',
      statusLabel: 'Atrasado 6 dias',
    },
  ]

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
          Aluguel ativo
        </Text>
        <Text className="text-zinc-400">GET /rentals/active</Text>
      </div>
      <div className="flex flex-col gap-2.5">
        {activeRentalsMock.map((rental) => (
          <ActiveRentalCard
            key={`${rental.title}-${rental.withdrawalDate}`}
            {...rental}
          />
        ))}
      </div>
      <RentalHistoryTable items={rentalHistoryMock} />
    </Container>
  )
}
