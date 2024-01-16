import { useEffect, useState } from 'react'
import axios from 'axios'

const ImageWithAuth = ({
  link,
  ...props
}: { link: string } & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isImageError, setIsImageError] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(link, {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          headers: new Headers(axios.defaults.headers.common),
        })

        if (response.ok) {
          const blob = await response.blob()
          const reader = new FileReader()
          reader.onload = () => {
            setImageSrc(reader.result as string)
          }
          reader.readAsDataURL(blob)
        } else {
          console.error('Failed to fetch image:', response.status)
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [link])

  return (
    <div className="relative flex w-1/3 flex-col overflow-hidden p-2">
      {imageSrc && !isImageError ? (
        <img
          {...props}
          loading="lazy"
          className="absolute inset-0 h-full w-full rounded-tl-lg object-cover object-center"
          src={imageSrc}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center rounded-tl-lg bg-slate-300">
          <p className="text-xs text-slate-500">Image not found</p>
        </div>
      )}
    </div>
  )
}

export default ImageWithAuth
