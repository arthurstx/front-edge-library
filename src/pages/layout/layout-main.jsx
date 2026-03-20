import { MainHeader } from '../../components/main-header'
import { Outlet } from 'react-router'

export function LayoutMain() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  )
}
