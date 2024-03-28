import { Button } from '@material-tailwind/react'
import { useLocation, useNavigate } from 'react-router-dom'

const redirectPathMap: { [key: string]: string } = {
  '/listings/filter': '/',
  '/properties/filter': '/properties',
}

const ResetHeaderButton = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Button
      size="sm"
      color="blue"
      variant="text"
      className="text-sm font-normal capitalize"
      onClick={() => {
        navigate(redirectPathMap[pathname])
      }}
    >
      Reset
    </Button>
  )
}

export default ResetHeaderButton
