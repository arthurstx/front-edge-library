import { cx } from 'class-variance-authority'
import { Text } from '../../../components/text'
import { InputField } from '../../auth/components/input-field'
import { BookTableRow } from './book-table-row'
import { Pagination } from './pagination'

const COLUMNS = ['Título', 'Autor', 'Estoque', 'Ações']

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
  books = [],
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onAddStock,
  onDelete,
  searchValue,
  onSearchChange,
  className,
}) {
  const rows = [
    { id: '1', title: 'O Senhor dos Anéis', author: 'J Tolkien', stock: 12 },
    { id: '2', title: '1984', author: 'George Orwell', stock: 2 },
    { id: '3', title: 'Dom Casmurro', author: 'Machado de Assis', stock: 0 },
  ]

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
                  col === 'Ações' && 'text-right',
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((book, index) => (
            <BookTableRow
              key={book?.id ?? index}
              book={book}
              loading={loading}
              onAddStock={onAddStock}
              onDelete={onDelete}
            />
          ))}

          {!loading && books.length === 0 && (
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
