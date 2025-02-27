import Header from 'components/header/Header'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import ScrollRestoration from 'components/ScrollRestoration'
import MainLayout from 'components/layout/MainLayout'

import AuthenticationWrapper from './AuthWrapper'
import EnableOptionalAgreement from './EnableOptionalAgreement'
import LoginPage from './auth/login'
import VerifyPage from './auth/verify'
import VerifyTotpPage from './auth/verifyTotp'
import ImpersonatePage from './auth/impersonate'
import PrincipalsPage from './auth/principals'
import AddPage from './listings/add'
import ListingDetailPage from './listings/detail'
import EditListingPage from './listings/edit'
import CancelListingPage from './listings/cancel'
import ClosingListingPage from './listings/closing'
import ClosingDetailListingPage from './listings/closing/detail'
import ListingFilterPage from './listings/filter'
import ListingListPage from './listings/list'
import EditUserPage from './user'
import SimpleForm from './listings/add/SimpleForm'
import NotFoundPage from './NotFoundPage'
import DelegatePage from './auth/delegate'
import DelegateAssignPage from './auth/delegateAssign'
import Title from './listings/list/Title'
import AgreementPage from './AgreementPage'

const router = createBrowserRouter(
  [
    {
      path: '/enable-optional-agreement',
      element: (
        <>
          <EnableOptionalAgreement />
        </>
      ),
    },
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
      path: '/verify-totp',
      element: (
        <>
          <VerifyTotpPage />
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
              <Header
                title={<Title />}
                isWithoutBackButton
                isWithHomeHeaderButton
              />
              <ListingListPage />
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
          path: '/listings/:id/edit',
          element: (
            <MainLayout>
              <Header title="Data Listing" />
              <EditListingPage />
            </MainLayout>
          ),
        },
        {
          path: '/listings/:id/cancel',
          element: (
            <MainLayout>
              <Header title="Pembatalan Listing" />
              <CancelListingPage />
            </MainLayout>
          ),
        },
        {
          path: '/listings/:id/closing',
          element: (
            <MainLayout>
              <Header title="Closing Listing" />
              <ClosingListingPage />
            </MainLayout>
          ),
        },
        {
          path: '/listings/:id/closing/:closingId/detail',
          element: (
            <MainLayout>
              <Header title="Closing Detail" />
              <ClosingDetailListingPage />
            </MainLayout>
          ),
        },
        {
          path: '/user',
          element: (
            <MainLayout>
              <Header
                title="Informasi Profil"
                isWithoutBackButton
                isWithHomeHeaderButton
              />
              <EditUserPage />
            </MainLayout>
          ),
        },
        {
          path: '/delegate',
          element: (
            <MainLayout>
              <Header
                title="Delegasi"
                isWithoutBackButton
                isWithHomeHeaderButton
              />
              <DelegatePage />
            </MainLayout>
          ),
        },
        {
          path: '/delegate/assign/:phoneNumber',
          element: (
            <MainLayout>
              <Header title="Delegasi Akses Kelola Listing" />
              <DelegateAssignPage />
            </MainLayout>
          ),
        },
        {
          path: '/principals',
          element: (
            <MainLayout>
              <Header title="Principals" />
              <PrincipalsPage />
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
        {
          path: '/persetujuan',
          element: (
            <MainLayout>
              <Header title="Persetujuan" />
              <AgreementPage />
            </MainLayout>
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
