import App from 'pages/App'
import { createRoot } from 'react-dom/client'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import 'tailwindcss/tailwind.css'
import './api/config'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

serviceWorkerRegistration.register()

root.render(<App />)
