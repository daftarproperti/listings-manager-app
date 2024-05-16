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

  if (import.meta.env.VITE_ENV === 'production') {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="text-xl font-bold m-5">Segera Hadir | Juni 2024</h1>
        <h2 className="text-l font-bold">Properti Terdaftar: 3000+ di 100+ kota</h2>
      </main>
    )
  }

  return isAuth === undefined ? (
    <LoadingPage message="Authenticating..." />
  ) : isAuth ? (
    children
  ) : (
    <TelegramAuthPage message="Log in dengan Telegram" />
  )
}

export default AuthenticationWrapper
