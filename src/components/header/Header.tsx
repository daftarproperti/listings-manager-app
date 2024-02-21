import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import DotsHeaderButton from './DotsHeaderButton'
import CogHeaderButton from './CogHeaderButton'

type HeaderProps = {
  title?: string
  canEdit?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title = 'Judul Halaman',
  canEdit = false,
}) => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className="relative flex h-14 w-full items-center justify-between border-b border-slate-300 bg-primary-50 px-4">
      <div className="flex h-full items-center space-x-3">
        {location.pathname !== '/' && (
          <ArrowLeftIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        )}
        <h2 className="font-semibold">{title}</h2>
      </div>
      {id !== undefined && canEdit && <DotsHeaderButton propertyId={id} />}
      {id === undefined && <CogHeaderButton />}
    </header>
  )
}

export default Header
