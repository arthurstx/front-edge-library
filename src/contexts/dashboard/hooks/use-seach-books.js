import { useQueryState, createSerializer, parseAsString } from 'nuqs'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { toast } from 'sonner'

export function useSearchBooks() {
  const toSearchParams = createSerializer({
    page: parseAsString,
    query: parseAsString,
  })
  const [page = 1, setPage] = useQueryState('page')
  const [query, setQuery] = useQueryState('query')
  const enabled = query !== null && query !== undefined && query !== ''
  const { data, isLoading } = useQuery({
    queryKey: ['books', page, query],
    queryFn: async () => {
      const response = await api.get(
        `/book/search${toSearchParams({ page: 1, query })}`,
      )
      if (response.error) {
        toast.error(response.error.message || 'fetch books failed')
        return []
      }
      return response.data.books
    },
    enabled,
  })
  return {
    books: data ?? [],
    isLoadingBooks: isLoading,
    filters: {
      page,
      setPage,
      query,
      setQuery,
    },
  }
}
