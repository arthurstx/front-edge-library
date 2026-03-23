import { Skeleton } from '../../../../components/skeleton'
import { RentalHistoryRow } from './rental-history-row'

export function RentalHistoryRowSkeleton() {
  return (
    <RentalHistoryRow>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="w-32 h-4" rounded="sm" />
        <Skeleton className="w-24 h-3" rounded="sm" />
      </div>
      <Skeleton className="w-24 h-4" rounded="sm" />
      <Skeleton className="w-24 h-7" rounded="full" />
    </RentalHistoryRow>
  )
}
