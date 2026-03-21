import { cva, cx } from 'class-variance-authority'
import { Text } from '../../../components/text'

const historyBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1',
  {
    variants: {
      status: {
        returned: 'bg-green-500/15 border-green-500/40',
        overdue: 'bg-red-500/15   border-red-500/40',
      },
    },
    defaultVariants: { status: 'returned' },
  },
)

const historyDotVariants = cva('w-2 h-2 rounded-full shrink-0', {
  variants: {
    status: {
      returned: 'bg-green-400',
      overdue: 'bg-red-400',
    },
  },
  defaultVariants: { status: 'returned' },
})

const historyTextColor = {
  returned: 'text-green-300',
  overdue: 'text-red-300',
}

const historyLabel = {
  returned: 'Devolvido',
  overdue: 'Atrasado',
}

/**
 * @param {{ status: 'returned' | 'overdue', className?: string }} props
 */
export function HistoryStatusBadge({ status, className }) {
  return (
    <span className={cx(historyBadgeVariants({ status }), className)}>
      <span className={historyDotVariants({ status })} />
      <Text
        variant="paragraph-small"
        as="span"
        className={historyTextColor[status]}
      >
        {historyLabel[status]}
      </Text>
    </span>
  )
}
