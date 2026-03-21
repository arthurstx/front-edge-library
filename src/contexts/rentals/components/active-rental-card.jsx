import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Skeleton } from '../../../components/skeleton'
import { RentalCover, RentalInfo, RentalMeta } from './active-rental-card-parts'
import { Text } from '../../../components/text'

const cardVariants = cva(
  'relative flex items-center gap-4 rounded-xl border border-zinc-600/40 bg-zinc-900 px-5 py-4 shadow-[0_0_0_1px_rgba(46, 46, 46, 0.15)]',
)

function ActiveRentalCardSkeleton({ className, ...props }) {
  return (
    <div className={twMerge(cardVariants(), className)} {...props}>
      <Skeleton className="w-12 h-16 shrink-0" rounded="lg" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="w-40 h-4" rounded="sm" />
        <Skeleton className="w-28 h-3" rounded="sm" />
        <div className="flex gap-6 mt-1">
          <Skeleton className="w-20 h-8" rounded="sm" />
          <Skeleton className="w-20 h-8" rounded="sm" />
          <Skeleton className="w-28 h-8" rounded="full" />
        </div>
      </div>
    </div>
  )
}

/**
 * @param {import('./types/active-rental-card').ActiveRentalCardProps} props
 */
export function ActiveRentalCard({
  title,
  author,
  genre,
  coverUrl,
  withdrawalDate,
  returnDate,
  status,
  statusLabel,
  loading,
  className,
  ...props
}) {
  if (loading)
    return <ActiveRentalCardSkeleton className={className} {...props} />

  return (
    <div className={twMerge(cardVariants(), className)} {...props}>
      <RentalCover coverUrl={coverUrl} title={title} />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <RentalInfo title={title} author={author} genre={genre} />
        <RentalMeta
          withdrawalDate={withdrawalDate}
          returnDate={returnDate}
          status={status}
          statusLabel={statusLabel}
        />
      </div>
    </div>
  )
}
