import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const sidebarHeaderVariants = cva(
  'flex h-14 items-center bg-zinc-900 border-b px-4',
)

export function SidebarHeader({ className, children, ...props }) {
  return (
    <div className={twMerge(sidebarHeaderVariants(), className)} {...props}>
      {children}
    </div>
  )
}
