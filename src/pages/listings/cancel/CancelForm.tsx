import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TextareaField from 'components/input/TextareaField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { Button, Typography } from '@material-tailwind/react'
import { type CancellationNote } from 'api/types'
import { useNavigate } from 'react-router-dom'
import { useUpdateCancellationNote } from 'api/queries'

import { onSubmit } from './handleCancellationNoteForm'
import { cancelSchema } from './cancelSchema'

const CancelForm = ({ id }: { id: string }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CancellationNote>({
    resolver: zodResolver(cancelSchema),
  })

  const { mutate, isPending } = useUpdateCancellationNote()
  const navigate = useNavigate()

  const submitProcess = async (formData: CancellationNote) => {
    await onSubmit(id, formData, mutate, navigate)
  }

  return (
    <form
      onSubmit={handleSubmit(submitProcess)}
      className="flex flex-col gap-2"
    >
      <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
        <div className="text-xl font-semibold">Laporan Closing</div>
        <Button
          size="sm"
          color="blue"
          type="submit"
          className="flex items-center gap-2 text-sm font-normal capitalize"
          disabled={isPending}
        >
          Kirim
        </Button>
      </div>
      <h3 className="mx-4 mt-4 text-lg font-bold">Form Pembatalan</h3>
      <div className="border-y px-4 py-2">
        <Typography variant="small" className="font-medium">
          Silahkan mengisi form ini untuk pembatalan transaksi.
        </Typography>
      </div>
      <div className="px-4 lg:w-4/5">
        <TextareaField
          label="Alasan Pembatalan"
          registerHook={register('reason', { required: true })}
          placeholderValue="Tulis alasan pembatalan"
          additionalClassName="h-96"
          errorFieldName={errors.reason}
        />
      </div>
      <div className="lg:hidden">
        <BottomStickyButton type="submit">Kirim</BottomStickyButton>
      </div>
    </form>
  )
}

export default CancelForm
