import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const sidebarItemVariants = cva(
  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      active: {
        true: 'bg-muted text-foreground font-semibold',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
)

export function SidebarItem({ className, active, children, ...props }) {
  return (
    <div
      className={twMerge(sidebarItemVariants({ active }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
