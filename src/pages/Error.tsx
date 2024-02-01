import { Link, useSearchParams } from 'react-router-dom'
import { safeJSONParse } from 'utils'

const ErrorPage = () => {
  const [searchParams] = useSearchParams()
  const errorJSON = safeJSONParse(searchParams.get('message') ?? '')
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-xl font-bold">
        {errorJSON?.error || 'Authentication Error'}
      </h1>
      <Link to="/">
        <div className="mt-8 flex items-center gap-2 rounded-lg border bg-primary-500 px-4 py-2 text-white shadow">
          <p>Reload</p>
          <svg fill="#FFFFFF" width="20px" height="20px" viewBox="0 0 32 32">
            <path d="M15.977 0c-7.994 0-14.498 6.504-14.498 14.498 0 7.514 5.79 13.798 13.236 14.44l-2.87 1.455c-0.354 0.195-0.566 0.632-0.355 0.977l0.101 0.262c0.211 0.346 0.668 0.468 1.021 0.274l4.791-2.453c0.006-0.004 0.012-0.003 0.019-0.007l0.322-0.176c0.177-0.098 0.295-0.257 0.342-0.434 0.049-0.177 0.027-0.375-0.079-0.547l-0.191-0.313c-0.003-0.006-0.009-0.010-0.012-0.015l-2.959-4.624c-0.21-0.346-0.666-0.468-1.021-0.274l-0.232 0.162c-0.354 0.194-0.378 0.694-0.168 1.038l1.746 2.709c-0.009-0-0.018-0.004-0.027-0.005-6.54-0.429-11.662-5.907-11.662-12.47 0-6.891 5.607-12.498 12.498-12.498 6.892 0 12.53 5.606 12.53 12.498 0 3.968-1.823 7.613-5 9.999-0.442 0.332-0.53 0.959-0.199 1.401 0.332 0.442 0.959 0.531 1.401 0.199 3.686-2.768 5.799-6.996 5.799-11.598-0-7.994-6.536-14.498-14.53-14.498z" />
          </svg>
        </div>
      </Link>
    </main>
  )
}

export default ErrorPage