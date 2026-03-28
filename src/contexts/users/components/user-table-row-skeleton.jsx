import { Skeleton } from '../../../components/skeleton'

export function UserTableRowSkeleton() {
  return (
    <tr className="border-t bg-zinc-700/50 border-zinc-600">
      <td className="py-4 px-4">
        <Skeleton className="h-5 w-32" />
      </td>
      <td className="py-4 px-4">
        <Skeleton className="h-5 w-40" />
      </td>
      <td className="py-4 px-4">
        <Skeleton className="h-5 w-20" />
      </td>
      <td className="py-4 px-4 text-right flex items-center justify-end gap-3">
        <Skeleton className="h-9 w-9 rounded-lg" />
      </td>
    </tr>
  )
}
