import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// A hidden component to set the localStorage flag that enables optional agreement.
function EnableOptionalAgreement() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('optional-agreement', 'true')
    navigate('/')
  }, [navigate])

  return null
}

export default EnableOptionalAgreement
