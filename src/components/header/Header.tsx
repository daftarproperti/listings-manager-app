import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LogoSVG } from 'assets/icons'

import DotsHeaderButton from './DotsHeaderButton'
import ResetHeaderButton from './ResetHeaderButton'

type HeaderProps = {
  title?: string
  canEdit?: boolean
  isWithoutBackButton?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title = 'Judul Halaman',
  canEdit = false,
  isWithoutBackButton = false,
}) => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const isFilterPage = location.pathname.includes('/filter')
  const isHomePage = location.pathname === '/' || isWithoutBackButton

  return (
    <header className="fixed top-0 z-10 flex h-16 w-full max-w-lg items-center justify-between border-b border-slate-300 bg-primary-50 px-4">
      <div className="flex h-full items-center space-x-3">
        {!isHomePage && (
          <ArrowLeftIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        )}
        <LogoSVG />
        <h2 className="font-semibold">{title}</h2>
      </div>
      {id && canEdit ? (
        <DotsHeaderButton propertyId={id} />
      ) : isFilterPage ? (
        <ResetHeaderButton />
      ) : null}
    </header>
  )
}

export default Header
