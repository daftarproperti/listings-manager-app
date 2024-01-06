import CryptoJS from 'crypto-js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Header from 'components/Header'

import List from 'components/screen/List'
import Detail from 'components/screen/Detail'

const tele = window.Telegram?.WebApp
const verifyTelegramWebAppData = () => {
  if (tele?.initData) {
    const initData = new URLSearchParams(tele.initData)
    const hash = initData.get('hash')
    const dataToCheck: string[] = []

    initData.sort()
    initData.forEach(
      (val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`),
    )

    const secret = CryptoJS.HmacSHA256(
      import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
      'WebAppData',
    )
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(
      CryptoJS.enc.Hex,
    )

    return _hash === hash
  }
  return false
}

const isOpenedFromTelegram =
  verifyTelegramWebAppData() || import.meta.env.VITE_ENV === 'development'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header title="Koleksi Saya" />
        <List />,
      </>
    ),
  },
  {
    path: '/detail/:id',
    element: (
      <>
        <Header title="Rincian Listing" />
        <Detail />,
      </>
    ),
  },
])

function App() {
  return isOpenedFromTelegram ? (
    <main className="mx-auto min-h-screen max-w-md bg-white text-gray-950 shadow-xl">
      <RouterProvider router={router} />
    </main>
  ) : (
    <main className="flex min-h-screen w-full items-center justify-center">
      <h1>Authentication Error</h1>
    </main>
  )
}

export default App
