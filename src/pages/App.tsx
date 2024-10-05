import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'index.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@material-tailwind/react'

import { DirtyProvider } from '../contexts/DirtyContext'
import routes from './routes'

const queryClient = new QueryClient()

const App = () => (
  <>
    <main className="mx-auto h-auto min-h-screen w-full overflow-y-scroll bg-white font-inter text-slate-800 scrollbar-thin">
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
