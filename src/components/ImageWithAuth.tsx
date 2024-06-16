import axios from 'axios'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'

import useImageOrientation from '../utils/useImageOrientation'

interface ImageWithAuthProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  link: string
  useOrientation?: boolean
  noWrapper?: boolean
  noRounded?: boolean
  useFrom?: string
}
const ImageWithAuth: React.FC<ImageWithAuthProps> = ({
  link,
  useOrientation,
  noWrapper,
  noRounded,
  useFrom,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isImageError, setIsImageError] = useState(false)
  const orientation = useImageOrientation(
    useOrientation ? imageSrc || 'object-cover' : undefined,
  )

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
          console.error(`Failed to fetch image: ${response.status}`)
        }
      } catch (error) {
        console.error(`Error fetching image:', ${error}`)
      }
    }

    fetchImage()
  }, [link])

  const imageContent = (
    <img
      {...props}
      loading="lazy"
      className={clsx(
        'h-full',
        useFrom === 'swiper'
          ? 'max-h-52 lg:max-h-80'
          : 'max-h-52 w-full object-cover object-center',
        !noRounded && 'rounded-tl-lg',
        orientation,
      )}
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
        className={clsx(
          'inset-0 flex h-16 items-center justify-center bg-slate-300',
          !noRounded && 'rounded-tl-lg',
        )}
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
          className={clsx(
            'absolute inset-0 flex items-center justify-center bg-slate-300',
            !noRounded && 'rounded-tl-lg',
          )}
        >
          <p className="text-xs text-slate-500">Image not found</p>
        </div>
      )}
    </div>
  )
}

export default ImageWithAuth
