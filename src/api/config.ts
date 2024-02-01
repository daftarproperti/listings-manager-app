import axios, { AxiosError } from 'axios'

const tele = window.Telegram?.WebApp
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.headers.common['X-INIT-DATA'] =
  import.meta.env.VITE_X_INIT_DATA || tele?.initData

axios.interceptors.response.use(null, (error: AxiosError) => {
  if (error?.code === 'ERR_BAD_REQUEST')
    window.location.href = `/error?message=${JSON.stringify(
      error.response?.data,
    )}`
})
