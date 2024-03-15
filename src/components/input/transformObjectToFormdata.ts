import { uploadImages } from 'api/queries'
import { type UpdateListingRequest } from 'api/types'

const transformListingObjectToFormData = async ({
  data,
  formExistingImages,
  formNewImageFiles,
}: {
  data: UpdateListingRequest
  formExistingImages: string[]
  formNewImageFiles: File[]
}): Promise<FormData> => {
  const formData = new FormData()

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data]
    if (key !== 'pictureUrls' && !key.startsWith('contacts')) {
      if (key === 'price' && typeof value === 'string') {
        data[key] = parseFloat(value)
      } else if (
        typeof value === 'string' &&
        (key === 'lotSize' ||
          key === 'buildingSize' ||
          key === 'bedroomCount' ||
          key === 'bathroomCount' ||
          key === 'floorCount')
      ) {
        data[key] = parseInt(value, 10)
      }
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString())
      }
      if (key === 'isPrivate') {
        const valueIsPrivate = data.isPrivate ? 1 : 0
        formData.append('isPrivate', valueIsPrivate.toString())
      }
    }
    if (key.startsWith('contacts')) {
      if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach((contactKey: string) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const contactValue = (value as any)[contactKey]
          if (contactValue !== null && contactValue !== undefined) {
            formData.append(`contacts[${contactKey}]`, contactValue.toString())
          }
        })
      }
    }
    if (key === 'pictureUrls') {
      formExistingImages.forEach((url: string) => {
        formData.append(`pictureUrls[]`, url)
      })
    }
  })

  // Upload new images and wait for all uploads to complete
  if (formNewImageFiles.length) {
    const uploadedFileNames = await Promise.all(
      formNewImageFiles.map(uploadImages),
    )

    uploadedFileNames.forEach((file) => {
      if (file) {
        formData.append('pictureUrls[]', `${file.fileId}_${file.fileName}`)
      }
    })
  }
  return formData
}

export default transformListingObjectToFormData
