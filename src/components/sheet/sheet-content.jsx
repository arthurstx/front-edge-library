import { twMerge } from 'tailwind-merge'
import { useSheet } from './sheet-context'
import { cva } from 'class-variance-authority'
import Icon from '../icon'
import XIcon from '../../assets/x.svg?react'

const sheetContentVariants = cva(
  [
    'fixed z-50 flex flex-col gap-4 p-6 shadow-lg',
    'bg-zinc-900',
    'transition-transform ease-in-out duration-300',
  ].join(' '),
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 w-full border-b',
        bottom: 'inset-x-0 bottom-0 w-full border-t',
        left: 'inset-y-0 left-0 w-3/4 max-w-sm border-r',
        right: 'inset-y-0 right-0 w-3/4 max-w-sm border-l',
      },
    },
    defaultVariants: {
      side: 'left',
    },
  },
)

function getTranslateClass(side, open) {
  if (open) return 'translate-x-0 translate-y-0'
  const map = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
  }
  return map[side] ?? '-translate-x-full'
}

export function SheetContent({ className, side = 'left', children, ...props }) {
  const { open, setOpen } = useSheet()

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={twMerge(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      />

      <div
        style={{ height: '100dvh' }}
        className={twMerge(
          sheetContentVariants({ side }),
          getTranslateClass(side, open),
          !open && 'pointer-events-none',
          className,
        )}
        {...props}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Icon svg={XIcon} className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </>
  )
}
