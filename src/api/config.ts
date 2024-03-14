import axios from 'axios'

const tele = window.Telegram?.WebApp
axios.defaults.baseURL = import.meta.env.VITE_DP_HOME + '/api/tele-app'
axios.defaults.headers.common['X-INIT-DATA'] =
  import.meta.env.VITE_X_INIT_DATA || tele?.initData
