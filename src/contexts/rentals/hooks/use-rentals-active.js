import { tokenStore } from '../../../helper/auth'
import { api } from '../../../helper/api'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * @typedef {import('../../../types/schema').Rental} RentalActive
 */

/**
 * @returns {{data: RentalActive[], isLoading: boolean}}
 */

export function useRentalsActive() {
  const { get } = tokenStore
  const { data, isLoading } = useQuery({
    queryKey: ['rentals-active'],
    queryFn: async () => {
      const response = await api.get('/rental/active', null, {
        token: get(),
      })

      if (response.error) {
        toast.error(response.error)
        return []
      }

      return response.data.rentals
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })

  return { activeRentals: data || [], isLoading }
}
