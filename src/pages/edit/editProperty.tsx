import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGetPropertyDetail, useUpdateProperty } from 'api/queries'
import { PROPERTY_OPTIONS } from './dummy'
import { UpdatePropertyRequest } from 'api/types'
import { useNavigate } from 'react-router-dom'
import { onSubmit } from './handleFormSubmit'
import InputField from 'components/input/InputField'
import SelectField from 'components/input/SelectField'
import TextareaField from 'components/input/TextareaField'
import InputFileField from 'components/input/InputFileField'
import InputCheckboxField from 'components/input/InputCheckboxField'

function PropertyForm({ id }: { id: string }) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UpdatePropertyRequest>({
    defaultValues: {
      isPrivate: false,
      ownership: '',
    },
  })
  const {
    data: propertyDetails,
    isLoading,
    isError,
  } = useGetPropertyDetail({ id: id })
  const [formExistingImages, setFormExistingImages] = useState<string[]>([])
  const [formNewImageFiles, setFormNewImageFiles] = useState<File[]>([])
  const handleExistingImagesChange = (existingImages: string[]) => {
    setFormExistingImages(existingImages)
  }
  const handleNewFiles = (newFiles: File[]) => {
    setFormNewImageFiles(newFiles)
  }
  const { mutate } = useUpdateProperty()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (propertyDetails) {
      reset(propertyDetails)
    }
  }, [propertyDetails, reset])

  if (isLoading)
    return (
      <div className="h-12 w-full justify-center p-6 text-center">
        Loading...
      </div>
    )
  if (isError)
    return (
      <div className="h-12 w-full justify-center p-6 text-center">
        Error loading property details.
      </div>
    )

  return (
    <form
      className="mx-auto max-w-lg"
      onSubmit={handleSubmit((formData) =>
        onSubmit(
          id,
          formData,
          mutate,
          navigate,
          setIsSubmitting,
          formExistingImages,
          formNewImageFiles,
        ),
      )}
    >
      <div className="items-start justify-center whitespace-nowrap border-b border-solid border-b-[color:var(--slate-200,#E2E8F0)] bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500">
        Lengkapi data dibawah ini
      </div>
      <div className="bg-slate-50 p-4">
        <InputFileField
          registerHook={register('pictureUrls')}
          dataProperty={propertyDetails}
          onNewFiles={handleNewFiles}
          onExistingImagesChange={handleExistingImagesChange}
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
          selectOptions={PROPERTY_OPTIONS.cities}
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
        <InputField
          label="Harga jual"
          registerHook={register('price', {
            required: true,
            pattern: {
              value: /^[0-9]+([,.][0-9]+)?$/,
              message: 'Please enter a valid number',
            },
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
          selectOptions={PROPERTY_OPTIONS.electric_power}
          defaultOption="Pilih Daya Listrik"
        />
        <SelectField
          label="Jenis Sertifikat"
          registerHook={register('ownership')}
          selectOptions={PROPERTY_OPTIONS.ownership}
          defaultOption="Pilih Jenis Sertifikat"
        />
      </div>
      <div className="w-full items-stretch justify-center whitespace-nowrap border-b border-solid border-b-[color:var(--gray-200,#E5E7EB)] bg-blue-100 py-3 pl-4 pr-14 pt-4 text-lg leading-7 text-gray-800">
        Keterangan Agen
      </div>
      <div className="bg-slate-50 p-4">
        <InputField
          label="Nama"
          registerHook={register('contacts.name')}
          placeholderValue="Tulis nama"
        />
        <InputField
          label="Nomor HP"
          registerHook={register('contacts.phoneNumber')}
          placeholderValue="Isi dengan awalan 0"
        />
        <InputField
          label="Perusahaan"
          registerHook={register('contacts.provider')}
          placeholderValue="Silahkan isi"
        />
        <InputCheckboxField
          label="Listing Private?"
          registerHook={register('isPrivate')}
          inputID="isPrivate"
        />
      </div>
      <div className="flex flex-col items-stretch justify-center bg-white px-4 py-2">
        <input
          type="submit"
          value={isSubmitting ? 'Loading...' : 'Simpan'}
          className="items-center justify-center whitespace-nowrap rounded-lg bg-blue-500 px-16 py-3 text-center text-base leading-6 text-white"
          disabled={isSubmitting}
        />
      </div>
    </form>
  )
}

export default PropertyForm
