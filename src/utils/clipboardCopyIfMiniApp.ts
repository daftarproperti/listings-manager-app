import { toast } from 'react-toastify'

export const clipboardCopyIfMiniApp = (
  text: string | undefined,
  e: React.MouseEvent,
) => {
  if (window.Telegram?.WebApp?.initData && typeof text === 'string') {
    e.preventDefault()
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast(`Successfully copied text to clipboard: ${text}`, {
          type: 'info',
        })
      })
      .catch(() => {
        toast('Could not text', { type: 'error' })
      })
  }
}
