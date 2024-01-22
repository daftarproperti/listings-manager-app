import React from 'react'

const useImageOrientation = (src: string) => {
  const [orientation, setOrientation] = React.useState('object-cover')

  React.useEffect(() => {
    const img = new Image()
    img.onload = () => {
      if (img.naturalWidth > img.naturalHeight) {
        setOrientation('object-cover') // Landscape
      } else {
        setOrientation('object-contain') // Portrait
      }
    }
    img.src = src
  }, [src])

  return orientation
}

export default useImageOrientation
