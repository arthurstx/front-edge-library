import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { tokenStore } from '../../../helper/auth'

export function useAdminStatsUsers() {
  const { get } = tokenStore
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats-users'],
    queryFn: async () => {
      const response = await api.get('/admin/stats/users', { token: get() })
      if (response.error) return 0
      return response.data?.total ?? response.data?.count ?? response.data ?? 0
    },
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading }
}

export function useAdminStatsRentals() {
  const { get } = tokenStore
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats-rentals'],
    queryFn: async () => {
      const response = await api.get('/admin/stats/rentals/active', { token: get() })
      if (response.error) return 0
      return response.data?.total ?? response.data?.count ?? response.data ?? 0
    },
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading }
}

export function useAdminStatsUsersWithRentals() {
  const { get } = tokenStore
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats-users-with-rentals'],
    queryFn: async () => {
      const response = await api.get('/admin/stats/users/with-active-rentals', { token: get() })
      if (response.error) return 0
      return response.data?.total ?? response.data?.count ?? response.data ?? 0
    },
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading }
}
