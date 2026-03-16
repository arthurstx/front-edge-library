import { cva, cx } from 'class-variance-authority'
import { Button } from '../../../components/button'
import { InputField } from '../../auth/components/input-field'
import { Text } from '../../../components/text'
import React from 'react'
import { useBook } from '../hooks/use-book'
import { useForm } from 'react-hook-form'
import { bookFormSchema } from '../models/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

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

/**
 * @param {{ variant?: "default" | "muted", title: string, endpoint: string, className?: string, children: React.ReactNode }} props
 */
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

/**
 * @param {{ variant?: "default" | "muted", onSubmit?: (e: React.FormEvent) => void, handling?: boolean, className?: string }} props
 */
export function BookForm() {
  const form = useForm({
    resolver: zodResolver(bookFormSchema),
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
        error={form.formState.errors.title?.message}
        {...form.register('title')}
      />

      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Autor"
          placeholder="J.R.R. Tolkien"
          error={form.formState.errors.author?.message}
          {...form.register('author')}
        />
        <InputField
          label="Categoria"
          placeholder="Fantasia"
          error={form.formState.errors.category?.message}
          {...form.register('category')}
        />
      </div>

      <Button type="submit" variant="primary" full handling={isLoading}>
        Cadastrar Livro
      </Button>
    </FormCard>
  )
}

/**
 * @param {{ variant?: "default" | "muted", onSubmit?: (e: React.FormEvent) => void, handling?: boolean, className?: string }} props
 */
export function RentalForm({ variant, onSubmit, handling, className }) {
  const form = useForm()
  return (
    <FormCard
      variant={variant}
      title="Novo Empréstimo"
      endpoint="POST /rental"
      className={className}
    >
      <InputField
        label="ID do Usuário"
        placeholder="uuid-do-usuario"
        {...form.register('userId')}
      />

      <InputField
        label="ID do Livro"
        placeholder="uuid-do-livro"
        {...form.register('bookId')}
      />

      <Button variant="secondary" full handling={handling} onClick={onSubmit}>
        Registrar Saída
      </Button>
    </FormCard>
  )
}
