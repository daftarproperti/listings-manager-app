import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type ClosingStatus, type Closing } from 'api/types'
import InputField from 'components/input/InputField'
import DateInputField from 'components/input/DateInputField'
import IntuitiveCurrencyInputField from 'components/input/IntuitiveCurrencyInputField'
import SelectField from 'components/input/SelectField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'
import { useClosingListing, useGetListingDetail } from 'api/queries'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@material-tailwind/react'
import { formatDate, getClosingStatus } from 'utils'

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
  const { data } = useGetListingDetail({ id })
  const navigate = useNavigate()

  const submitProcess = async (formData: Closing) => {
    await onSubmit(id, formData, mutate, navigate)
  }

  return (
    <div className="flex flex-col">
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
      {data?.closings && data.closings.length > 0 && (
        <div className="bg-slate-100 p-4">
          <h3 className="mb-3 text-lg font-bold">Daftar Closing</h3>
          <p className="mb-2 text-sm">
            Berikut daftar closing yang sudah pernah dilaporkan.
          </p>
          <table className="w-full max-w-full table-auto border border-solid border-blue-gray-100 text-left lg:max-w-lg">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-slate-200 p-2 text-sm sm:max-w-[100px]">
                  No. Closing
                </th>
                <th className="border-b border-blue-gray-100 bg-slate-200 p-2 text-sm">
                  Nama
                </th>
                <th className="border-b border-blue-gray-100 bg-slate-200 p-2 text-sm">
                  Tanggal
                </th>
                <th className="border-b border-blue-gray-100 bg-slate-200 p-2 text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.closings.map(({ id, clientName, date, status }) => (
                <tr
                  key={clientName}
                  onClick={() =>
                    navigate(`/listings/${data.id}/closing/${id}/detail`)
                  }
                  className="cursor-pointer"
                >
                  <td className="border-b border-blue-gray-100 p-2 text-sm underline">
                    {id && id.length > 10 ? `${id.substring(0, 10)}...` : id}
                  </td>
                  <td className="border-b border-blue-gray-100 p-2 text-sm">
                    {clientName}
                  </td>
                  <td className="border-b border-blue-gray-100 p-2 text-sm">
                    {formatDate(date)}
                  </td>
                  <td className="border-b border-blue-gray-100 p-2 text-sm">
                    {getClosingStatus(status as ClosingStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <form
        onSubmit={handleSubmit(submitProcess)}
        className="flex flex-col gap-2"
      >
        <h3 className="mx-4 mt-4 text-lg font-bold">Form Laporan Closing</h3>
        <div className="border-y px-4 py-2">
          <Typography variant="small" className="font-medium">
            Silahkan mengisi form ini untuk mengajukan laporan transaksi.
          </Typography>
        </div>
        <div className="px-4 lg:w-4/5">
          <SelectField
            name="closingType"
            control={control}
            label="Tipe Closing"
            registerHook={register('closingType', { required: true })}
            selectOptions={LISTING_OPTIONS.closingType.options}
            errorFieldName={errors.closingType}
          />
          <InputField
            label="Nama Pembeli/Penyewa"
            registerHook={register('clientName', { required: true })}
            placeholderValue="Nama"
            errorFieldName={errors.clientName}
            halfWidth={false}
          />
          <InputField
            label="No HP Pembeli/Penyewa"
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
    </div>
  )
}

export default ClosingForm
