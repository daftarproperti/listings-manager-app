import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LogoSVG, ShareIconSVG } from 'assets/icons'
import { useGetUserProfile } from 'api/queries'
import ShareButton from 'components/button/ShareButton'

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
  const dpHome = import.meta.env.VITE_DP_HOME

  const isFilterPage = location.pathname.includes('/filter')
  const isHomePage = location.pathname === '/' || isWithoutBackButton

  const { data: userDetails } = useGetUserProfile()
  const userPublicUrl = `${dpHome}/public/agents/${userDetails?.publicId || ''}`

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
      ) : isHomePage ? (
        <ShareButton
          url={userPublicUrl}
          title={title}
          icon={<ShareIconSVG />}
          className="w-12 text-slate-500"
        />
      ) : null}
    </header>
  )
}

export default Header
