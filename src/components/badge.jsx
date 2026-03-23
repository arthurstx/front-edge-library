import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-base relative border',
  {
    variants: {
      variant: {
        success: 'bg-green-500/25 border-green-500 text-white',
        warning: 'bg-yellow-500/25 border-yellow-500 text-white',
        danger: 'bg-red-500/25 border-red-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
)

/**
 * Nota: Sempre quando for usar esse componente, a lógica da troca de cores
 * tem que ficar sob responsabilidade do componente que estiver importando ele.
 * Não coloque regras de negócio internamente.
 * 
 * @param {{ variant?: 'success' | 'warning' | 'danger', className?: string, children?: import('react').ReactNode } & import('react').ComponentProps<'span'>} props
 */
export function Badge({ variant, className, children, ...props }) {
  return (
    <span className={twMerge(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  )
}
