import { useQueryState, createSerializer, parseAsString } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { toast } from 'sonner'
import { tokenStore } from '../../../helper/auth'

export function useRentalsHistory() {
  const toSearchParams = createSerializer({
    page: parseAsString,
    query: parseAsString,
  })
  const [page = 1, setPage] = useQueryState('page')
  const { data, isLoading } = useQuery({
    queryKey: ['rental-history', page],
    queryFn: async () => {
      const response = await api.get(
        `/rental/history${toSearchParams({ page: 1 })}`,
        {
          token: tokenStore.get(),
        },
      )

      if (response.error) {
        toast.error(response.error.message || 'fetch rental history failed')
        return []
      }
      return response.data.rentals
    },
  })
  return {
    rentals: data ?? [],
    isLoadingRentals: isLoading,
    filters: {
      page,
      setPage,
    },
  }
}
