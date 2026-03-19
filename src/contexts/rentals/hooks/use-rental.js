import { api } from '../../../helper/api'
import { toast } from 'sonner'
import { tokenStore } from '../../../helper/auth'
import { useQueryClient } from '@tanstack/react-query'
export function useRental() {
  const queryClient = useQueryClient()
  const { get } = tokenStore

  async function create(data) {
    await queryClient.cancelQueries(['books'])
    const previousBooks = queryClient.getQueryData(['books'])

    queryClient.setQueryData(['books'], (oldData) => {
      if (!oldData) return oldData
      return oldData.map((book) => {
        if (book.id === data.bookId) {
          return { ...book, total_copies: book.total_copies - 1 }
        }
        return book
      })
    })
    console.log(data)
    const response = await api.post('/rental', data, { token: get() })
    if (response.error) {
      queryClient.setQueryData(['books'], previousBooks)
      queryClient.invalidateQueries(['books'])
      toast.error(response.error.message || 'create rental failed')

      return
    }
    toast.success('Rental created successfully')
  }
  return {
    create,
  }
}
