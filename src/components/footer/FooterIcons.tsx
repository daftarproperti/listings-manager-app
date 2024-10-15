import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BuildingOfficeIcon, UserCircleIcon } from '@heroicons/react/24/outline'

type FooterIconsProps = {
  activeIcon?: boolean
}

const FooterIcons: React.FC<FooterIconsProps> = () => {
  const location = useLocation()
  const isActive = (pathname: string) => location.pathname === pathname
  const getClassName = (isActive: boolean) =>
    isActive ? 'text-blue-500' : 'text-slate-500'

  return (
    <footer className="fixed bottom-0 h-20 w-full border-t border-slate-300 bg-white py-1 lg:hidden">
      <div className="flex w-full justify-between">
        <Link
          to="/"
          className={`inline-block w-1/2 justify-center p-2 text-center ${getClassName(
            isActive('/'),
          )}`}
        >
          <BuildingOfficeIcon className="inline-block h-5 w-5" />
          <span className="block pt-2 text-xs">Listing Saya</span>
        </Link>
        <Link
          to="/user"
          className={`inline-block w-1/2 justify-center p-2 text-center ${getClassName(
            isActive('/user'),
          )}`}
        >
          <UserCircleIcon className="inline-block h-5 w-5" />
          <span className="block pt-2 text-xs">Akun</span>
        </Link>
      </div>
    </footer>
  )
}

export default FooterIcons
