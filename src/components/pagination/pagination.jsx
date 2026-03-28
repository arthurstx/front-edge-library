import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const paginationVariants = cva(
  'flex items-center justify-center gap-3 py-4 border-t border-zinc-700',
)

/**
 * @param {{ page: number, isLastPage: boolean, onPageChange: (newPage: number) => void, className?: string }} props
 */
export function Pagination({ page, isLastPage, onPageChange, className, ...props }) {
  return (
    <div className={twMerge(paginationVariants(), className)} {...props}>
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded border border-zinc-600 text-sm text-zinc-300 disabled:opacity-40 hover:bg-zinc-800 transition cursor-pointer"
      >
        ← Anterior
      </button>
      <span className="text-sm text-zinc-400">Página {page}</span>
      <button
        disabled={isLastPage}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded border border-zinc-600 text-sm text-zinc-300 disabled:opacity-40 hover:bg-zinc-800 transition cursor-pointer"
      >
        Próxima →
      </button>
    </div>
  )
}
