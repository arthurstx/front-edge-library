import { Text } from '../../../components/text'
import { Skeleton } from '../../../components/skeleton'
import { HistoryStatusBadge } from './history-badge'

export function RentalHistoryHeader() {
  return (
    <div className="grid grid-cols-[1fr_160px_140px] px-4 pb-2 border-b border-white/10">
      <Text
        variant="label-xsmall"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        Livro
      </Text>
      <Text
        variant="label-xsmall"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        Devolução
      </Text>
      <Text
        variant="label-xsmall"
        as="span"
        className="text-zinc-500 uppercase tracking-wider"
      >
        Status
      </Text>
    </div>
  )
}

/**
 * @param {{ item: import('./types/rental-history-table').RentalHistoryItem }} props
 */
export function RentalHistoryRow({ item }) {
  return (
    <div className="grid grid-cols-[1fr_160px_140px] items-center px-4 py-3.5 border-b border-white/5 last:border-0">
      <div className="flex flex-col gap-0.5 min-w-0">
        <Text variant="heading-small" as="p" className="truncate">
          {item.title}
        </Text>
        <Text
          variant="paragraph-small"
          as="p"
          className="text-zinc-500 truncate"
        >
          {item.author}
        </Text>
      </div>

      <Text variant="paragraph-small" as="span" className="text-zinc-300">
        {item.returnDate}
      </Text>

      <HistoryStatusBadge status={item.status} />
    </div>
  )
}

// --- RentalHistoryRowSkeleton ---

export function RentalHistoryRowSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_160px_140px] items-center px-4 py-3.5 border-b border-white/5 last:border-0">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="w-32 h-4" rounded="sm" />
        <Skeleton className="w-24 h-3" rounded="sm" />
      </div>
      <Skeleton className="w-24 h-4" rounded="sm" />
      <Skeleton className="w-24 h-7" rounded="full" />
    </div>
  )
}
