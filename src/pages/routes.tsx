import { createBrowserRouter } from 'react-router-dom'

import Header from 'components/Header'
import ListPage from './list'
import DetailPage from './detail'
import ErrorPage from './Error'
import FilterPage from './filter'

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
        <Header title="Rincian Listing" />
        <DetailPage />
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
])

export default router
