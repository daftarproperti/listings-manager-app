import Header from 'components/header/Header'
import { createBrowserRouter, LoaderFunction, Outlet } from 'react-router-dom'
import { useState, useEffect, type ReactNode } from 'react'
import { checkAuth } from 'api/queries'

import ErrorPage from './Error'
import LoadingPage from './Loading'
import AddPage from './listings/add'
import ListingDetailPage from './listings/detail'
import EditListingPage from './listings/edit'
import FilterPage from './listings/filter'
import ListingListPage from './listings/list'
import EditUserPage from './user'

const AuthenticatedPage = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined)

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
    <ErrorPage message="Authentication Failure" />
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
            <ListingListPage />
          </>
        ),
      },
      {
        path: '/listings/:id',
        element: (
          <>
            <ListingDetailPage />
          </>
        ),
      },
      {
        path: '/listings/add',
        element: (
          <>
            <Header title="Tambah Listing Baru" />
            <AddPage />
          </>
        ),
      },
      {
        path: '/listings/filter',
        element: (
          <>
            <Header title="Filter" />
            <FilterPage />
          </>
        ),
      },
      {
        path: '/listings/edit/:id',
        element: (
          <>
            <Header title="Data Listing" />
            <EditListingPage />
          </>
        ),
      },
    ],
  },
  {
    path: '/user',
    element: (
      <>
        <Header title="Data Pribadi" />
        <EditUserPage />
      </>
    ),
  },
])

export default router
