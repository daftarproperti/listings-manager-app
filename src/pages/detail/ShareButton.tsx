import React from 'react'
import { toast } from 'react-toastify'

interface ShareButtonProps {
  url: string
  title?: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
        toast('Content shared successfully', { type: 'success' })
      } catch (error) {
        toast(`Error sharing content ${error}`, { type: 'error' })
      }
    } else {
      toast('Web Share is not supported in this browser.', { type: 'error' })
      // Implement fallback sharing functionality here
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-block w-1/2 grow items-stretch justify-center whitespace-nowrap rounded-lg bg-blue-500 px-3 py-2.5 text-center text-sm leading-5 text-white"
    >
      Bagikan
    </button>
  )
}

export default ShareButton
