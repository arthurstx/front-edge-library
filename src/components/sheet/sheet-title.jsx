import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const sheetTitleVariants = cva('text-lg font-semibold text-foreground bg-white')

export function SheetTitle({ className, children, ...props }) {
  return (
    <h2 className={twMerge(sheetTitleVariants(), className)} {...props}>
      {children}
    </h2>
  )
}
