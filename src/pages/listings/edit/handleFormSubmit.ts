import { type UseMutateFunction } from '@tanstack/react-query'
import {
  type UpdateListingRequest,
  type UpdateListingRes,
  type UpdateListingParams,
} from 'api/types'
import transformListingObjectToFormData from 'components/input/transformObjectToFormdata'
import { type NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

export const onSubmit = async (
  id: string,
  formData: UpdateListingRequest,
  mutate: UseMutateFunction<UpdateListingRes, Error, UpdateListingParams>,
  navigate: NavigateFunction,
  setIsSubmitting: (isSubmitting: boolean) => void,
  formExistingImages: string[],
  formNewImageFiles: File[],
) => {
  setIsSubmitting(true)
  const dataToSubmit = await transformListingObjectToFormData({
    data: formData,
    formExistingImages,
    formNewImageFiles,
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
        toast(`Error submitting form: ${error}`, { type: 'error' })
        setIsSubmitting(false)
      },
    },
  )
}
