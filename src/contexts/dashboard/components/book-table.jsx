import { cx } from 'class-variance-authority'
import { Text } from '../../../components/text'
import { InputField } from '../../auth/components/input-field'
import { BookTableRow } from './book-table-row'
import { Pagination } from './pagination'
import { BookTableRowSkeleton } from './book-table-row-skeleton'
import { useBooks } from '../hooks/use-books'
import { useBook } from '../hooks/use-book'

const COLUMNS = ['Title', 'Author', 'Category', 'Stock', 'Actions']

/**
 * @param {{
 *   books?: Array<{ id: string, title: string, author: string, stock: number }>,
 *   loading?: boolean,
 *   currentPage?: number,
 *   totalPages?: number,
 *   onPageChange?: (page: number) => void,
 *   onAddStock?: (id: string) => void,
 *   onDelete?: (id: string) => void,
 *   searchValue?: string,
 *   onSearchChange?: (value: string) => void,
 *   className?: string,
 * }} props
 */
export function BookTable({
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onAddStock,
  onDelete,
  searchValue = '',
  onSearchChange,
  className,
}) {
  const { books, isLoadingBooks = true } = useBooks()
  const { addStock, deleteBook, updateBook } = useBook()

  return (
    <div
      className={cx(
        'flex flex-col rounded-xl border border-zinc-600 bg-zinc-900 overflow-hidden',
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-600">
        <Text
          as="p"
          variant="label-small"
          className="text-white uppercase tracking-wider"
        >
          Livros Recentes{' '}
          <span className="text-gray-200 font-normal normal-case tracking-normal">
            (GET /book/list)
          </span>
        </Text>

        <InputField
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <table className="w-full">
        <thead className="bg-zinc-800">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col}
                className={cx(
                  'py-3 px-4 text-left text-[11px] font-semibold tracking-wider uppercase text-white',
                  col === 'Actions' && 'text-right',
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoadingBooks
            ? Array.from({ length: 4 }).map((_, index) => (
                <BookTableRowSkeleton key={index} />
              ))
            : books.map((book) => (
                <BookTableRow
                  key={book.id}
                  book={book}
                  onAddStock={addStock}
                  onDelete={deleteBook}
                  onEditBook={updateBook}
                />
              ))}

          {!isLoadingBooks && books.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-10 text-center text-sm text-gray-400"
              >
                Nenhum livro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}
