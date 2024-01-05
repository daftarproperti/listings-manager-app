import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header({ title = 'Judul Halaman' }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className="w-full h-14 bg-primary-50 flex flex-row items-center px-4 space-x-3">
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
