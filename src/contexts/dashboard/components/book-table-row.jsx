import { Badge } from '../../../components/badge'
import Icon from '../../../components/icon'
import TrashIcon from '../../../assets/trash.svg?react'
import { AddStockDialog } from './add-stock-dialog'
import { EditBookDialog } from './edit-book-dialog'
import CopyIcon from '../../../assets/copy-simple.svg?react'
import { toast } from 'sonner'
import React from 'react'

/**
 *  @typedef { import('../../../types/schema.d.ts').Book } Book
 */

/**
 * @param {{ book: Book, onAddStock?: (data: { bookId: string, quantity: number }) => void, onDelete?: (id: string) => void, onEditBook?: (data: Book) => void }} props
 */
export function BookTableRow({ book, onAddStock, onDelete, onEditBook }) {
  const quantity = book.total_copies
  const badgeVariant =
    quantity === 0 ? 'danger' : quantity <= 5 ? 'warning' : 'success'
  const badgeLabel = quantity === 0 ? 'Sem estoque' : `${quantity} unidades`

  function copyId(id) {
    navigator.clipboard.writeText(id).then(() => {
      toast.success('ID copiado com sucesso!')
    })
  }
  return (
    <tr className="border-t bg-zinc-700 border-zinc-600 hover:bg-zinc-600 transition">
      <td className="py-4 px-4 text-sm text-white font-medium">{book.title}</td>

      <td className="py-4 px-4 text-sm text-white">{book.author}</td>

      <td className="py-4 px-4 text-sm text-white">{book.category}</td>

      <td className="py-4 px-4">
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
      </td>

      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            className="border cursor-pointer rounded-lg border-transparent hover:border-white transition p-2"
            onClick={() => copyId(book.id)}
            aria-label="Copiar ID"
          >
            <Icon svg={CopyIcon} className="size-5 fill-white" />
          </button>
          <AddStockDialog
            onConfirm={(data) =>
              onAddStock({ bookId: book.id, quantity: data.quantity })
            }
          />
          <EditBookDialog
            onConfirm={(data) => onEditBook?.({ ...data, id: book.id })}
          />
          <button
            className="text-gray-400 border rounded-lg border-transparent hover:border-white p-2 cursor-pointer transition"
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
