import { type UseMutateFunction } from '@tanstack/react-query'
import {
  type UpdateClosingRequest,
  type ClosingListingRes,
  type ClosingListingParams,
} from 'api/types'
import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

export const onSubmit = async (
  id: string,
  formData: UpdateClosingRequest,
  mutate: UseMutateFunction<ClosingListingRes, Error, ClosingListingParams>,
  navigate: NavigateFunction,
) => {
  const dataToSubmit = new FormData()

  Object.keys(formData).forEach((key) => {
    const value = formData[key as keyof typeof formData]
    if (value !== undefined) {
      dataToSubmit.append(key, value.toString())
    }
  })

  mutate(
    {
      listingId: id,
      updateData: dataToSubmit,
    },
    {
      onSuccess: () => {
        navigate(`/listings/${id}`)
        toast('Laporan berhasil dikirim.', { type: 'success' })
      },
      onError: (error: unknown) => {
        toast(`Error submitting form: ${error}`, { type: 'error' })
      },
    },
  )
}
