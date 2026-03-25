import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const sheetHeaderVariants = cva(
  'flex flex-col space-y-2 bg-white text-center sm:text-left',
)

export function SheetHeader({ className, children, ...props }) {
  return (
    <div className={twMerge(sheetHeaderVariants(), className)} {...props}>
      {children}
    </div>
  )
}
