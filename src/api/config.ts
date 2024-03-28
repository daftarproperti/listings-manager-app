import axios from 'axios'

import WebApp from '@twa-dev/sdk'

axios.defaults.baseURL = import.meta.env.VITE_DP_HOME + '/api/tele-app'
axios.defaults.headers.common['X-INIT-DATA'] =
  import.meta.env.VITE_X_INIT_DATA || WebApp.initData
