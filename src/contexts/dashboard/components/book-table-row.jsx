import { Skeleton } from '../../../components/skeleton'
import { Badge } from '../../../components/badge'
import Icon from '../../../components/icon'
import TrashIcon from '../../../assets/trash.svg?react'

/**
 * @param {{ book?: { id: string, title: string, author: string, stock: number }, loading?: boolean, onAddStock?: (id: string) => void, onDelete?: (id: string) => void }} props
 */
export function BookTableRow({ book, loading, onAddStock, onDelete }) {
  return (
    <tr className="border-t bg-zinc-700 border-zinc-600 hover:bg-zinc-600 transition">
      <td className="py-4 px-4 text-sm text-white font-medium">
        {loading ? <Skeleton className="h-4 w-36" /> : book.title}
      </td>

      <td className="py-4 px-4 text-sm text-white">
        {loading ? <Skeleton className="h-4 w-24" /> : book.author}
      </td>

      <td className="py-4 px-4">
        <Badge quantity={book?.stock} loading={loading} />
      </td>

      <td className="py-4 px-4 text-right">
        {loading ? (
          <Skeleton className="h-4 w-28 ml-auto" />
        ) : (
          <div className="flex items-center justify-end gap-3">
            <button
              className="text-blue-600 text-sm font-medium hover:underline"
              onClick={() => onAddStock?.(book.id)}
            >
              + ESTOQUE
            </button>
            <button
              className="text-gray-400 hover:text-red-500 transition"
              onClick={() => onDelete?.(book.id)}
              aria-label="Excluir livro"
            >
              <Icon svg={TrashIcon} className="size-5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
