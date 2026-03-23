import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { Text } from '../../../../components/text'

/**
 * @param {{ title: React.ReactNode, author: React.ReactNode, genre: React.ReactNode, className?: string } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalInfo({ title, author, genre, className, ...props }) {
  return (
    <div className={twMerge('flex flex-col gap-1 min-w-0', className)} {...props}>
      <Text variant="heading-small" as="p" className="truncate">
        {title}
      </Text>
      <Text variant="paragraph-small" as="p" className="text-zinc-400 truncate">
        {author} · {genre}
      </Text>
    </div>
  )
}
