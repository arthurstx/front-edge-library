import { cva, cx } from 'class-variance-authority'
import { Text } from '../../../components/text'

const statCardVariants = cva('flex flex-col gap-2 rounded-xl border p-5', {
  variants: {
    variant: {
      purple: 'bg-[#8a5dd4] ',
      orange: 'bg-[#dd474a] ',
      blue: 'bg-[#0ec399] ',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const statCardValueVariants = cva('font-semibold leading-none', {
  variants: {
    accent: {
      false: 'text-white',
      true: 'text-blue-600',
    },
    size: {
      sm: 'text-2xl',
      md: 'text-3xl',
    },
  },
  defaultVariants: {
    accent: false,
    size: 'md',
  },
})

/**
 * @param {{ label: string, value: string | number, accent?: boolean, variant?: "default" | "outlined", size?: "sm" | "md", className?: string }} props
 */
export function StatCard({
  label,
  value,
  accent = false,
  variant,
  size,
  className,
}) {
  return (
    <div className={cx(statCardVariants({ variant }), className)}>
      <Text variant="label-medium">{label}</Text>
      <span className={statCardValueVariants({ accent, size })}>
        {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
      </span>
    </div>
  )
}
