import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetPropertyDetail, useUpdateProperty } from 'api/queries'
import { type UpdatePropertyRequest } from 'api/types'
import { addEditFormSchema } from 'components/form/addEditSchema'
import CurrencyInputField from 'components/input/CurrencyInputField'
import InputCheckboxField from 'components/input/InputCheckboxField'
import InputField from 'components/input/InputField'
import InputFileField from 'components/input/InputFileField'
import SelectField from 'components/input/SelectField'
import TextareaField from 'components/input/TextareaField'
import BottomStickyButton from 'components/button/BottomStickyButton'

import { PROPERTY_OPTIONS } from './dummy'
import { onSubmit } from './handleFormSubmit'

function PropertyForm({ id }: { id: string }) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
  } = useForm<UpdatePropertyRequest>({
    defaultValues: {
      isPrivate: false,
      ownership: '',
    },
    resolver: zodResolver(addEditFormSchema),
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
      onSubmit={handleSubmit((data) =>
        onSubmit(
          id,
          data,
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
          errorFieldName={errors.pictureUrls}
        />
        <InputField
          label="Judul listing"
          registerHook={register('title', { required: true })}
          placeholderValue="Tulis Judul"
          errorFieldName={errors.title}
        />
        <InputField
          label="Alamat"
          registerHook={register('address', { required: true })}
          placeholderValue="Isi alamat lengkap"
          errorFieldName={errors.address}
        />
        <SelectField
          label="Kota"
          registerHook={register('city', { required: true })}
          selectOptions={PROPERTY_OPTIONS.cities.options}
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
          />
          <InputField
            halfWidth={true}
            label="Luas Bangunan"
            registerHook={register('buildingSize', { required: true })}
            placeholderValue="Luas Bangunan"
            errorFieldName={errors.buildingSize}
          />
        </div>
        <InputField
          label="Bangunan Menghadap"
          registerHook={register('facing')}
          placeholderValue="Silahkan isi"
          errorFieldName={errors.facing}
        />
        <div className="flex w-full">
          <InputField
            halfWidth={true}
            leftPosition={true}
            label="Kamar Tidur"
            registerHook={register('bedroomCount', { required: true })}
            placeholderValue="Silahkan isi"
            errorFieldName={errors.bedroomCount}
          />
          <InputField
            halfWidth={true}
            label="Kamar Mandi"
            registerHook={register('bathroomCount', { required: true })}
            placeholderValue="Silahkan isi"
            errorFieldName={errors.bathroomCount}
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
          selectOptions={PROPERTY_OPTIONS.electric_power.options}
          defaultOption="Pilih Daya Listrik"
        />
        <SelectField
          label="Jenis Sertifikat"
          registerHook={register('ownership')}
          selectOptions={PROPERTY_OPTIONS.ownership.options}
          defaultOption="Pilih Jenis Sertifikat"
        />
      </div>
      <div className="w-full items-stretch justify-center whitespace-nowrap border-b border-solid border-b-[color:var(--gray-200,#E5E7EB)] bg-blue-100 py-3 pl-4 pr-14 pt-4 text-lg leading-7 text-gray-800">
        Keterangan Agen
      </div>
      <div className="bg-slate-50 p-4 pb-24">
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
      <BottomStickyButton type="submit" disabled={isSubmitting}>
        Simpan
      </BottomStickyButton>
    </form>
  )
}

export default PropertyForm
