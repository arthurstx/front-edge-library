import { useQuery } from '@tanstack/react-query'
import { api } from '../../../helper/api'
import { toast } from 'sonner'

/**
 * @returns {{
 *   books: import('../../../types/schema.d.ts').Book[],
 *   isLoadingBooks: boolean
 *
 */
export function useBooks() {
  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const respose = await api.get('/book/list')
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
  }
}
