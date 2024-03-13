import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  ListingIconSVG,
  SearchIconSVG,
  AccountIconSVG,
} from '../../assets/icons'

type FooterIconsProps = {
  activeIcon?: boolean
}

const FooterIcons: React.FC<FooterIconsProps> = () => {
  const location = useLocation()
  const isActive = (pathname: string) => location.pathname === pathname
  const getClassName = (isActive: boolean) =>
    isActive ? 'text-blue-500' : 'text-slate-500'

  return (
    <footer className="fixed bottom-0 h-20 w-full max-w-lg border-t border-slate-300 bg-white py-1">
      <div className="flex w-full justify-between">
        <Link
          to="/"
          className={`inline-block w-1/3 justify-center p-2 text-center ${getClassName(
            isActive('/'),
          )}`}
        >
          <ListingIconSVG className="inline-block" />
          <span className="block pt-2 text-xs">Listing Saya</span>
        </Link>
        <Link
          to="/properties"
          className={`inline-block w-1/3 justify-center p-2 text-center ${getClassName(
            isActive('/properties'),
          )}`}
        >
          <SearchIconSVG className="inline-block" />
          <span className="block pt-2 text-xs">Cari</span>
        </Link>
        <Link
          to="/user"
          className={`inline-block w-1/3 justify-center p-2 text-center ${getClassName(
            isActive('/user'),
          )}`}
        >
          <AccountIconSVG className="inline-block" />
          <span className="block pt-2 text-xs">Akun</span>
        </Link>
      </div>
    </footer>
  )
}

export default FooterIcons
