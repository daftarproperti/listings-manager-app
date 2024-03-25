import { type PropsWithChildren } from 'react'
import { toast } from 'react-toastify'

const ShareListingsButton = ({
  url,
  title,
  children,
  className,
}: {
  url: string
  title?: string
  className?: string
} & PropsWithChildren) => {
  const handleShare = async () => {
    // Try navigator.share first, if available and has permission.
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
        // The user may just choose "copy link", so don't show "shared successfully" toast here
        // to not mislead the user.
        return
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          // Not actually an error, but the user just cancelled it, so just return and don't show
          // any toast.
          return
        }
        if (!(error instanceof Error && error.name === 'NotAllowedError')) {
          toast(`Error sharing content ${error}`, { type: 'error' })
          return
        }
      }
    }

    // navigator.share is either not available or does not have permission, do clippboard.
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast(`Successfully copied to clipboard`, { type: 'info' })
      })
      .catch(() => {
        toast('Could not copy text', { type: 'error' })
      })
  }

  return (
    <div className={className} onClick={handleShare}>
      {children}
    </div>
  )
}

export default ShareListingsButton
