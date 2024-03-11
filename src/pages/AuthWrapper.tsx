import { checkAuth } from 'api/queries'
import { type ReactNode, useEffect, useState } from 'react'

import LoadingPage from './Loading'
import TelegramAuthPage from './telegram-auth'

const AuthenticationWrapper = ({ children }: { children: ReactNode }) => {
  const xInitData = localStorage.getItem('x-init-data')
  const [isAuth, setIsAuth] = useState<boolean | undefined>(
    xInitData ? true : undefined,
  )

  // Initialize authentication state just once
  useEffect(() => {
    const initAuth = async () => {
      if (isAuth !== undefined) {
        return
      }
      setIsAuth(await checkAuth())
    }
    initAuth()
  }, [])

  return isAuth === undefined ? (
    <LoadingPage message="Authenticating..." />
  ) : isAuth ? (
    children
  ) : (
    <TelegramAuthPage message="Authentication Failure" />
  )
}

export default AuthenticationWrapper
