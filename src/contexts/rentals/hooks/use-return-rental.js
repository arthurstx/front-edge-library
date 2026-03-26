import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../../helper/api'
import { tokenStore } from '../../../helper/auth'

export function useReturnRental() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id: rentalId, userId }) => {
      const { data, error } = await api.patch(
        `/rental/${rentalId}/return`,
        { userId },
        {
          token: tokenStore.get(),
        },
      )
      if (error) throw new Error(error)
      return data
    },
    onSuccess: () => {
      toast.success('Livro devolvido com sucesso')

      queryClient.invalidateQueries({ queryKey: ['rentals'], exact: false })
      queryClient.invalidateQueries({
        queryKey: ['rentals-active'],
        exact: false,
      })
      queryClient.invalidateQueries({
        queryKey: ['rentals-history'],
        exact: false,
      })
    },
    onError: (error) => {
      toast.error(error.message || 'Falha ao devolver o livro')
    },
  })
}
