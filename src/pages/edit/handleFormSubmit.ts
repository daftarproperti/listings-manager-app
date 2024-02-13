import { UpdatePropertyRequest } from 'api/types'
import { NavigateFunction } from 'react-router-dom'

export const onSubmit = async (
  id: string,
  formData: UpdatePropertyRequest,
  mutate: any,
  navigate: NavigateFunction,
  setIsSubmitting: (isSubmitting: boolean) => void,
  formExistingImages: string[],
  formNewImageFiles: File[],
) => {
  setIsSubmitting(true)
  const dataToSubmit = new FormData()

  Object.keys(formData).forEach((key) => {
    const value = formData[key as keyof typeof formData]

    if (key !== 'pictureUrls' && !key.startsWith('contacts')) {
      if (key === 'price' && typeof value === 'string') {
        formData[key] = parseFloat(value)
      } else if (
        typeof value === 'string' &&
        (key === 'lotSize' ||
          key === 'buildingSize' ||
          key === 'bedroomCount' ||
          key === 'bathroomCount' ||
          key === 'floorCount')
      ) {
        formData[key] = parseInt(value, 10)
      }

      if (value !== null && value !== undefined) {
        dataToSubmit.append(key, value.toString())
      }

      if (key === 'isPrivate') {
        const valueIsPrivate = formData.isPrivate ? 1 : 0
        dataToSubmit.append('isPrivate', valueIsPrivate.toString())
      }
    }

    if (key.startsWith('contacts')) {
      if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach((contactKey: string) => {
          const contactValue = (value as any)[contactKey]
          if (contactValue !== null && contactValue !== undefined) {
            dataToSubmit.append(
              `contacts[${contactKey}]`,
              contactValue.toString(),
            )
          }
        })
      }
    }
    if (key === 'pictureUrls') {
      formExistingImages.forEach((url: string, index: number) => {
        dataToSubmit.append(`pictureUrls[${index}]`, url)
      })

      formNewImageFiles.forEach((file, index) => {
        const newIndex = formExistingImages.length + index
        dataToSubmit.append(`pictureUrls[${newIndex}]`, file)
      })
    }
  })

  mutate(
    {
      propertyId: id,
      updateData: dataToSubmit,
    },
    {
      onSuccess: () =>
        navigate(`/detail/${id}`, {
          state: { updateSuccess: true },
          replace: true,
        }),
      onSettled: () => {
        setIsSubmitting(false)
      },
      onError: (error: unknown) => {
        console.error('Error submitting form:', error)
        setIsSubmitting(false)
      },
    },
  )
}
