import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { Text } from '../../../../components/text'

/**
 * @param {{ label: React.ReactNode, value: React.ReactNode, className?: string } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalDate({ label, value, className, ...props }) {
  return (
    <div className={twMerge('flex flex-col gap-0.5', className)} {...props}>
      <Text
        variant="label-xsmall"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        {label}
      </Text>
      <Text variant="paragraph-small" as="span">
        {value}
      </Text>
    </div>
  )
}
