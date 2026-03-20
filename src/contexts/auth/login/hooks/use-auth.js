import { api } from '../../../../helper/api'
import { toast } from 'sonner'
import { tokenStore } from '../../../../helper/auth'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

export function useAuth() {
  const { set, get, clear } = tokenStore
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  async function authentication(data) {
    const response = await api.post(
      '/auth/login',
      {
        email: data.email,
        password: data.password,
      },
      {
        credentials: 'include',
      },
    )
    const { error } = response

    if (error) {
      toast.error(error.message || 'Error signing in. Please try again.')
      return
    }
    const { token } = response.data
    set(token)
    queryClient.invalidateQueries({ queryKey: ['me'] })
    navigate('/redirect')
    toast.success('Login successful')
  }

  async function logout() {
    await api.post('/auth/logout', null, {
      credentials: 'include',
      token: get(),
    })
    clear()
    queryClient.removeQueries({ queryKey: ['me'] })
    queryClient.invalidateQueries({ queryKey: ['me'] })
    toast.success('Logout successful')
    navigate('/')
  }

  async function refreshToken() {
    const response = await api.post('/auth/refresh', null, {
      credentials: 'include',
    })
    if (response.status === 200) {
      const { token } = response.data
      set(token)
    }
  }

  return { authentication, refreshToken, logout }
}
