import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { toast } from 'sonner'
import { useQueryState } from 'nuqs'

const LIMIT = 10

export function useBooks() {
  const [page, setPage] = useQueryState('page', { defaultValue: 1 })

  const { data, isLoading } = useQuery({
    queryKey: ['books', page],
    queryFn: async () => {
      const response = await api.get(`/book/list?page=${page}`)
      if (response.error) {
        toast.error(response.error.message || 'fetch books failed')
        return []
      }
      return response.data.books
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  })

  return {
    books: data ?? [],
    isLastPage: (data ?? []).length < LIMIT,
    isLoadingBooks: isLoading,
    filters: {
      page,
      setPage,
    },
  }
}
