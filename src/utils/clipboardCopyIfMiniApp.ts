import { toast } from 'react-toastify'

export const clipboardCopyIfMiniApp = (
  text: string | undefined,
  e: React.MouseEvent,
) => {
  if (typeof text === 'string') {
    e.preventDefault()
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast(`Successfully copied text to clipboard: ${text}`, {
          type: 'info',
        })
      })
      .catch(() => {
        toast('Could not copy text', { type: 'error' })
      })
  }
}
