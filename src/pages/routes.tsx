import Header from 'components/header/Header'
import FooterIcons from 'components/footer/FooterIcons'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import ScrollRestoration from 'components/ScrollRestoration'
import MainLayout from 'components/layout/MainLayout'

import AuthenticationWrapper from './AuthWrapper'
import LoginPage from './auth/login'
import VerifyPage from './auth/verify'
import ImpersonatePage from './auth/impersonate'
import AddPage from './listings/add'
import ListingDetailPage from './listings/detail'
import EditListingPage from './listings/edit'
import CancelListingPage from './listings/cancel'
import ListingFilterPage from './listings/filter'
import ListingListPage from './listings/list'
import EditUserPage from './user'
import SimpleForm from './listings/add/SimpleForm'
import PropertyListPage from './properties/list'
import PropertiesFilterPage from './properties/filter'
import PropertyDetailPage from './properties/detail'
import SavedSearchListPage from './saved-searches/list'
import SavedSearchFormPage from './saved-searches/form'
import NotFoundPage from './NotFoundPage'

const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: (
        <>
          <LoginPage />
        </>
      ),
    },
    {
      path: '/verify',
      element: (
        <>
          <VerifyPage />
        </>
      ),
    },
    {
      path: '/',
      element: (
        <AuthenticationWrapper>
          <ScrollRestoration />
          <Outlet />
        </AuthenticationWrapper>
      ),
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <Header title="Listing Saya" isWithHomeHeaderButton={true} />
              <ListingListPage />
              <FooterIcons />
            </MainLayout>
          ),
        },
        {
          path: '/listings/:id',
          element: (
            <MainLayout>
              <ListingDetailPage />
            </MainLayout>
          ),
        },
        {
          path: '/listings/add',
          element: (
            <MainLayout>
              <Header title="Tambah Listing" />
              <AddPage />
            </MainLayout>
          ),
        },
        {
          path: '/listings/add/simpleform',
          element: (
            <MainLayout>
              <Header title="Tambah Listing Cara Cepat" />
              <SimpleForm />
            </MainLayout>
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
            <MainLayout>
              <Header title="Data Listing" />
              <EditListingPage />
            </MainLayout>
          ),
        },
        {
          path: '/listings/cancel/:id',
          element: (
            <MainLayout>
              <Header title="Pembatalan Listing" />
              <CancelListingPage />
            </MainLayout>
          ),
        },
        {
          path: '/user',
          element: (
            <MainLayout>
              <Header title="Data Pribadi" />
              <EditUserPage />
            </MainLayout>
          ),
        },
        {
          path: '/properties',
          element: (
            <MainLayout>
              <Header title="Daftar Properti" isWithoutBackButton={true} />
              <PropertyListPage />
              <FooterIcons />
            </MainLayout>
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
        {
          path: '/properties/:id',
          element: (
            <MainLayout>
              <Header title="Properti" />
              <PropertyDetailPage />
            </MainLayout>
          ),
        },
        {
          path: '/saved-searches',
          element: (
            <MainLayout>
              <Header title="Permintaan" />
              <SavedSearchListPage />
            </MainLayout>
          ),
        },
        {
          path: '/saved-searches/add',
          element: (
            <MainLayout>
              <Header title="Tambah Permintaan" />
              <SavedSearchFormPage />
            </MainLayout>
          ),
        },
        {
          path: '/saved-searches/edit',
          element: (
            <MainLayout>
              <Header title="Edit Permintaan" />
              <SavedSearchFormPage />
            </MainLayout>
          ),
        },
        {
          path: '/impersonate',
          element: (
            <>
              <ImpersonatePage />
            </>
          ),
        },
        {
          path: '*',
          element: (
            <>
              <Header title="Halaman tidak Ditemukan" />
              <NotFoundPage />
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
