import App from 'pages/App'
import { createRoot } from 'react-dom/client'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import 'tailwindcss/tailwind.css'
import './api/config'
import './reactGA4/config'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

if (import.meta.env.VITE_SERVICE_WORKER) {
  serviceWorkerRegistration.register()
}

root.render(<App />)
