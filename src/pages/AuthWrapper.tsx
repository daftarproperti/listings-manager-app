import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingPage from './Loading'

const AuthenticationWrapper = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem('accessToken')
  const [isAuth, setIsAuth] = useState<boolean | undefined>(
    accessToken ? true : undefined,
  )
  const navigate = useNavigate()

  // Initialize authentication state just once
  useEffect(() => {
    const initAuth = async () => {
      if (isAuth !== undefined) {
        return
      }
      setIsAuth(!!accessToken)
    }
    initAuth()
  }, [])

  useEffect(() => {
    if (isAuth === false) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  if (isAuth === undefined) {
    return <LoadingPage message="Authenticating . . ." />
  }

  return isAuth ? children : null
}

export default AuthenticationWrapper
