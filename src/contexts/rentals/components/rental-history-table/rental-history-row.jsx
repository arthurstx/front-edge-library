import { twMerge } from 'tailwind-merge'

/**
 * @param {{ className?: string, children: import('react').ReactNode } & import('react').ComponentProps<'div'>} props
 */
export function RentalHistoryRow({ className, children, ...props }) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-[1fr_160px_140px] items-center px-4 py-3.5 border-b border-white/5 last:border-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
