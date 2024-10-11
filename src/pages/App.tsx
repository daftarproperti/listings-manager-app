import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'index.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@material-tailwind/react'

import { DirtyProvider } from '../contexts/DirtyContext'
import routes from './routes'

const queryClient = new QueryClient()

const theme = {
  input: {
    styles: {
      base: {
        container: {
          minWidth: 'min-w-[100px]',
        },
      },
      variants: {
        outlined: {
          base: {
            input: {
              floated: {
                borderWidth: 'border focus:border-1',
              },
            },
            label: {
              before: {
                floated: {
                  bt: 'before:border-t peer-focus:before:border-t',
                  bl: 'before:border-l peer-focus:before:border-l',
                },
              },
              after: {
                floated: {
                  bt: 'after:border-t peer-focus:after:border-t',
                  br: 'after:border-r peer-focus:after:border-r',
                },
              },
            },
          },
        },
      },
    },
  },
  textarea: {
    styles: {
      variants: {
        outlined: {
          base: {
            textarea: {
              floated: {
                borderWidth: 'border focus:border-1',
              },
            },
          },
        },
      },
    },
  },
  select: {
    styles: {
      variants: {
        outlined: {
          states: {
            open: {
              select: {
                borderWidth: 'border',
              },
            },
          },
        },
      },
    },
  },
}

const App = () => (
  <>
    <main className="mx-auto h-auto min-h-screen w-full overflow-y-scroll bg-white font-inter text-slate-800 scrollbar-thin">
      <ThemeProvider value={theme}>
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
