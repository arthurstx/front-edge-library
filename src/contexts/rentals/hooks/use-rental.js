import { api } from '../../../helper/api'
import { toast } from 'sonner'
import { tokenStore } from '../../../helper/auth'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export function useRental() {
  const queryClient = useQueryClient()
  const { get } = tokenStore

  const { mutate: create } = useMutation({
    mutationFn: (data) => api.post('/rental', data, { token: get() }),

    onMutate: async (data) => {
      await queryClient.cancelQueries(['books'])
      const previousBooks = queryClient.getQueryData(['books'])

      const book = previousBooks?.find((b) => b.id === data.bookId)

      if (book && book.total_copies <= 0) {
        throw new Error('No copies available for this book.')
      }

      queryClient.setQueryData(['books'], (oldData) => {
        if (!oldData) return oldData
        return oldData.map((book) => {
          if (book.id === data.bookId) {
            return { ...book, total_copies: book.total_copies - 1 }
          }
          return book
        })
      })

      return { previousBooks }
    },

    onError: (_error, _data, context) => {
      if (context?.previousBooks) {
        queryClient.setQueryData(['books'], context.previousBooks)
      }
      queryClient.invalidateQueries(['books'])
      toast.error(_error?.message || 'create rental failed')
    },

    onSuccess: (response) => {
      if (response.error) {
        queryClient.invalidateQueries(['books'])
        toast.error(response.error.message || 'create rental failed')
        return
      }
      queryClient.invalidateQueries(['rentals'])
      toast.success('Rental created successfully')
    },
  })

  return { create }
}
