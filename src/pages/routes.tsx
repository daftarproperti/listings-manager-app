import Header from 'components/header/Header'
import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './Error'
import AddPage from './add'
import DetailPage from './detail'
import EditPropertyPage from './edit'
import FilterPage from './filter'
import ListPage from './list'

const router = createBrowserRouter([
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
    path: '/error',
    element: <ErrorPage />,
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
])

export default router
