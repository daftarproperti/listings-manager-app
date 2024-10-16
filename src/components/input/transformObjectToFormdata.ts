import { uploadImage } from 'api/queries'
import { type UpdateListingRequest as GeneratedListing } from 'api/types'

import type { CombinedImage } from './types'

interface ExtendedListing extends GeneratedListing {
  bedroomCounts?: string
  bathroomCounts?: string
}

const transformListingObjectToFormData = async ({
  data,
  combinedImages,
}: {
  data: ExtendedListing
  combinedImages?: CombinedImage[]
}): Promise<FormData> => {
  const formData = new FormData()

  const binaryKeys = [
    'isPrivate',
    'withRewardAgreement',
    'listingForSale',
    'listingForRent',
    'isMultipleUnits',
  ]
  const deleteAbleKeys = ['coordinate']

  if (data.bedroomCounts) {
    const parts = data.bedroomCounts
      .split('+')
      .map((part) => parseInt(part, 10))
    formData.append('bedroomCount', parts[0].toString())
    formData.append(
      'additionalBedroomCount',
      parts.length > 1 ? parts[1].toString() : '0',
    )
    delete data.bedroomCounts
  }

  if (data.bathroomCounts) {
    const parts = data.bathroomCounts
      .split('+')
      .map((part) => parseInt(part, 10))
    formData.append('bathroomCount', parts[0].toString())
    formData.append(
      'additionalBathroomCount',
      parts.length > 1 ? parts[1].toString() : '0',
    )
    delete data.bathroomCounts
  }

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data]
    if (
      (value === null || value === undefined || value === '') &&
      !deleteAbleKeys.includes(key)
    ) {
      return
    }

    if (
      key !== 'pictureUrls' &&
      !key.startsWith('contacts') &&
      key !== 'bedroomCount' &&
      key !== 'bathroomCount' &&
      key !== 'additionalBedroomCount' &&
      key !== 'additionalBathroomCount'
    ) {
      if (key === 'price' && typeof value === 'string') {
        data[key] = parseFloat(value)
      } else if (
        typeof value === 'string' &&
        (key === 'lotSize' || key === 'buildingSize' || key === 'floorCount')
      ) {
        data[key] = parseInt(value, 10)
      }

      if (key === 'coordinate') {
        if (!value) {
          formData.append('coordinate[latitude]', '')
          formData.append('coordinate[longitude]', '')
          return
        }
        const coordValue = value as { latitude?: number; longitude?: number }
        if (coordValue.latitude) {
          formData.append(
            'coordinate[latitude]',
            coordValue.latitude.toString(),
          )
        }
        if (coordValue.longitude) {
          formData.append(
            'coordinate[longitude]',
            coordValue.longitude.toString(),
          )
        }
      } else if (binaryKeys.includes(key)) {
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
  })

  // Upload new images and wait for all uploads to complete
  if (combinedImages?.length) {
    const pictureUrls = await Promise.all(
      combinedImages.map((file) =>
        file?.isExistingImage ? file.url : uploadImage(file.file),
      ),
    )

    pictureUrls.forEach((file, index) => {
      if (file) {
        formData.append(
          `pictureUrls[${index}]`,
          typeof file === 'string' ? file : `${file.fileId}_${file.fileName}`,
        )
      }
    })
  }

  return formData
}

export default transformListingObjectToFormData
