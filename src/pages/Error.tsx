import { useGetPropertyList } from 'api/queries'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  const { isSuccess } = useGetPropertyList()

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true })
    }
  }, [isSuccess, navigate])

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <h1>Authentication Error</h1>
    </main>
  )
}

export default ErrorPage
