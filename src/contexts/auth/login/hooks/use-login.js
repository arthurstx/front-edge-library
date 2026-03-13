import { api } from '../../../../helper/api'
import { toast } from 'sonner'
import { tokenStore } from '../../../../helper/auth'
import { useNavigate } from 'react-router'

export function useLogin() {
  const { set } = tokenStore
  const navigate = useNavigate()
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
    } else if (response.status === 200) {
      const { token } = response.data
      set(token)
      toast.success('Login successful')
      navigate('/dashboard')
    }
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

  return { authentication, refreshToken }
}
