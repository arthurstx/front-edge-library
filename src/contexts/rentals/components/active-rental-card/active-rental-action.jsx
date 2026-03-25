import * as React from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * @param {{ className?: string, children?: React.ReactNode } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalAction({ className, children, ...props }) {
  return (
    <div className={twMerge('mt-4 pt-4 border-t border-zinc-700/50', className)} {...props}>
      {children}
    </div>
  )
}
