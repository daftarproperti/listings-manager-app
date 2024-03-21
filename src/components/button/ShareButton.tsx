import { type ReactNode } from 'react'
import { toast } from 'react-toastify'

interface ShareButtonProps {
  url: string
  title?: string
  icon?: ReactNode
  buttonName?: string
  className?: string
}
const ShareListingsButton = ({
  url,
  title,
  icon,
  buttonName,
  className,
}: ShareButtonProps) => {
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
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast(`Successfully copied to clipboard`, { type: 'info' })
        })
        .catch((err) => {
          toast('Could not copy text: ', err)
        })
    }
  }

  return (
    <>
      <button
        className={`h-12 cursor-pointer p-3 text-sm text-blue-500 ${className}`}
        onClick={handleShare}
      >
        {icon}
        {buttonName}
      </button>
    </>
  )
}

export default ShareListingsButton
