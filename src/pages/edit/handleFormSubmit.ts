import { type UseMutateFunction } from '@tanstack/react-query'
import { type UpdatePropertyRequest, type UpdatePropertyRes } from 'api/types'
import transformPropertyObjectToFormData from 'components/input/transformObjectToFormdata'
import { type NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

interface UpdatePropertyParams {
  propertyId: string
  updateData: FormData
}
export const onSubmit = async (
  id: string,
  formData: UpdatePropertyRequest,
  mutate: UseMutateFunction<UpdatePropertyRes, Error, UpdatePropertyParams>,
  navigate: NavigateFunction,
  setIsSubmitting: (isSubmitting: boolean) => void,
  formExistingImages: string[],
  formNewImageFiles: File[],
) => {
  setIsSubmitting(true)
  const dataToSubmit = transformPropertyObjectToFormData({
    data: formData,
    formExistingImages,
    formNewImageFiles,
  })

  mutate(
    {
      propertyId: id,
      updateData: dataToSubmit,
    },
    {
      onSuccess: () => {
        navigate(`/detail/${id}`, {
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
