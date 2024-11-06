import { type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, useGetUserProfile } from 'api/queries'
import { useDirty } from 'contexts/DirtyContext'
import {
  BuildingOfficeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const useMenuList = () => {
  const navigate = useNavigate()
  const { isDirty } = useDirty()
  const { data } = useGetUserProfile()

  const isActive = (pathname: string) =>
    location.pathname === pathname ||
    (pathname === '/' && location.pathname.startsWith('/listings'))

  const handleNavigation = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault()
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Do you really want to leave?',
      )
      if (!confirmLeave) {
        return
      }
    }
    navigate(path)
  }

  const handleLogout = async () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Do you really want to leave?',
      )
      if (!confirmLeave) {
        return
      }
    }
    await logout()
    localStorage.clear()
    navigate('/login')
  }

  const phoneNumber = data?.phoneNumber ?? ''
  const menu = [
    { name: 'Kelola Listing', link: '/', icon: BuildingOfficeIcon },
    { name: `Akun (${phoneNumber})`, link: '/user', icon: UserCircleIcon },
    ...(data?.delegatePhone
      ? [{ name: 'Delegasi', link: '/delegate', icon: UserGroupIcon }]
      : []),
    ...(data?.isDelegateEligible
      ? [{ name: 'Principals', link: '/principals', icon: UserGroupIcon }]
      : []),
  ]

  return {
    menu,
    isActive,
    handleLogout,
    handleNavigation,
  }
}

export default useMenuList
