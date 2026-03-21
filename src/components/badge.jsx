import { cva, cx } from 'class-variance-authority'
import { Skeleton } from './skeleton'
import Icon from './icon'
import Dot from '../assets/dot.svg?react'

const stockBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm font-base relative',
  {
    variants: {
      level: {
        high: 'bg-green-500/25 border border-green-500 text-white',
        low: 'bg-yellow-500/25 border border-yellow-500 text-white',
        out: 'bg-red-500/25 border border-red-500 text-white',
      },
    },
    defaultVariants: { level: 'high' },
  },
)

/**
 * @param {{ quantity: number, loading?: boolean, className?: string }} props
 */
export function Badge({ quantity, loading, className }) {
  if (loading)
    return <Skeleton className={cx('w-24 h-8', className)} rounded="full" />

  const level = quantity === 0 ? 'out' : quantity <= 5 ? 'low' : 'high'
  const label = quantity === 0 ? 'Sem estoque' : `${quantity} unidades`

  return (
    <span className={cx(stockBadgeVariants({ level }), className)}>
      {label}
    </span>
  )
}
