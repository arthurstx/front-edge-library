import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Text } from '../../../components/text'
import { StatusBadge } from './rental-badge'
import Icon from '../../../components/icon'
import BookIcon from '../../../assets/book.svg?react'

// --- RentalCover ---

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
 * @param {{ coverUrl?: string, title: string, className?: string }} props
 */
export function RentalCover({ coverUrl, title, className }) {
  return (
    <div className={twMerge(coverVariants({ size: 'md' }), className)}>
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <Icon svg={BookIcon} className="fill-white" />
      )}
    </div>
  )
}

// --- RentalInfo ---

/**
 * @param {{ title: string, author: string, genre: string }} props
 */
export function RentalInfo({ title, author, genre }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <Text variant="heading-small" as="p" className="truncate">
        {title}
      </Text>
      <Text variant="paragraph-small" as="p" className="text-zinc-400 truncate">
        {author} · {genre}
      </Text>
    </div>
  )
}

// --- RentalDateField ---

/**
 * @param {{ label: string, value: string }} props
 */
export function RentalDateField({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
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

// --- RentalMeta ---

/**
 * @param {{ withdrawalDate: string, returnDate: string, status: import('./types/active-rental-card').RentalStatus, statusLabel: string }} props
 */
export function RentalMeta({
  withdrawalDate,
  returnDate,
  status,
  statusLabel,
}) {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mt-1">
      <RentalDateField label="Retirada" value={withdrawalDate} />
      <RentalDateField label="Devolução" value={returnDate} />
      <div className="flex flex-col gap-0.5">
        <Text
          variant="label-xsmall"
          as="span"
          className="text-zinc-500 uppercase tracking-wider"
        >
          Status
        </Text>
        <StatusBadge status={status} label={statusLabel} />
      </div>
    </div>
  )
}
