import { type UseMutateFunction } from '@tanstack/react-query'
import {
  type UpdateProfileRequest,
  type UserProfileResponse,
  type UpdateProfileParams,
} from 'api/types'
import { type NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

export const onSubmit = async (
  formData: UpdateProfileRequest & { picture?: File | null },
  mutate: UseMutateFunction<UserProfileResponse, Error, UpdateProfileParams>,
  navigate: NavigateFunction,
  setIsSubmitting: (isSubmitting: boolean) => void,
  formNewImageFile: File | null,
) => {
  setIsSubmitting(true)
  const dataToSubmit = new FormData()

  Object.entries(formData).forEach(([key, value]) => {
    if (key !== 'picture') {
      dataToSubmit.append(key, value != null ? value : '')
    }
  })

  if (formNewImageFile !== null) {
    dataToSubmit.append('picture', formNewImageFile)
  }

  mutate(
    { userData: dataToSubmit },
    {
      onSuccess: () => {
        navigate('/', {
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
