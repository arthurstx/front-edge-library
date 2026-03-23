import * as React from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import Icon from '../../../../components/icon'
import BookIcon from '../../../../assets/book.svg?react'

const coverVariants = cva(
  'flex shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500',
  {
    variants: {
      size: { md: 'w-12 h-16' },
    },
    defaultVariants: { size: 'md' },
  },
)

/**
 * @param {{ coverUrl?: string, title?: string, className?: string } & React.ComponentProps<'div'>} props
 */
export function ActiveRentalCover({ coverUrl, title, className, ...props }) {
  return (
    <div className={twMerge(coverVariants({ size: 'md' }), className)} {...props}>
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={title || 'Book cover'}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <Icon svg={BookIcon} className="fill-white" />
      )}
    </div>
  )
}
