import Header from 'components/header/Header'
import { createBrowserRouter, Outlet } from 'react-router-dom'

import AuthenticationWrapper from './AuthWrapper'
import AddPage from './listings/add'
import ListingDetailPage from './listings/detail'
import EditListingPage from './listings/edit'
import FilterPage from './listings/filter'
import ListingListPage from './listings/list'
import EditUserPage from './user'
import SimpleForm from './listings/add/SimpleForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthenticationWrapper>
        <Outlet />
      </AuthenticationWrapper>
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
            <Header title="Tambah Listing Lengkap" />
            <AddPage />
          </>
        ),
      },
      {
        path: '/listings/add/simpleform',
        element: (
          <>
            <Header title="Tambah Listing Cara Cepat" />
            <SimpleForm />
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
      {
        path: '/user',
        element: (
          <>
            <Header title="Data Pribadi" />
            <EditUserPage />
          </>
        ),
      },
    ],
  },
])

export default router
