import { Skeleton } from '../../../components/skeleton'
import { Badge } from '../../../components/badge'

export function BookTableRowSkeleton() {
  return (
    <tr className="border-t bg-zinc-700 border-zinc-600">
      <td className="py-4 px-4">
        <Skeleton className="h-7 w-38" />
      </td>

      <td className="py-4 px-4">
        <Skeleton className="h-7 w-30 " />
      </td>

      <td className="py-4 px-4">
        <Skeleton className="h-7 w-30 " />
      </td>

      <td className="py-4 px-4">
        <Badge loading />
      </td>

      <td className="py-4 px-4 text-right">
        <Skeleton className="h-7 w-30 ml-auto" />
      </td>
    </tr>
  )
}
