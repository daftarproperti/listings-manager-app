import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({ title = 'Judul Halaman' }) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className="flex h-14 w-full flex-row items-center space-x-3 bg-primary-50 px-4">
      {location.pathname !== '/' && (
        <ArrowLeftIcon
          className="h-4 w-4 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      )}
      <h2 className="font-semibold">{title}</h2>
    </header>
  )
}

export default Header
