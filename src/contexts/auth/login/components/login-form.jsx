import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from '../../components/input-field'
import React from 'react'
import { loginFormSchema } from '../models/schemas'
import { Button } from '../../../../components/button'
import { useAuth } from '../hooks/use-auth'
import { Link } from 'react-router'

/**
 * @typedef {{ email: string, password: string }} LoginCredentials
 * @typedef {{ email?: string, password?: string }} FieldErrors
 */

export function LoginForm() {
  const { authentication } = useAuth()
  const [isLoading, setIsLoading] = React.useTransition(false)
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleSubmit(data) {
    setIsLoading(async () => {
      await authentication(data)
    })
  }
  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-3xl font-semibold text-white mb-6">Welcome Back</h1>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <InputField
          label="Email"
          type="email"
          {...form.register('email')}
          placeholder="your@email.com"
          error={form.formState.errors.email?.message}
          disabled={isLoading}
        />
        <InputField
          label="Password"
          type="password"
          {...form.register('password')}
          placeholder="••••••••"
          error={form.formState.errors.password?.message}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant={isLoading ? 'ghost' : 'primary'}
          full
          handling={isLoading}
          className="mt-2"
        >
          Sign In
        </Button>
      </form>
      <Link
        to="/auth/register"
        className=" text-sm text-zinc-400 mt-3 hover:text-zinc-200 transition"
      >
        Don't have an account? Register
      </Link>
      <div className="flex flex-col gap-1 mt-6 text-white">
        <span className="mb-1">admin screen</span>
        <span>admin@example.com</span>
        <span>123456</span>
      </div>
    </div>
  )
}
