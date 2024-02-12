import Header from 'components/header/Header'
import { createBrowserRouter, LoaderFunction, Outlet } from 'react-router-dom'
import { useState, useEffect, ReactNode } from 'react'

import ErrorPage from './Error'
import LoadingPage from './Loading'
import AddPage from './add'
import DetailPage from './detail'
import EditPropertyPage from './edit'
import FilterPage from './filter'
import ListPage from './list'
import { checkAuth } from 'api/queries'

const AuthenticatedPage = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

  // Initialize authentication state just once
  useEffect(() => {
    const initAuth = async () => {
      if (isAuth !== undefined) {
        return
      }
      setIsAuth(await checkAuth());
    }
    initAuth()
  }, [])

  return (
    isAuth === undefined ? (
      <LoadingPage message="Authenticating..." />
    ) : isAuth ? (
      children
    ) : (
      <ErrorPage message="Authentication Failure" />
    )
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthenticatedPage>
        <Outlet />
      </AuthenticatedPage>
    ),
    children: [
      {
        path: '/',
        element: (
          <>
            <Header title="Koleksi Saya" />
            <ListPage />
          </>
        ),
      },
      {
        path: '/detail/:id',
        element: (
          <>
            <DetailPage />
          </>
        ),
      },
      {
        path: '/add',
        element: (
          <>
            <Header title="Tambah Listing Baru" />
            <AddPage />
          </>
        ),
      },
      {
        path: '/filter',
        element: (
          <>
            <Header title="Filter" />
            <FilterPage />
          </>
        ),
      },
      {
        path: '/edit/:id',
        element: (
          <>
            <Header title="Data Properti" />
            <EditPropertyPage />
          </>
        ),
      },
    ],
  },
])

export default router
