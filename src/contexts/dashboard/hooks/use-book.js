import { toast } from 'sonner'
import { api } from '../../../helper/api'
import { tokenStore } from '../../../helper/auth'
import { useQueryClient } from '@tanstack/react-query'

export function useBook() {
  const { get } = tokenStore
  const queryClient = useQueryClient()

  async function addBook(data) {
    const respose = await api.post(
      '/book/create',

      data,

      {
        token: get(),
      },
    )
    if (respose.error) {
      toast.error(respose.error.message || 'add book failed')
    }

    toast.success('Book added successfully')
    queryClient.invalidateQueries(['books'])
    queryClient.setQueryData(['books'], (oldData) => {
      if (!oldData) return oldData
      return [...oldData, respose.data.book]
    })
  }
  async function addStock({ bookId, quantity }) {
    await queryClient.cancelQueries(['books'])
    const previousBooks = queryClient.getQueryData(['books'])

    queryClient.setQueryData(['books'], (oldData) => {
      if (!oldData) return oldData
      return oldData.map((book) => {
        if (book.id === bookId) {
          return { ...book, total_copies: book.total_copies + quantity }
        }
        return book
      })
    })

    const response = await api.post(
      `/book/add-stock/${bookId}`,
      { quantity },
      { token: get() },
    )

    if (response.error) {
      queryClient.setQueryData(['books'], previousBooks)
      queryClient.invalidateQueries(['books'])
      toast.error(response.error.message || 'add stock failed')
      return
    }

    toast.success('Stock added successfully')
  }
  async function updateBook(data) {
    await queryClient.cancelQueries(['books'])
    const previousBooks = queryClient.getQueryData(['books'])

    queryClient.setQueryData(['books'], (oldData) => {
      if (!oldData) return oldData
      return oldData.map((book) => {
        if (book.id === data.id) {
          return { ...book, ...data }
        }
        return book
      })
    })

    const response = await api.patch(
      `/book/update/${data.id}`,
      { data },
      {
        token: get(),
      },
    )

    if (response.error) {
      queryClient.setQueryData(['books'], previousBooks)
      queryClient.invalidateQueries(['books'])
      toast.error(response.error.message || 'update book failed')
      return
    }

    toast.success('Book updated successfully')
  }

  async function deleteBook(id) {
    const respose = await api.delete(`/book/delete/${id}`, {
      token: get(),
    })
    if (respose.error) {
      toast.error(respose.error.message || 'delete book failed')
    }

    toast.success('Book deleted successfully')
    queryClient.setQueriesData(['books'], (oldData) => {
      if (!oldData) return oldData
      return oldData.filter((book) => book.id !== id)
    })
    queryClient.invalidateQueries(['books'])
  }

  return {
    addBook,
    deleteBook,
    addStock,
    updateBook,
  }
}
