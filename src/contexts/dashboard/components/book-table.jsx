import { cx } from 'class-variance-authority'
import { Text } from '../../../components/text'
import { InputField } from '../../auth/components/input-field'
import { BookTableRow } from './book-table-row'
import { Pagination } from './pagination'
import { BookTableRowSkeleton } from './book-table-row-skeleton'
import { useBooks } from '../hooks/use-books'
import { useSearchBooks } from '../hooks/use-seach-books'
import { useBook } from '../hooks/use-book'
import { debounce } from '../../../helper/debouce'
import React from 'react'

const COLUMNS = ['Title', 'Author', 'Category', 'Stock', 'Actions']

/**
 * @param {{
 *   totalPages?: number,
 *   onPageChange?: (page: number) => void,
 *   currentPage?: number,
 *   className?: string,
 * }} props
 */
export function BookTable({
  totalPages = 1,
  onPageChange,
  currentPage = 1,
  className,
}) {
  const [inputValue, setInputValue] = React.useState('')

  const { books, isLoadingBooks = true, filters: booksFilters } = useBooks()
  const { addStock, deleteBook, updateBook } = useBook()
  const {
    filters,
    books: searchBooks,
    isLoadingBooks: isSearchLoading,
  } = useSearchBooks()

  const isSearching =
    filters.query !== null &&
    filters.query !== undefined &&
    filters.query !== ''

  const setQueryRef = React.useRef(filters.setQuery)

  React.useEffect(() => {
    setQueryRef.current = filters.setQuery
  }, [filters.setQuery])

  const debouncedSetValue = React.useRef(
    // eslint-disable-next-line react-hooks/refs
    debounce((value) => setQueryRef.current(value), 400),
  ).current

  function handleInputChange(e) {
    const value = e.target.value
    setInputValue(value)
    debouncedSetValue(value)
  }

  function renderTableBody() {
    if (isSearching) {
      if (isSearchLoading) {
        return Array.from({ length: 4 }).map((_, index) => (
          <BookTableRowSkeleton key={index} />
        ))
      }

      if (searchBooks.length === 0) {
        return (
          <tr>
            <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
              Nenhum resultado encontrado para "{inputValue}".
            </td>
          </tr>
        )
      }

      return searchBooks.map((book) => (
        <BookTableRow
          key={book.id}
          book={book}
          onAddStock={addStock}
          onDelete={deleteBook}
          onEditBook={updateBook}
        />
      ))
    }

    // — Modo listagem normal —
    if (isLoadingBooks) {
      return Array.from({ length: 4 }).map((_, index) => (
        <BookTableRowSkeleton key={index} />
      ))
    }

    if (books.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
            Nenhum livro encontrado.
          </td>
        </tr>
      )
    }

    return books.map((book) => (
      <BookTableRow
        key={book.id}
        book={book}
        onAddStock={addStock}
        onDelete={deleteBook}
        onEditBook={updateBook}
      />
    ))
  }

  return (
    <div
      className={cx(
        'flex flex-col rounded-xl border mb-5 border-zinc-600 bg-zinc-900 overflow-hidden',
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
          value={inputValue}
          onChange={handleInputChange}
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

        <tbody>{renderTableBody()}</tbody>
      </table>

      {!isSearching && books.length > 5 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}
