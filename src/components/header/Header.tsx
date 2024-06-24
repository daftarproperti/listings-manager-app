import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LogoSVG } from 'assets/icons'
import { IconButton } from '@material-tailwind/react'

import DotsHeaderButton from './DotsHeaderButton'
import ResetHeaderButton from './ResetHeaderButton'
import HomeHeaderButton from './HomeHeaderButton'

type HeaderProps = {
  title?: string
  canEdit?: boolean
  isWithoutBackButton?: boolean
  isWithHomeHeaderButton?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title = 'Judul Halaman',
  canEdit = false,
  isWithoutBackButton = false,
  isWithHomeHeaderButton = false,
}) => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const isFilterPage = location.pathname.includes('/filter')
  const isHomePage = location.pathname === '/' || isWithoutBackButton

  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-300 bg-blue-50 px-4 lg:hidden">
      <div className="flex h-full items-center space-x-2">
        {!isHomePage && (
          <IconButton
            variant="text"
            color="blue-gray"
            className="rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-6" />
          </IconButton>
        )}
        <LogoSVG />
        <h2 className="font-semibold">{title}</h2>
      </div>
      {id && canEdit ? (
        <DotsHeaderButton propertyId={id} />
      ) : isFilterPage ? (
        <ResetHeaderButton />
      ) : isWithHomeHeaderButton ? (
        <HomeHeaderButton />
      ) : null}
    </header>
  )
}

export default Header
