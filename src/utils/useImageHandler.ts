import { useState, useEffect } from 'react'

import { validateImageFiles } from './validateImageFiles'

export const useImageHandler = (
  propertyDetails: { pictureUrls?: string[] } | undefined,
  triggerAlert: (message: string) => void,
) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])
  const [newlyAddedImages, setNewlyAddedImages] =
    useState<{ file: File; url: string }[]>()

  useEffect(() => {
    if (propertyDetails?.pictureUrls) {
      setExistingImages(propertyDetails.pictureUrls)
    }
  }, [propertyDetails?.pictureUrls])

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
      const combinedFileAndUrls = fileList.map((file, index) => ({
        file,
        url: fileUrls[index],
      }))

      setNewlyAddedImages(combinedFileAndUrls)
      setNewImageFiles((prevFiles) => [...prevFiles, ...fileList])
      setSelectedImages((prevImages) => [...prevImages, ...fileUrls])
    }
  }

  const removeImage = (url: string, isExistingImage: boolean) => {
    if (isExistingImage) {
      setExistingImages((prevImages) =>
        prevImages.filter((existingImage) => existingImage !== url),
      )
    } else {
      const index = selectedImages.findIndex((image) => image === url)
      URL.revokeObjectURL(selectedImages[index])
      setNewlyAddedImages(undefined)
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
    newlyAddedImages,
    handleImageChange,
    removeImage,
  }
}
