import React, { useEffect } from 'react'

const loadImageOrientation = (src: string) => {
  return new Promise<string>((resolve) => {
    const img = new Image()
    img.onload = () => {
      if (img.naturalWidth > img.naturalHeight) {
        resolve('object-cover') // Landscape
      } else {
        resolve('object-contain') // Portrait
      }
    }
    img.src = src
  })
}

const useImageOrientation = (src?: string) => {
  const [orientation, setOrientation] = React.useState('object-cover')

  useEffect(() => {
    if (src !== undefined) {
      loadImageOrientation(src).then((result) => {
        setOrientation(result)
      })
    }
  }, [src])

  return orientation
}

export default useImageOrientation
