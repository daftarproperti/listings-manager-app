import axios from 'axios'
import TelegramLoginButton from 'components/button/TelegramLoginButton'
import { transformObjectToQueryString } from 'utils'

const TelegramAuthPage = ({ message }: { message: string }) => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-2">
      <h1 className="text-xl font-bold">{message}</h1>
      <h2 className="font-semibold">Please log in to continue</h2>
      <TelegramLoginButton
        botName={import.meta.env.VITE_TELEGRAM_BOT_NAME}
        dataOnauth={(user) => {
          const queryString = transformObjectToQueryString(user)
          localStorage.setItem('x-init-data', queryString)
          axios.defaults.headers.common['X-INIT-DATA'] = queryString
          window.location.reload()
        }}
        requestAccess
        className="pt-8"
      />
    </main>
  )
}

export default TelegramAuthPage
