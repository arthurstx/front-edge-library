import { cx } from 'class-variance-authority'
import { Text } from '../../../components/text'
import { InputField } from '../../auth/components/input-field'
import { UserTableRow } from './user-table-row'
import { UserTableRowSkeleton } from './user-table-row-skeleton'
import { useUsers } from '../hooks/use-users'
import { debounce } from '../../../helper/debouce'
import { Pagination } from '../../../components/pagination'
import React from 'react'

const COLUMNS = ['Name', 'Email', 'Role', 'Actions']

export function UserTable({ className }) {
  const [inputValue, setInputValue] = React.useState('')
  const { users, isLoadingUsers, isLastPage, filters } = useUsers()

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

  function handlePageChange(newPage) {
    filters.setPage(newPage)
  }

  function renderTableBody() {
    if (isLoadingUsers) {
      return Array.from({ length: 4 }).map((_, index) => (
        <UserTableRowSkeleton key={index} />
      ))
    }

    if (users.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="py-10 text-center text-sm text-gray-400">
            No users found{isSearching ? ` for "${inputValue}"` : ''}.
          </td>
        </tr>
      )
    }

    return users.map((user) => <UserTableRow key={user.id} user={user} />)
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
          System Users{' '}
          <span className="text-gray-200 font-normal normal-case tracking-normal">
            (GET /users)
          </span>
        </Text>
        <InputField
          placeholder="Search (name, email)..."
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

      {(filters.page > 1 || !isLastPage) && (
        <Pagination
          page={Number(filters.page)}
          isLastPage={isLastPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
