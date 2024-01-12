import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import routes from './routes'

const queryClient = new QueryClient()

const App = () => (
  <main className="mx-auto min-h-screen max-w-lg bg-white font-inter text-gray-950 shadow-xl">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </main>
)

export default App
