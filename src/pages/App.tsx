import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'index.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@material-tailwind/react'
import { BackButton } from '@twa-dev/sdk/react'

import { DirtyProvider } from '../contexts/DirtyContext'
import routes from './routes'

const queryClient = new QueryClient()

const App = () => (
  <>
    <BackButton />
    <main className="mx-auto h-auto min-h-screen w-full bg-white font-inter text-slate-800">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <DirtyProvider>
            <RouterProvider router={routes} />
            <ToastContainer position="top-center" />
            <ToastContainer
              containerId="addListing"
              position="top-center"
              className={'w-full'}
            />
          </DirtyProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </main>
  </>
)

export default App
