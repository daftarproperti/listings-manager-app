import { checkAuth } from 'api/queries'
import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingPage from './Loading'
import TelegramAuthPage from './telegram-auth'

const AuthenticationWrapper = ({ children }: { children: ReactNode }) => {
  const xInitData = localStorage.getItem('x-init-data')
  const [isAuth, setIsAuth] = useState<boolean | undefined>(
    xInitData ? true : undefined,
  )
  const navigate = useNavigate()

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
    if (isAuth === false) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  if (import.meta.env.VITE_ENV === 'production') {
    return (
      <>
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
          <h1 className="m-5 text-xl font-bold">Segera Hadir | Juni 2024</h1>
          <h2 className="text-lg font-bold">
            Properti Terdaftar: 3000+ di 100+ kota
          </h2>
        </main>
      </>
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
