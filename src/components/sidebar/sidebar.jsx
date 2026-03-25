import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const sidebarVariants = cva(
  'hidden md:flex flex-col border-r bg-background h-screen transition-all duration-300 group/sidebar overflow-hidden',
  {
    variants: {
      state: {
        expanded: 'w-64',
        collapsed: 'w-16',
      },
    },
    defaultVariants: {
      state: 'expanded',
    },
  }
)

export function Sidebar({ className, state = 'expanded', children, ...props }) {
  return (
    <aside
      className={twMerge(sidebarVariants({ state }), className)}
      data-state={state}
      {...props}
    >
      {children}
    </aside>
  )
}
