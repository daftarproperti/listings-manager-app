import { type MouseEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { logout, useGetUserProfile } from 'api/queries'
import { useDirty } from 'contexts/DirtyContext'
import { useQueryClient } from '@tanstack/react-query'
import {
  BuildingOfficeIcon,
  ScaleIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const useMenuList = () => {
  const navigate = useNavigate()
  const { isDirty } = useDirty()
  const { data } = useGetUserProfile()
  const queryClient = useQueryClient()

  const routerLocation = useLocation()

  const isActive = (pathname: string) =>
    routerLocation.pathname === pathname ||
    (pathname === '/' && routerLocation.pathname.startsWith('/listings'))

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
    queryClient.invalidateQueries()
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
    ...(import.meta.env.VITE_SHOW_AGREEMENT
      ? [{ name: 'Persetujuan', link: '/persetujuan', icon: ScaleIcon }]
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
