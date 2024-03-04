import { checkAuth } from 'api/queries'
import axios from 'axios'
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

  useEffect(() => {
    if (xInitData) axios.defaults.headers.common['X-INIT-DATA'] = xInitData
  }, [xInitData])

  return isAuth === undefined ? (
    <LoadingPage message="Authenticating..." />
  ) : isAuth ? (
    children
  ) : (
    <TelegramAuthPage message="Authentication Failure" />
  )
}

export default AuthenticationWrapper
