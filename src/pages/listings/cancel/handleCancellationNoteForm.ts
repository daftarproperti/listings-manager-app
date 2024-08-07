import { type UseMutateFunction } from '@tanstack/react-query'
import {
  type UpdateCancellationNoteRequest,
  type CancelListingRes,
  type UpdateCancellationNoteParams,
} from 'api/types'
import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

export const onSubmit = async (
  id: string,
  formData: UpdateCancellationNoteRequest,
  mutate: UseMutateFunction<
    CancelListingRes,
    Error,
    UpdateCancellationNoteParams
  >,
  navigate: NavigateFunction,
) => {
  mutate(
    {
      listingId: id,
      updateData: formData,
    },
    {
      onSuccess: () => {
        navigate(`/listings/${id}`)
        toast('Pembatalan berhasil dikirim. Mohon menunggu review.', {
          type: 'success',
        })
      },
      onError: (error: unknown) => {
        toast(`Error submitting form: ${error}`, { type: 'error' })
      },
    },
  )
}
