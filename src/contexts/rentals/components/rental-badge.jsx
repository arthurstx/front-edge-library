import { cva, cx } from 'class-variance-authority'
import { Text } from '../../../components/text'

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1',
  {
    variants: {
      status: {
        due_soon: 'bg-yellow-500/15 border-yellow-500/40',
        on_time: 'bg-green-500/15  border-green-500/40',
        overdue: 'bg-red-500/15    border-red-500/40',
      },
    },
    defaultVariants: { status: 'on_time' },
  },
)

const statusDotVariants = cva('w-2 h-2 rounded-full shrink-0', {
  variants: {
    status: {
      due_soon: 'bg-yellow-400',
      on_time: 'bg-green-400',
      overdue: 'bg-red-400',
    },
  },
  defaultVariants: { status: 'on_time' },
})

const statusTextColor = {
  due_soon: 'text-yellow-300',
  on_time: 'text-green-300',
  overdue: 'text-red-300',
}

/**
 * @param {{ status: 'due_soon' | 'on_time' | 'overdue', label: string, className?: string }} props
 */
export function StatusBadge({ status, label, className }) {
  return (
    <span className={cx(statusBadgeVariants({ status }), className)}>
      <span className={statusDotVariants({ status })} />
      <Text
        variant="paragraph-small"
        as="span"
        className={statusTextColor[status]}
      >
        {label}
      </Text>
    </span>
  )
}
