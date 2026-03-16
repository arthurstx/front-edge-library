import { Badge } from '../../../components/badge'
import Icon from '../../../components/icon'
import TrashIcon from '../../../assets/trash.svg?react'
import { AddStockDialog } from './add-stock-dialog'

/**
 *  @typedef { import('../../../types/schema.d.ts').Book } Book
 */

/**
 * @param {{ book: Book, onAddStock?: (data: { bookId: string, quantity: number }) => void, onDelete?: (id: string) => void }} props
 */
export function BookTableRow({ book, onAddStock, onDelete }) {
  return (
    <tr className="border-t bg-zinc-700 border-zinc-600 hover:bg-zinc-600 transition">
      <td className="py-4 px-4 text-sm text-white font-medium">{book.title}</td>

      <td className="py-4 px-4 text-sm text-white">{book.author}</td>

      <td className="py-4 px-4 text-sm text-white">{book.category}</td>

      <td className="py-4 px-4">
        <Badge quantity={book.total_copies} />
      </td>

      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-3">
          <AddStockDialog
            onConfirm={(data) =>
              onAddStock({ bookId: book.id, quantity: data.quantity })
            }
          />
          <button
            className="text-gray-400 hover:text-red-500 transition"
            onClick={() => onDelete?.(book.id)}
            aria-label="Excluir livro"
          >
            <Icon svg={TrashIcon} className="size-5 fill-white" />
          </button>
        </div>
      </td>
    </tr>
  )
}
