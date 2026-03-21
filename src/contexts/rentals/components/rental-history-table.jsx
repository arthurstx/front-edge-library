import { twMerge } from 'tailwind-merge'
import {
  RentalHistoryHeader,
  RentalHistoryRow,
  RentalHistoryRowSkeleton,
} from './rental-history-table-parts'

const SKELETON_ROWS = 5

/**
 * @param {import('./types/rental-history-table').RentalHistoryTableProps} props
 */
export function RentalHistoryTable({ items, loading, className, ...props }) {
  return (
    <div
      className={twMerge(
        'rounded-xl border border-white/10 bg-[#1a1d27] overflow-hidden',
        className,
      )}
      {...props}
    >
      <RentalHistoryHeader />

      {loading
        ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <RentalHistoryRowSkeleton key={i} />
          ))
        : items.map((item) => <RentalHistoryRow key={item.id} item={item} />)}
    </div>
  )
}
