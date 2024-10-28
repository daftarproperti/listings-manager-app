import { type UseMutateFunction } from '@tanstack/react-query'
import {
  type UpdateListingRequest,
  type UpdateListingRes,
  type UpdateListingParams,
} from 'api/types'
import transformListingObjectToFormData from 'components/input/transformObjectToFormdata'
import type { CombinedImage } from 'components/input/types'
import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

interface APIError {
  message?: string
}

export const onSubmit = async (
  id: string,
  formData: UpdateListingRequest,
  mutate: UseMutateFunction<UpdateListingRes, Error, UpdateListingParams>,
  navigate: NavigateFunction,
  setIsSubmitting: (isSubmitting: boolean) => void,
  combinedImages: CombinedImage[] | undefined,
) => {
  setIsSubmitting(true)
  const dataToSubmit = await transformListingObjectToFormData({
    data: formData,
    combinedImages,
  })

  mutate(
    {
      listingId: id,
      updateData: dataToSubmit,
    },
    {
      onSuccess: () => {
        navigate(`/listings/${id}`, {
          state: { updateSuccess: true },
          replace: true,
        })
        toast('Data Berhasil Diubah!', { type: 'success' })
      },
      onSettled: () => {
        setIsSubmitting(false)
      },
      onError: (error: unknown) => {
        const apiError = error as APIError

        const errorMessage = apiError.message
        if (errorMessage) {
          toast(`Error editing Listing: ${errorMessage}`, { type: 'error' })
        } else {
          toast(`Error submitting form: ${error}`, { type: 'error' })
        }
        setIsSubmitting(false)
      },
    },
  )
}
