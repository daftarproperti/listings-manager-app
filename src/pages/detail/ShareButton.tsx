import React from 'react'

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
        console.log('Content shared successfully')
      } catch (error) {
        console.error('Error sharing content', error)
      }
    } else {
      console.log('Web Share is not supported in this browser.')
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
