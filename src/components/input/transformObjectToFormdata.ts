import { uploadImage } from 'api/queries'
import type { UpdateListingRequest } from 'api/types'

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

  const binaryKeys = ['isPrivate', 'listingForSale', 'listingForRent']

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data]
    if (value === null || value === undefined || value === '') {
      return
    }
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
      if (binaryKeys.includes(key)) {
        const binaryValue = value ? 1 : 0
        formData.append(key, binaryValue.toString())
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString())
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
      formNewImageFiles.map(uploadImage),
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
