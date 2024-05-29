import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingPage from './Loading'

const AuthenticationWrapper = ({ children }: { children: ReactNode }) => {
  const accessToken = sessionStorage.getItem('accessToken')
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

  if (isAuth === undefined) {
    return <LoadingPage message="Authenticating . . ." />
  }

  return isAuth ? children : null
}

export default AuthenticationWrapper
