import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.headers.common['X-INIT-DATA'] = import.meta.env.VITE_X_INIT_DATA
