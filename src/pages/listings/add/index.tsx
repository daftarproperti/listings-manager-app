import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddListing } from 'api/queries'
import { type UpdateListingRequest } from 'api/types'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { addEditFormSchema } from 'components/form/addEditSchema'
import CurrencyInputField from 'components/input/CurrencyInputField'
import InputCheckboxField from 'components/input/InputCheckboxField'
import InputField from 'components/input/InputField'
import InputFileField from 'components/input/InputFileField'
import SelectField from 'components/input/SelectField'
import TextareaField from 'components/input/TextareaField'
import transformListingObjectToFormData from 'components/input/transformObjectToFormdata'
import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UpdateListingRequest>({
    defaultValues: {
      isPrivate: false,
      ownership: '',
    },
    resolver: zodResolver(addEditFormSchema),
  })

  const [formExistingImages, setFormExistingImages] = useState<string[]>([])
  const [formNewImageFiles, setFormNewImageFiles] = useState<File[]>([])
  const handleExistingImagesChange = (existingImages: string[]) => {
    setFormExistingImages(existingImages)
  }
  const handleNewFiles = (newFiles: File[]) => {
    setFormNewImageFiles(newFiles)
  }
  const { mutate, isPending } = useAddListing()
  const navigate = useNavigate()

  const onSubmit = async (data: UpdateListingRequest) => {
    const addNewListingPayload = await transformListingObjectToFormData({
      data,
      formExistingImages,
      formNewImageFiles,
    })
    mutate(addNewListingPayload, {
      onSuccess() {
        toast('Listing berhasil ditambahkan!', { type: 'success' })
        navigate(-1)
      },
      onError(error) {
        toast(`Mohon maaf, telah terjadi kesalahan (${error?.message})`, {
          type: 'error',
        })
      },
    })
  }

  return (
    <form className="mx-auto max-w-lg pt-16" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-fire-bush-100 p-4 text-xs">
        Anda dapat dengan mudah menambahkan listing dengan cara menyalin dan
        menempelkan seluruh informasi listing Anda pada bot chat Telegram Anda.
      </div>
      <div className="items-start justify-center whitespace-nowrap border-b border-solid border-b-[color:var(--slate-200,#E2E8F0)] bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500">
        Lengkapi data dibawah ini
      </div>
      <div className="bg-slate-50 px-4 pb-24">
        <InputFileField
          registerHook={register('pictureUrls')}
          dataListing={undefined}
          onNewFiles={handleNewFiles}
          onExistingImagesChange={handleExistingImagesChange}
          errorFieldName={errors.pictureUrls}
        />
        <InputField
          label="Judul listing"
          registerHook={register('title', { required: true })}
          placeholderValue="Tulis Judul"
          errorFieldName={errors.title}
          errorMessage="Judul listing harus diisi"
        />
        <InputField
          label="Alamat"
          registerHook={register('address', { required: true })}
          placeholderValue="Isi alamat lengkap"
          errorFieldName={errors.address}
          errorMessage="Alamat harus diisi"
        />
        <SelectField
          label="Kota"
          registerHook={register('city', { required: true })}
          selectOptions={LISTING_OPTIONS.cities.options}
          defaultOption="Pilih Kota"
          errorFieldName={errors.city}
          errorMessage="Kota harus diisi"
        />
        <TextareaField
          label="Deskripsi"
          registerHook={register('description', { required: true })}
          placeholderValue="Tulis keterangan untuk listing ini"
          errorFieldName={errors.description}
          errorMessage="Deskripsi harus diisi"
        />
        <CurrencyInputField
          name="price"
          control={control}
          label="Harga jual"
          registerHook={register('price', {
            required: true,
          })}
          placeholderValue="Isi Harga"
          errorFieldName={errors.price}
          errorMessage="Harga Jual harus diisi"
        />
        <div className="flex w-full">
          <InputField
            halfWidth={true}
            leftPosition={true}
            label="Luas Tanah"
            registerHook={register('lotSize', { required: true })}
            placeholderValue="Luas Tanah"
            errorFieldName={errors.lotSize}
            errorMessage="Luas Tanah harus diisi"
          />
          <InputField
            halfWidth={true}
            label="Luas Bangunan"
            registerHook={register('buildingSize', { required: true })}
            placeholderValue="Luas Bangunan"
            errorFieldName={errors.buildingSize}
            errorMessage="Luas Bangunan harus diisi"
          />
        </div>
        <InputField
          label="Bangunan Menghadap"
          registerHook={register('facing')}
          placeholderValue="Silahkan isi"
        />
        <div className="flex w-full">
          <InputField
            halfWidth={true}
            leftPosition={true}
            label="Kamar Tidur"
            registerHook={register('bedroomCount', { required: true })}
            placeholderValue="Silahkan isi"
            errorFieldName={errors.bedroomCount}
            errorMessage="Kamar Tidur harus diisi"
          />
          <InputField
            halfWidth={true}
            label="Kamar Mandi"
            registerHook={register('bathroomCount', { required: true })}
            placeholderValue="Silahkan isi"
            errorFieldName={errors.bathroomCount}
            errorMessage="Kamar Mandi harus diisi"
          />
        </div>
        <div className="flex w-full">
          <InputField
            halfWidth={true}
            leftPosition={true}
            label="Lantai"
            registerHook={register('floorCount')}
            placeholderValue="Silahkan isi"
          />
          <InputField
            halfWidth={true}
            label="Garasi Mobil"
            registerHook={register('carCount')}
            placeholderValue="Silahkan isi"
          />
        </div>
        <SelectField
          label="Daya Listrik"
          registerHook={register('electricPower')}
          selectOptions={LISTING_OPTIONS.electric_power.options}
          defaultOption="Pilih Daya Listrik"
        />
        <SelectField
          label="Jenis Sertifikat"
          registerHook={register('ownership')}
          selectOptions={LISTING_OPTIONS.ownership.options}
          defaultOption="Pilih Jenis Sertifikat"
        />
        <InputCheckboxField
          label="Listing Private?"
          registerHook={register('isPrivate')}
          inputID="isPrivate"
        />
      </div>
      <BottomStickyButton type="submit" disabled={isPending}>
        Simpan
      </BottomStickyButton>
    </form>
  )
}

export default AddPage
