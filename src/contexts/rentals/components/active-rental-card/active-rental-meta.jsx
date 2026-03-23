import * as React from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * @param {{ className?: string, children?: React.ReactNode } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalMeta({ className, children, ...props }) {
  return (
    <div className={twMerge('flex flex-wrap items-end gap-x-6 gap-y-2 mt-1', className)} {...props}>
      {children}
    </div>
  )
}
