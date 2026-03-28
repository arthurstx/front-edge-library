import { Outlet, Link, useLocation } from 'react-router'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
} from '../../components/sidebar'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../components/sheet'
import { MainHeader } from '../../components/main-header'
import Icon from '../../components/icon'
import LayoutDashboardIcon from '../../assets/layout-dashboard.svg?react'
import ClipboardListIcon from '../../assets/clipboard-list.svg?react'
import MenuIcon from '../../assets/menu.svg?react'
import UsersIcon from '../../assets/users.svg?react'

const navItems = [
  { title: 'Home', href: '/dashboard', icon: LayoutDashboardIcon },
  { title: 'Aluguéis', href: '/dashboard/rentals', icon: ClipboardListIcon },
  { title: 'Usuários', href: '/dashboard/users', icon: UsersIcon },
]

function NavLinks({ pathname }) {
  return (
    <>
      {navItems.map((item) => (
        <Link key={item.href} to={item.href} className="text-white">
          <SidebarItem active={pathname === item.href}>
            <Icon svg={item.icon} className="h-5 w-5 fill-white" />
            {item.title}
          </SidebarItem>
        </Link>
      ))}
    </>
  )
}

export function LayoutDashboard() {
  const location = useLocation()

  return (
    <Sheet>
      <div className="flex h-screen w-full bg-background overflow-hidden relative">
        <Sidebar className="hidden md:flex flex-col z-10 border-r border-zinc-700 w-64">
          <SidebarHeader className="font-semibold text-lg text-white flex items-center h-15">
            Admin Panel
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <SidebarGroup>
              <NavLinks pathname={location.pathname} />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex w-full flex-1 flex-col h-full relative">
          <div className="relative">
            <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-50">
              <SheetTrigger className="p-2 text-zinc-300 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                <Icon svg={MenuIcon} className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>
            </div>
            <MainHeader className="max-md:pl-16" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>

      <SheetContent side="left">
        <SheetHeader className="mb-4">
          <SheetTitle>Admin Panel</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          <NavLinks pathname={location.pathname} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
