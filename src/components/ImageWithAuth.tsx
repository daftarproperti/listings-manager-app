import { useEffect, useState } from 'react'
import axios from 'axios'
import useImageOrientation from '../utils/useImageOrientation'

interface ImageWithAuthProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  link: string
  useOrientation?: boolean
  noWrapper?: boolean
  noRounded?: boolean
}
const ImageWithAuth: React.FC<ImageWithAuthProps> = ({
  link,
  useOrientation,
  noWrapper,
  noRounded,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isImageError, setIsImageError] = useState(false)
  const orientation = useOrientation
    ? useImageOrientation(imageSrc || 'object-cover')
    : ''

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

  const imageContent = (
    <img
      {...props}
      loading="lazy"
      className={`h-full max-h-46 w-full  ${
        !noRounded ? 'rounded-tl-lg' : ''
      } object-cover object-center ${orientation}`}
      src={imageSrc ?? undefined}
      onError={() => setIsImageError(true)}
      alt={props.alt}
    />
  )

  return noWrapper ? (
    imageSrc && !isImageError ? (
      imageContent
    ) : (
      <div
        className={`inset-0 flex h-16 items-center justify-center ${
          !noRounded ? 'rounded-tl-lg' : ''
        } bg-slate-300`}
      >
        <p className="text-xs text-slate-500">Image Loading</p>
      </div>
    )
  ) : (
    <div className="relative flex w-1/3 flex-col overflow-hidden">
      {imageSrc && !isImageError ? (
        imageContent
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            !noRounded ? 'rounded-tl-lg' : ''
          } bg-slate-300`}
        >
          <p className="text-xs text-slate-500">Image not found</p>
        </div>
      )}
    </div>
  )
}

export default ImageWithAuth
