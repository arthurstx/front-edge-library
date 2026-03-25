import { useSheet } from './sheet-context'
import { twMerge } from 'tailwind-merge'

export function SheetTrigger({ className, children, ...props }) {
  const { setOpen } = useSheet()

  return (
    <button
      type="button"
      className={twMerge(className)}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  )
}
