import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { type ReactNode } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LogoSVG } from 'assets/icons'
import { IconButton, Typography } from '@material-tailwind/react'
import { useDirty } from 'contexts/DirtyContext'

import DotsHeaderButton from './DotsHeaderButton'
import ResetHeaderButton from './ResetHeaderButton'
import HomeHeaderButton from './HomeHeaderButton'

type HeaderProps = {
  title?: ReactNode
  canEdit?: boolean
  multipleUnit?: boolean
  closings?: number
  isWithoutBackButton?: boolean
  isWithHomeHeaderButton?: boolean
  isApproved?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title = 'Judul Halaman',
  canEdit = false,
  multipleUnit = false,
  closings,
  isWithoutBackButton = false,
  isWithHomeHeaderButton = false,
  isApproved = false,
}) => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { isDirty } = useDirty()

  const isFilterPage = location.pathname.includes('/filter')
  const isHomePage = location.pathname === '/' || isWithoutBackButton

  const handleBackNavigation = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Do you really want to leave?',
      )
      if (confirmLeave) {
        navigate(-1)
      }
    } else {
      navigate(-1)
    }
  }

  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-300 bg-blue-50 px-4 lg:hidden">
      <div className="flex h-full items-center space-x-2">
        {!isHomePage && (
          <IconButton
            variant="text"
            color="blue-gray"
            className="rounded-full"
            onClick={handleBackNavigation}
          >
            <ArrowLeftIcon className="w-6" />
          </IconButton>
        )}
        <LogoSVG />
        {typeof title === 'string' ? (
          <Typography variant="h6">{title}</Typography>
        ) : (
          title
        )}
      </div>
      {id && canEdit ? (
        <DotsHeaderButton
          propertyId={id}
          multipleUnit={multipleUnit}
          closings={closings}
          isApproved={isApproved}
        />
      ) : isFilterPage ? (
        <ResetHeaderButton />
      ) : isWithHomeHeaderButton ? (
        <HomeHeaderButton />
      ) : null}
    </header>
  )
}

export default Header
