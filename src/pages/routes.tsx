import Header from 'components/header/Header'
import FooterIcons from 'components/footer/FooterIcons'
import { createBrowserRouter, Outlet } from 'react-router-dom'

import AuthenticationWrapper from './AuthWrapper'
import AddPage from './listings/add'
import ListingDetailPage from './listings/detail'
import EditListingPage from './listings/edit'
import ListingFilterPage from './listings/filter'
import ListingListPage from './listings/list'
import EditUserPage from './user'
import SimpleForm from './listings/add/SimpleForm'
import PropertyListPage from './properties/list'
import PropertiesFilterPage from './properties/filter'

const router = createBrowserRouter(
  [
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
              <Header title="Listing Saya" />
              <ListingListPage />
              <FooterIcons />
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
              <Header title="Filter Listing" />
              <ListingFilterPage />
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
        {
          path: '/properties',
          element: (
            <>
              <Header title="Daftar Properti" isWithoutBackButton={true} />
              <PropertyListPage />
              <FooterIcons />
            </>
          ),
        },
        {
          path: '/properties/filter',
          element: (
            <>
              <Header title="Filter Properti" />
              <PropertiesFilterPage />
            </>
          ),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH || '/',
  },
)

export default router
