import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'index.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@material-tailwind/react'

import routes from './routes'

const queryClient = new QueryClient()

const App = () => (
  <main className="mx-auto h-auto min-h-screen max-w-lg bg-white font-inter text-gray-950">
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ToastContainer position="top-center" />
      </QueryClientProvider>
    </ThemeProvider>
  </main>
)

export default App
