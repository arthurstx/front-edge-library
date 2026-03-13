import { cva, cx } from 'class-variance-authority'

const pageButtonVariants = cva(
  'w-7 h-7 flex items-center justify-center rounded text-sm font-medium transition border',
  {
    variants: {
      active: {
        true: 'bg-blue-600 border-blue-600 text-white',
        false: 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
      },
    },
    defaultVariants: { active: false },
  },
)

/**
 * @param {{ currentPage: number, totalPages: number, onPageChange?: (page: number) => void, className?: string }} props
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) {
  return (
    <div
      className={cx('flex items-center justify-center gap-1.5 py-4', className)}
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={pageButtonVariants({ active: page === currentPage })}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
