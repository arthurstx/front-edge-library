import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { toast } from 'sonner'
import { useQueryState } from 'nuqs/react'

/**
 * @returns {{
 *   books: import('../../../types/schema.d.ts').Book[],
 *   isLoadingBooks: boolean
 *
 */
export function useBooks() {
  const [page, setPage] = useQueryState('page', { defaultValue: 1 })
  const { data, isLoading } = useQuery({
    queryKey: ['books', page],
    queryFn: async () => {
      const respose = await api.get(`book/list?page=${page}`)
      if (respose.error) {
        toast.error(respose.error.message || 'fetch books failed')
        return []
      }
      return respose.data.books
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  })

  return {
    books: data ?? [],
    isLoadingBooks: isLoading,
    filters: {
      page,
      setPage,
    },
  }
}
