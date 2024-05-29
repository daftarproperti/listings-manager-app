import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@material-tailwind/react'
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
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formExistingImages, setFormExistingImages] = useState<string[]>([])
  const [formNewImageFiles, setFormNewImageFiles] = useState<File[]>([])
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

  const { mutate } = useUpdateListing()

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

  const handleExistingImagesChange = (existingImages: string[]) => {
    setFormExistingImages(existingImages)
  }
  const handleNewFiles = (newFiles: File[]) => {
    setFormNewImageFiles(newFiles)
  }

  useEffect(() => {
    if (listingDetails) {
      reset(listingDetails)
    }
  }, [listingDetails, reset])

  if (isLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Loading...
      </div>
    )
  if (isError)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Error loading listing details.
      </div>
    )

  return (
    <form
      className="w-full bg-slate-50 pb-20 pt-16 lg:pb-4 lg:pt-0"
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
      <div className="items-start justify-center whitespace-nowrap border-b border-solid border-slate-200 bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500 lg:hidden">
        Lengkapi data dibawah ini
      </div>
      <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
        <div className="text-xl font-semibold">Edit Properti</div>
        <Button
          size="sm"
          color="blue"
          type="submit"
          className="flex items-center gap-2 text-sm font-normal capitalize"
          disabled={isSubmitting}
        >
          Simpan
        </Button>
      </div>
      <div className="p-4 lg:w-4/5">
        <InputFileField
          label="Foto Properti"
          additionalLabel="Maksimal 10 foto, format .jpg, .png, @10mb"
          registerHook={register('pictureUrls')}
          dataListing={{ pictureUrls: listingDetails?.pictureUrls }}
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
          registerHook={register('address', { required: true })}
          placeholderValue="Isi alamat lengkap"
          errorFieldName={errors.address}
          additionalLabel="Pelajari lebih lanjut di "
          linkHref="http://www.daftarproperti.org/address-required"
          linkText="sini"
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
              rightContent={
                <>
                  m<sup>2</sup>
                </>
              }
            />
          )}
          {propertyType !== 'land' && (
            <InputField
              halfWidth={true}
              label="Luas Bangunan"
              registerHook={register('buildingSize', { required: true })}
              placeholderValue="Luas Bangunan"
              errorFieldName={errors.buildingSize}
              rightContent={
                <>
                  m<sup>2</sup>
                </>
              }
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
      <div className="w-full bg-blue-100 px-4 py-3 text-lg lg:w-4/5">
        Keterangan Agen
      </div>
      <div className="bg-slate-50 p-4">
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
        <Link to="/user" className="cursor-pointer text-blue-500">
          Ubah Data Pribadi
        </Link>
      </div>
      <div className="lg:hidden">
        <BottomStickyButton type="submit" disabled={isSubmitting}>
          Simpan
        </BottomStickyButton>
      </div>
    </form>
  )
}

export default EditListing
