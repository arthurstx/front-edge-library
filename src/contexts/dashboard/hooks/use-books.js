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
      console.log(respose.data)
      return respose.data.books
    },
  })

  return {
    books: data,
    isLoadingBooks: isLoading,
  }
}
