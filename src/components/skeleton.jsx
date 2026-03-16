import { cva, cx } from 'class-variance-authority'

const skeletonVariants = cva('animate-pulse bg-zinc-400 pointer-events-none', {
  variants: {
    rounded: {
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    rounded: 'lg',
  },
})

/**
 * @param {{ rounded?: 'sm' | 'lg' | 'full', className?: string } & React.ComponentProps<'div'>} props
 */
export function Skeleton({ rounded, className, ...props }) {
  return (
    <div className={cx(skeletonVariants({ rounded }), className)} {...props} />
  )
}
