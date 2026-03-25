import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { tokenStore } from '../../../helper/auth'
import { useQueryState, createSerializer, parseAsString } from 'nuqs'

export function useRentals() {
  const toSearchParams = createSerializer({
    page: parseAsString,
    query: parseAsString,
  })
  const [page, setPage] = useQueryState('page', parseAsString.withDefault('1'))
  const [query, setQuery] = useQueryState(
    'query',
    parseAsString.withDefault(''),
  )

  const { data, isLoading } = useQuery({
    queryKey: ['rentals', page, query],
    queryFn: async () => {
      const response = await api.get(
        `/rental${toSearchParams({ page, query })}`, // page dinâmico
        null,
        { token: tokenStore.get() },
      )
      if (response.error) throw new Error(response.error)
      return response.data.rentals
    },
  })
  return {
    rentals: data ?? [],
    isLoading,
    filters: {
      page,
      setPage,
      query,
      setQuery,
    },
  }
}
