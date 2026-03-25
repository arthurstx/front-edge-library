import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const sidebarGroupVariants = cva('flex flex-col text-white gap-1 px-2')

export function SidebarGroup({ className, children, ...props }) {
  return (
    <div className={twMerge(sidebarGroupVariants(), className)} {...props}>
      {children}
    </div>
  )
}
