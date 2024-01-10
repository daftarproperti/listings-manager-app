import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Header from 'components/Header'
import DetailPage from 'pages/detail'
import List from 'pages/list'
import { verifyTelegramWebAppData } from 'utils'

const isOpenedFromTelegram =
  verifyTelegramWebAppData() || import.meta.env.VITE_ENV === 'development'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header title="Koleksi Saya" />
        <List />
      </>
    ),
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
])

const queryClient = new QueryClient()

function App() {
  return isOpenedFromTelegram ? (
    <main className="mx-auto min-h-screen max-w-md bg-white font-inter text-gray-950 shadow-xl">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </main>
  ) : (
    <main className="flex min-h-screen w-full items-center justify-center">
      <h1>Authentication Error</h1>
    </main>
  )
}

export default App
