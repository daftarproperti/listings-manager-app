import { Button } from '@material-tailwind/react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetHeaderButton = () => {
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()

  return (
    <Button
      size="sm"
      color="blue"
      variant="text"
      className="text-sm font-normal capitalize"
      onClick={() => {
        setSearchParams({}, { replace: true })
        navigate(-1)
      }}
    >
      Reset
    </Button>
  )
}

export default ResetHeaderButton
