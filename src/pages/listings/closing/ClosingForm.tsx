import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type Closing } from 'api/types'
import InputField from 'components/input/InputField'
import DateInputField from 'components/input/DateInputField'
import IntuitiveCurrencyInputField from 'components/input/IntuitiveCurrencyInputField'
import SelectField from 'components/input/SelectField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'
import { useClosingListing } from 'api/queries'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

import { onSubmit } from './handleClosingForm'
import { closingSchema } from './closingSchema'

const ClosingForm = ({ id }: { id: string }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Closing>({
    resolver: zodResolver(closingSchema),
  })

  const { mutate, isPending } = useClosingListing()
  const navigate = useNavigate()

  const submitProcess = async (formData: Closing) => {
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
        Silahkan mengisi form ini untuk laporan transaksi.
      </div>
      <div className="p-4 lg:w-4/5">
        <SelectField
          label="Tipe Closing"
          registerHook={register('closingType', { required: true })}
          selectOptions={LISTING_OPTIONS.closingType.options}
          defaultOption="Pilih Tipe Closing"
          errorFieldName={errors.closingType}
        />
        <InputField
          label="Nama Pembeli"
          registerHook={register('clientName', { required: true })}
          placeholderValue="Nama"
          errorFieldName={errors.clientName}
          halfWidth={false}
        />
        <InputField
          label="No HP Pembeli"
          registerHook={register('clientPhoneNumber', { required: true })}
          placeholderValue="No HP"
          errorFieldName={errors.clientPhoneNumber}
          halfWidth={false}
        />
        <DateInputField
          label="Tanggal"
          name="date"
          control={control}
          placeholderValue="Pilih tanggal"
        />
        <IntuitiveCurrencyInputField
          name="transactionValue"
          control={control}
          label="Nilai Transaksi"
          placeholderValue="Isi Harga"
          errorFieldName={errors.transactionValue}
        />
      </div>
      <div></div>
      <div className="lg:hidden">
        <BottomStickyButton type="submit">Kirim</BottomStickyButton>
      </div>
    </form>
  )
}

export default ClosingForm
