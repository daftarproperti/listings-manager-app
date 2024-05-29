import { useState, useEffect } from 'react'

import { validateImageFiles } from './validateImageFiles'

export const useImageHandler = (
  propertyDetails: { pictureUrls?: string[] } | undefined,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const totalImagesAfterAddingNew =
      existingImages.length + newImageFiles.length + (files?.length ?? 0)

    if (totalImagesAfterAddingNew > 10) {
      triggerAlert('Jumlah gambar yang bisa ditambahkan maksimal 10 gambar.')
      return
    }

    if (files) {
      const fileList = Array.from(validateImageFiles(files)) as File[]
      const fileUrls = fileList.map((file) => URL.createObjectURL(file))

      setNewImageFiles((prevFiles) => [...prevFiles, ...fileList])
      setSelectedImages((prevImages) => [...prevImages, ...fileUrls])
    }
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
