import { api } from '../../../../helper/api'
import { toast } from 'sonner'

export function useLogin() {
  async function authentication(data) {
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      if (response.status === 401) {
        toast.error('Invalid email or password')
      } else if (response.status === 200) {
        toast.success('Login successful')
      }
    } catch (error) {
      toast.error('An error occurred during login')
      throw error
    }
  }

  return { authentication }
}
