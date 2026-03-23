import { Skeleton } from '../../../components/skeleton'

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
        <Skeleton className="w-24 h-8" rounded="full" />
      </td>

      <td className="py-4 px-4 text-right">
        <Skeleton className="h-7 w-30 ml-auto" />
      </td>
    </tr>
  )
}
