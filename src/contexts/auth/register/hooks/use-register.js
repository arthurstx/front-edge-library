import { api } from '../../../../helper/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

export function useRegister() {
  const navigate = useNavigate()

  async function register(data) {
    try {
      const response = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      const error = JSON.parse(response.error)
      if (error) {
        toast.error(error.message || 'Error signing up. Please try again.')
      } else if (response.status === 201 || response.status === 200) {
        toast.success('Account created successfully!')
        navigate('/')
      }
    } catch (error) {
      toast.error('An error occurred during registration')
      throw error
    }
  }

  return { register }
}
