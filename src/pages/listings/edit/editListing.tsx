import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetListingDetail, useUpdateListing } from 'api/queries'
import { type Listing } from 'api/types'
import { getDynamicFormSchema } from 'components/form/addEditSchema'
import CurrencyInputField from 'components/input/CurrencyInputField'
import InputField from 'components/input/InputField'
import InputFileField from 'components/input/InputFileField'
import SelectField from 'components/input/SelectField'
import TextareaField from 'components/input/TextareaField'
import InputCheckboxField from 'components/input/InputCheckboxField'
import BottomStickyButton from 'components/button/BottomStickyButton'

import { LISTING_OPTIONS } from './dummy'
import { onSubmit } from './handleFormSubmit'

function EditListing({ id }: { id: string }) {
  const [schema, setSchema] = useState(() =>
    getDynamicFormSchema(false, false, 'house'),
  )
  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
    control,
  } = useForm<Listing>({
    defaultValues: {
      isPrivate: false,
      listingForSale: false,
      listingForRent: false,
      ownership: 'unknown',
    },
    resolver: zodResolver(schema),
  })
  const {
    data: listingDetails,
    isLoading,
    isError,
  } = useGetListingDetail({ id: id })

  const listingForSale = watch('listingForSale', false)
  const listingForRent = watch('listingForRent', false)
  const propertyType = watch('propertyType')

  useEffect(() => {
    if (
      typeof listingForSale === 'boolean' &&
      typeof listingForRent === 'boolean' &&
      propertyType
    ) {
      const updatedSchema = getDynamicFormSchema(
        listingForSale,
        listingForRent,
        propertyType,
      )
      setSchema(updatedSchema)
    }
  }, [listingForSale, listingForRent, propertyType])

  const [formExistingImages, setFormExistingImages] = useState<string[]>([])
  const [formNewImageFiles, setFormNewImageFiles] = useState<File[]>([])
  const handleExistingImagesChange = (existingImages: string[]) => {
    setFormExistingImages(existingImages)
  }
  const handleNewFiles = (newFiles: File[]) => {
    setFormNewImageFiles(newFiles)
  }
  const { mutate } = useUpdateListing()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigateToUserForm = () => {
    navigate(`/user`)
  }

  useEffect(() => {
    if (listingDetails) {
      reset(listingDetails)
    }
  }, [listingDetails, reset])

  if (isLoading)
    return (
      <div className="h-12 w-full justify-center p-6 text-center">
        Loading...
      </div>
    )
  if (isError)
    return (
      <div className="h-12 w-full justify-center p-6 text-center">
        Error loading listing details.
      </div>
    )

  return (
    <form
      className="mx-auto max-w-lg pt-16"
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
          dataListing={listingDetails}
          onNewFiles={handleNewFiles}
          onExistingImagesChange={handleExistingImagesChange}
          errorFieldName={errors.pictureUrls}
        />
        <InputField
          label="Judul Listing"
          registerHook={register('title', { required: true })}
          placeholderValue="Tulis Judul"
          errorFieldName={errors.title}
        />
        <div className="mt-3">
          <span className="text-lg font-semibold leading-7 text-gray-800">
            Tipe Listing
          </span>
          <div className="flex items-center space-x-8">
            <InputCheckboxField
              label="Dijual"
              registerHook={register('listingForSale')}
              inputID="listingForSale"
            />
            <InputCheckboxField
              label="Disewa"
              registerHook={register('listingForRent')}
              inputID="listingForRent"
            />
          </div>
        </div>
        <SelectField
          label="Tipe Properti"
          registerHook={register('propertyType', { required: false })}
          selectOptions={LISTING_OPTIONS.propertyType.options}
          defaultOption="Pilih Tipe Properti"
        />
        <InputField
          label="Alamat"
          registerHook={register('address', { required: false })}
          placeholderValue="Isi alamat"
          errorFieldName={errors.address}
        />
        <SelectField
          label="Kota"
          registerHook={register('city', { required: true })}
          selectOptions={LISTING_OPTIONS.cities.options}
          defaultOption="Pilih Kota"
          errorFieldName={errors.city}
        />
        <TextareaField
          label="Deskripsi"
          registerHook={register('description', { required: true })}
          placeholderValue="Tulis keterangan untuk listing ini"
          errorFieldName={errors.description}
        />
        {listingForSale && (
          <CurrencyInputField
            name="price"
            control={control}
            label="Harga Jual"
            registerHook={register('price', {
              required: true,
            })}
            placeholderValue="Isi Harga"
            errorFieldName={errors.price}
          />
        )}
        {listingForRent && (
          <CurrencyInputField
            name="rentPrice"
            control={control}
            label="Harga Sewa per tahun"
            registerHook={register('rentPrice', {
              required: true,
            })}
            placeholderValue="Isi Harga"
            errorFieldName={errors.rentPrice}
          />
        )}
        <div className="flex w-full">
          {propertyType !== 'apartment' && (
            <InputField
              halfWidth={true}
              leftPosition={true}
              label="Luas Tanah"
              registerHook={register('lotSize', { required: true })}
              placeholderValue="Luas Tanah"
              errorFieldName={errors.lotSize}
            />
          )}
          {propertyType !== 'land' && (
            <InputField
              halfWidth={true}
              label="Luas Bangunan"
              registerHook={register('buildingSize', { required: true })}
              placeholderValue="Luas Bangunan"
              errorFieldName={errors.buildingSize}
            />
          )}
        </div>
        {propertyType !== 'land' && (
          <SelectField
            label="Bangunan Menghadap"
            registerHook={register('facing', { required: false })}
            selectOptions={LISTING_OPTIONS.facing.options}
            defaultOption="Pilih Arah"
            errorFieldName={errors.facing}
          />
        )}
        {propertyType !== 'land' && propertyType !== 'warehouse' && (
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
        )}
        {propertyType !== 'land' &&
          propertyType !== 'warehouse' &&
          propertyType !== 'apartment' && (
            <div className="flex w-full">
              <InputField
                halfWidth={true}
                leftPosition={true}
                label="Lantai"
                registerHook={register('floorCount', { required: true })}
                placeholderValue="Silahkan isi"
                errorFieldName={errors.floorCount}
              />
              <InputField
                halfWidth={true}
                label="Kapasitas Mobil"
                registerHook={register('carCount', { required: false })}
                placeholderValue="Silahkan isi"
                errorFieldName={errors.carCount}
              />
            </div>
          )}
        {propertyType !== 'land' && (
          <SelectField
            label="Daya Listrik"
            registerHook={register('electricPower')}
            selectOptions={LISTING_OPTIONS.electric_power.options}
            defaultOption="Pilih Daya Listrik"
            errorFieldName={errors.electricPower}
          />
        )}
        {listingForSale && (
          <SelectField
            label="Jenis Sertifikat"
            registerHook={register('ownership')}
            selectOptions={LISTING_OPTIONS.ownership.options}
            defaultOption="Pilih Jenis Sertifikat"
            errorFieldName={errors.ownership}
          />
        )}
      </div>
      <div className="w-full items-stretch justify-center whitespace-nowrap border-b border-solid border-b-[color:var(--gray-200,#E5E7EB)] bg-blue-100 py-3 pl-4 pr-14 pt-4 text-lg leading-7 text-gray-800">
        Keterangan Agen
      </div>
      <div className="bg-slate-50 p-4 pb-24">
        <table>
          <tbody>
            <tr>
              <td className="pr-4">Nama</td>
              <td>: {watch('user.name')}</td>
            </tr>
            <tr>
              <td className="pr-4">No HP</td>
              <td>: {watch('user.phoneNumber')}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>
          <a
            className="cursor-pointer text-blue-500"
            onClick={() => navigateToUserForm()}
          >
            Ubah Data Pribadi
          </a>
        </p>
      </div>
      <BottomStickyButton type="submit" disabled={isSubmitting}>
        Simpan
      </BottomStickyButton>
    </form>
  )
}

export default EditListing
