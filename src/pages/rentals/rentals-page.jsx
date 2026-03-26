import { Container } from '../../components/container'
import { Text } from '../../components/text'
import Icon from '../../components/icon'
import SearchIcon from '../../assets/search.svg?react'
import {
  ActiveRentalCard,
  ActiveRentalCover,
  ActiveRentalContent,
  ActiveRentalInfo,
  ActiveRentalMeta,
  ActiveRentalDate,
  ActiveRentalStatus,
  ActiveRentalUser,
  ActiveRentalAction,
} from '../../contexts/rentals/components/active-rental-card'
import { useRentals } from '../../contexts/rentals/hooks/use-rentals'
import { useReturnRental } from '../../contexts/rentals/hooks/use-return-rental'
import { Button } from '../../components/button'
import { Skeleton } from '../../components/skeleton'
import { InputField } from '../../contexts/auth/components/input-field'
import React from 'react'
import { debounce } from '../../helper/debouce'

export function RentalsPage() {
  const { rentals, isLoading, error, filters } = useRentals()
  const { mutate: returnRental, isPending } = useReturnRental()
  const [inputValue, setInputValue] = React.useState('')

  console.log(rentals)

  const debouncedSetValue = React.useRef(
    debounce((value) => filters.setQuery(value), 400),
  ).current

  function handleInputChange(e) {
    const value = e.target.value
    setInputValue(value)
    debouncedSetValue(value)
  }

  const formatIsoDate = (isoStr) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoStr))
  }
  return (
    <Container className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Text variant="heading-large">Aluguéis</Text>
      </div>

      <div className="w-full relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
          <Icon svg={SearchIcon} className="h-5 w-5 fill-white  " />
        </div>
        <InputField
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="search rentals..."
          className="pl-10"
        />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-32 rounded-lg" />
          ))}

        {error && (
          <div className="rounded-md border border-red-500/50 bg-red-500/10 p-4 text-center text-red-500">
            <Text>Não foi possível carregar os aluguéis no momento.</Text>
            <Text variant="paragraph-small" className="mt-1 opacity-80">
              {error.message}
            </Text>
          </div>
        )}

        {!isLoading && !error && rentals.length === 0 && (
          <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center text-muted-foreground min-h-75">
            <Icon svg={SearchIcon} className="h-10 w-10 mb-4 opacity-20" />
            <Text>Nenhum aluguel encontrado ou lista vazia.</Text>
          </div>
        )}

        {!isLoading &&
          !error &&
          rentals.length > 0 &&
          rentals.map((rental) => (
            <ActiveRentalCard key={rental.id}>
              <ActiveRentalCover title={rental.book.title} />
              <ActiveRentalContent>
                <div className="flex justify-between">
                  <ActiveRentalInfo
                    title={rental.book.title}
                    author={rental.book.author}
                    genre={rental.book.category || 'N/A'}
                  />
                  <ActiveRentalUser
                    id={rental.user.userId}
                    name={rental.user.name}
                  />
                </div>
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
                <ActiveRentalAction>
                  <Button
                    variant="primary"
                    full
                    onClick={() =>
                      returnRental({
                        id: rental.id,
                        userId: rental.user.userId,
                      })
                    }
                    handling={isPending}
                  >
                    Devolver Livro
                  </Button>
                </ActiveRentalAction>
              </ActiveRentalContent>
            </ActiveRentalCard>
          ))}
      </div>
    </Container>
  )
}
