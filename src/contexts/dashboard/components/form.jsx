import { cva, cx } from 'class-variance-authority'
import { Button } from '../../../components/button'
import { InputField } from '../../auth/components/input-field'
import { Text } from '../../../components/text'
import React from 'react'
import { useBook } from '../hooks/use-book'
import { useForm } from 'react-hook-form'
import { bookFormSchema } from '../models/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRental } from '../../rentals/hooks/use-rental'
import { rentalFormSchema } from '../../rentals/models/schemas'

const formCardVariants = cva('flex flex-col gap-5 rounded-xl border p-5', {
  variants: {
    variant: {
      default: 'bg-zinc-900 border-zinc-700 shadow-md shadow-zinc-700',
      muted: 'bg-gray-50 border-gray-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function FormCard({ variant, title, endpoint, className, children, ...props }) {
  return (
    <form className={cx(formCardVariants({ variant }), className)} {...props}>
      <Text
        as="p"
        variant="label-small"
        className="text-gray-500 uppercase tracking-wider"
      >
        {title}{' '}
        <span className="text-gray-400 font-normal normal-case tracking-normal">
          ({endpoint})
        </span>
      </Text>

      {children}
    </form>
  )
}

function SelectField({
  label,
  error,
  disabled,
  className,
  children,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Text as="label" variant="paragraph-small" className="text-zinc-400">
          {label}
        </Text>
      )}
      <select
        disabled={disabled}
        className={cx(
          'w-full bg-zinc-700 text-white px-4 py-2 rounded-lg outline-none transition',
          'focus:ring-2 focus:ring-blue-500',
          "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_12px_center]",
          error && 'ring-2 ring-red-500 focus:ring-red-500',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <Text variant="paragraph-small" className="text-red-400">
          {error}
        </Text>
      )}
    </div>
  )
}

export function BookForm() {
  const CATEGORIES = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'History',
    'Biography',
    'Fantasy',
    'Mystery',
    'Romance',
    'Technology',
    'Philosophy',
  ]

  const form = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      category: '',
    },
  })

  const [isLoading, setIsLoading] = React.useTransition()
  const { addBook } = useBook()

  function handleSubmit(data) {
    setIsLoading(async () => await addBook(data))
    console.log(data)
    form.reset()
  }

  return (
    <FormCard
      title="Novo Livro"
      endpoint="POST /book/create"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <InputField
        label="Título"
        placeholder="Ex: O Senhor dos Anéis"
        disabled={isLoading}
        error={form.formState.errors.title?.message}
        {...form.register('title')}
      />

      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Autor"
          placeholder="J.R.R. Tolkien"
          disabled={isLoading}
          error={form.formState.errors.author?.message}
          {...form.register('author')}
        />

        <SelectField
          label="Category"
          disabled={isLoading}
          error={form.formState.errors.category?.message}
          {...form.register('category', { required: 'Category is required' })}
        >
          <option value="">Selecione uma categoria</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectField>
      </div>

      <Button type="submit" variant="primary" full handling={isLoading}>
        Cadastrar Livro
      </Button>
    </FormCard>
  )
}

export function RentalForm({ variant, onSubmit, handling, className }) {
  const form = useForm({
    resolver: zodResolver(rentalFormSchema),
    defaultValues: {
      category: '',
    },
  })

  const [isLoading, setIsLoading] = React.useTransition()
  const { create } = useRental()

  function handleSubmit(data) {
    setIsLoading(async () => await create(data))
    console.log(data)
    form.reset()
  }
  return (
    <FormCard
      variant={variant}
      title="Novo Empréstimo"
      endpoint="POST /rental"
      className={className}
      disabled={isLoading}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <InputField
        label="ID do Usuário"
        placeholder="uuid-do-usuario"
        disabled={isLoading}
        {...form.register('userId')}
      />

      <InputField
        label="ID do Livro"
        placeholder="uuid-do-livro"
        disabled={isLoading}
        {...form.register('bookId')}
      />

      <Button
        type="submit"
        variant="secondary"
        full
        handling={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Criando Empréstimo...' : 'Criar Empréstimo'}
      </Button>
    </FormCard>
  )
}
