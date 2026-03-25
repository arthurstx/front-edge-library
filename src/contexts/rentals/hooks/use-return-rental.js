import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../../helper/api'
import { tokenStore } from '../../../helper/auth'

export function useReturnRental() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (rentalId) => {
      const { data, error } = await api.patch(`/rental/${rentalId}/return`, null, {
        token: tokenStore.get(),
      })
      if (error) throw new Error(error)
      return data
    },
    onSuccess: () => {
      toast.success('Livro devolvido com sucesso')
      queryClient.invalidateQueries({ queryKey: ['rentals'] })
      queryClient.invalidateQueries({ queryKey: ['rentals-active'] })
      queryClient.invalidateQueries({ queryKey: ['rentals-history'] })
    },
    onError: (error) => {
      toast.error(error.message || 'Falha ao devolver o livro')
    },
  })
}
