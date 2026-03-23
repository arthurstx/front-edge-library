import * as React from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * @param {{ className?: string, children?: React.ReactNode } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalContent({ className, children, ...props }) {
  return (
    <div className={twMerge('flex flex-col gap-1 flex-1 min-w-0', className)} {...props}>
      {children}
    </div>
  )
}
