import { useQueryState, createSerializer, parseAsString } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { toast } from 'sonner'
import { tokenStore } from '../../../helper/auth'

const LIMIT = 10

export function useUsers() {
  const toSearchParams = createSerializer({
    page: parseAsString,
    query: parseAsString,
  })
  const [page = 1, setPage] = useQueryState('page', { defaultValue: '1' })
  const [query, setQuery] = useQueryState('query')

  // We only fetch users if we have an admin token.
  // The client also ensures valid tokens but better safe than sorry.
  const { data, isLoading } = useQuery({
    queryKey: ['users', page, query],
    queryFn: async () => {
      const qs = toSearchParams({ page, query })
      const endpoint = qs ? `/users${qs}` : '/users'
      
      const response = await api.get(endpoint, {
        token: tokenStore.get(),
      })
      
      if (response.error) {
        toast.error(response.error.message || 'Falha ao buscar usuários')
        return []
      }
      return response.data.users || response.data || []
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  })

  // We infer it's the last page if the returned array length is less than the limit
  const usersArray = Array.isArray(data) ? data : (data?.users || [])

  return {
    users: usersArray,
    isLastPage: usersArray.length < LIMIT,
    isLoadingUsers: isLoading,
    filters: {
      page,
      setPage,
      query,
      setQuery,
    },
  }
}
