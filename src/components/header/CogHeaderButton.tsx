import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const CogHeaderButton = () => {
  const navigate = useNavigate()
  const navigateToUserForm = () => {
    navigate(`/user`)
  }
  return (
    <>
      <>
        <button
          className="h-8 w-7 cursor-pointer"
          onClick={() => navigateToUserForm()}
        >
          <Cog6ToothIcon className="h-6 w-6 text-justify text-slate-500" />
        </button>
      </>
    </>
  )
}

export default CogHeaderButton
