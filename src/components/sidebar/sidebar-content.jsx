import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const sidebarContentVariants = cva('flex-1 overflow-auto bg-zinc-900 py-2')

export function SidebarContent({ className, children, ...props }) {
  return (
    <div className={twMerge(sidebarContentVariants(), className)} {...props}>
      {children}
    </div>
  )
}
