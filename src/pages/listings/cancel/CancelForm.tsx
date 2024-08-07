import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TextareaField from 'components/input/TextareaField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { Button } from '@material-tailwind/react'
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
      className="flex min-h-screen flex-col gap-2"
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
      <div className="items-start justify-center border-b border-solid border-slate-200 bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500">
        Silahkan mengisi form ini untuk pembatalan transaksi.
      </div>
      <div className="p-4 lg:w-4/5">
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
