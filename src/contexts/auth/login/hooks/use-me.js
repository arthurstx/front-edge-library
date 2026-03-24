import { api } from '../../../../helper/api'
import { useQuery } from '@tanstack/react-query'
import { tokenStore } from '../../../../helper/auth'

/**
 *
 * @returns {{user: import("../../../../types/schema").User|null, isLoading: boolean}}
 */
export function useMe() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await api.get('/auth/me', {
        credentials: 'include',
        token: tokenStore.get(),
      })

      if (response.error) {
        return null
      }
      return response.data.user
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })

  return { user, isLoading }
}
