import { useState, useEffect, useCallback } from 'react'

export const useImageHandler = (
  propertyDetails: any,
  triggerAlert: (message: string) => void,
) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])

  useEffect(() => {
    if (propertyDetails && propertyDetails.pictureUrls) {
      setExistingImages(propertyDetails.pictureUrls)
    }
  }, [propertyDetails])

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files) as File[]
    const totalImagesAfterAddingNew =
      existingImages.length + newImageFiles.length + files.length

    if (totalImagesAfterAddingNew > 10) {
      triggerAlert('Jumlah gambar yang bisa ditambahkan maksimal 10 gambar.')
      return
    }

    const fileUrls = files.map((file) => URL.createObjectURL(file))
    setNewImageFiles((prevFiles) => [...prevFiles, ...files])
    setSelectedImages((prevImages) => [...prevImages, ...fileUrls])
  }

  const removeImage = (index: number, isExistingImage: boolean) => {
    if (isExistingImage) {
      setExistingImages((prevImages) =>
        prevImages.filter((_, i) => i !== index),
      )
    } else {
      URL.revokeObjectURL(selectedImages[index])
      setNewImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
      setSelectedImages((prevImages) =>
        prevImages.filter((_, i) => i !== index),
      )
    }
  }

  return {
    selectedImages,
    existingImages,
    newImageFiles,
    handleImageChange,
    removeImage,
  }
}
