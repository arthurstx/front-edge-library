import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { tokenStore } from '../../../helper/auth'

export function useRentalsStatsTotal() {
  const { get } = tokenStore
  const { data, isLoading } = useQuery({
    queryKey: ['rentals-stats-total'],
    queryFn: async () => {
      const response = await api.get('/rental/stats/total', { token: get() })
      if (response.error) return 0
      return response.data?.total ?? response.data?.count ?? response.data ?? 0
    },
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading }
}

export function useRentalsStatsActive() {
  const { get } = tokenStore
  const { data, isLoading } = useQuery({
    queryKey: ['rentals-stats-active'],
    queryFn: async () => {
      const response = await api.get('/rental/stats/active', { token: get() })
      if (response.error) return 0
      return response.data?.total ?? response.data?.count ?? response.data ?? 0
    },
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading }
}
