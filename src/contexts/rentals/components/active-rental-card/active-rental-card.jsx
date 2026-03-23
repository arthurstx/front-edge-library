import * as React from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const cardVariants = cva(
  'relative flex items-center gap-4 rounded-xl border border-zinc-600/40 bg-zinc-900 px-5 py-4 shadow-[0_0_0_1px_rgba(46, 46, 46, 0.15)]',
)

/**
 * @param {{ className?: string, children?: React.ReactNode } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalCard({ className, children, ...props }) {
  return (
    <div className={twMerge(cardVariants(), className)} {...props}>
      {children}
    </div>
  )
}
