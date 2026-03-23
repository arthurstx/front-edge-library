import { twMerge } from 'tailwind-merge'

/**
 * @param {{ className?: string, children: import('react').ReactNode } & import('react').ComponentProps<'div'>} props
 */
export function RentalHistoryTable({ className, children, ...props }) {
  return (
    <div
      className={twMerge(
        'rounded-xl border border-white/10 bg-zinc-900 overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
