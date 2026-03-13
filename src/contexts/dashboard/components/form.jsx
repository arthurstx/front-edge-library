import { cva, cx } from 'class-variance-authority'
import { Button } from '../../../components/button'
import { InputField } from '../../auth/components/input-field'
import { Text } from '../../../components/text'

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
function FormCard({ variant, title, endpoint, className, children }) {
  return (
    <div className={cx(formCardVariants({ variant }), className)}>
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
    </div>
  )
}

/**
 * @param {{ variant?: "default" | "muted", onSubmit?: (e: React.FormEvent) => void, handling?: boolean, className?: string }} props
 */
export function BookForm({ variant, onSubmit, handling, className }) {
  return (
    <FormCard
      variant={variant}
      title="Novo Livro"
      endpoint="POST /book/create"
      className={className}
    >
      <InputField label="Título" placeholder="Ex: O Senhor dos Anéis" />

      <div className="grid grid-cols-2 gap-3">
        <InputField label="Autor" placeholder="J.R.R. Tolkien" />
        <InputField label="Categoria" placeholder="Fantasia" />
      </div>

      <Button variant="primary" full handling={handling} onClick={onSubmit}>
        Cadastrar Livro
      </Button>
    </FormCard>
  )
}

/**
 * @param {{ variant?: "default" | "muted", onSubmit?: (e: React.FormEvent) => void, handling?: boolean, className?: string }} props
 */
export function RentalForm({ variant, onSubmit, handling, className }) {
  return (
    <FormCard
      variant={variant}
      title="Novo Empréstimo"
      endpoint="POST /rental"
      className={className}
    >
      <InputField label="ID do Usuário" placeholder="uuid-do-usuario" />

      <InputField label="ID do Livro" placeholder="uuid-do-livro" />

      <Button variant="secondary" full handling={handling} onClick={onSubmit}>
        Registrar Saída
      </Button>
    </FormCard>
  )
}
