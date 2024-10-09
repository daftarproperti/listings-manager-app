import { type SetStateAction, useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Tooltip, Typography } from '@material-tailwind/react'
import {
  useGetListingDetail,
  useUpdateListing,
  getDebouncedCities,
  fetchDefaultCities,
} from 'api/queries'
import { appPath, formatCalculatedPrice } from 'utils'
import { schema } from 'components/form/addEditSchema'
import type { CityOption, Listing as GeneratedListing } from 'api/types'
import IntuitiveCurrencyInputField from 'components/input/IntuitiveCurrencyInputField'
import InputField from 'components/input/InputField'
import InputFileField from 'components/input/InputFileField'
import SelectField from 'components/input/SelectField'
import TextareaField from 'components/input/TextareaField'
import InputCheckboxField from 'components/input/InputCheckboxField'
import CustomSelectField from 'components/input/CustomSelectField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { DEFAULT_LAT_LNG } from 'utils/constant'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import GoogleMaps from 'components/GoogleMaps'
import AddressTooltip from 'components/AddressTooltip'
import ConfirmationDialog from 'components/header/ConfirmationDialog'
import type { CombinedImage } from 'components/input/types'
import { useDirty } from 'contexts/DirtyContext'

import { onSubmit } from './handleFormSubmit'
import { LISTING_OPTIONS } from './dummy'

export interface ExtendedListing extends GeneratedListing {
  bedroomCounts?: string
  bathroomCounts?: string
}

function EditListing({ id }: { id: string }) {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [coord, setCoord] = useState<google.maps.LatLngLiteral>(DEFAULT_LAT_LNG)
  const { setDirty } = useDirty()

  const checkboxSectionRef = useRef<HTMLDivElement | null>(null)

  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
  } = useForm<ExtendedListing>({
    defaultValues: {
      isPrivate: false,
      ownership: 'unknown',
    },
    resolver: zodResolver(schema),
  })
  const isErrorExist = Object.keys(errors).length > 0

  const {
    data: listingDetails,
    isPending,
    isError,
  } = useGetListingDetail({ id })

  const { mutate } = useUpdateListing()
  const [pricePerMeter, setPricePerMeter] = useState<number | null>(null)

  const listingForSale = watch('listingForSale')
  const listingForRent = watch('listingForRent')
  const propertyType = watch('propertyType')
  const price = watch('price')
  const lotSize = watch('lotSize')

  const [defaultCityOptions, setDefaultCityOptions] = useState<CityOption[]>([])
  const [selectedCity, setSelectedCity] = useState<{
    label: string
    value: number
  } | null>(null)
  const [combinedImages, setCombinedImages] = useState<
    CombinedImage[] | undefined
  >()

  const resetFormValues = (data: ExtendedListing) =>
    reset({
      ...data,
      coordinate:
        data?.coordinate?.latitude && data?.coordinate?.longitude
          ? {
              latitude: data.coordinate.latitude,
              longitude: data.coordinate.longitude,
            }
          : {
              latitude: DEFAULT_LAT_LNG.lat,
              longitude: DEFAULT_LAT_LNG.lng,
            },
    })

  useEffect(() => {
    if (price && lotSize && lotSize > 0) {
      setPricePerMeter(price / lotSize)
    } else {
      setPricePerMeter(null)
    }
  }, [price, lotSize])

  useEffect(() => {
    if (listingDetails) {
      const { bedroomCount, additionalBedroomCount } = listingDetails
      const bedroomCombinedValue = `${bedroomCount}${
        additionalBedroomCount ? `+${additionalBedroomCount}` : ''
      }`
      setValue('bedroomCounts', bedroomCombinedValue)

      const { bathroomCount, additionalBathroomCount } = listingDetails
      const bathroomCombinedValue = `${bathroomCount}${
        additionalBathroomCount ? `+${additionalBathroomCount}` : ''
      }`
      setValue('bathroomCounts', bathroomCombinedValue)

      resetFormValues(listingDetails)
      if (
        listingDetails.coordinate?.latitude &&
        listingDetails.coordinate.longitude
      ) {
        setCoord({
          lat: listingDetails.coordinate.latitude,
          lng: listingDetails.coordinate.longitude,
        })
      }
    }
  }, [listingDetails])

  const cityId = watch('cityId')
  const cityName = watch('cityName')

  useEffect(() => {
    if (listingDetails && !selectedCity) {
      const defaultCity = {
        label: listingDetails.cityName,
        value: listingDetails.cityId,
      }
      setSelectedCity(defaultCity as CityOption)
      setValue('cityId', defaultCity.value)
    }
  }, [listingDetails, selectedCity])

  useEffect(() => {
    fetchDefaultCities().then((cities) => {
      const cityOptions = cities.map((city) => ({
        label: city.name || 'Unknown city',
        value: city.id || 0,
      }))
      setDefaultCityOptions(cityOptions)

      if (cityId && cityName && typeof cityName === 'string') {
        const initialCity = cityOptions.find(
          (option) => option.value === cityId,
        ) || {
          label: cityName,
          value: cityId,
        }
        setSelectedCity(initialCity as CityOption)
      }
    })
  }, [cityId, cityName])

  useEffect(() => {
    if (errors.listingType && Object.keys(errors).length === 1) {
      checkboxSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [errors.listingType])

  useEffect(() => {
    if (coord.lat && coord.lng) {
      setValue('coordinate.latitude', coord.lat)
      setValue('coordinate.longitude', coord.lng)
    }
  }, [coord.lat, coord.lng])

  useEffect(() => {
    if (combinedImages && combinedImages.length > 0) {
      clearErrors('pictureUrls')
    } else {
      setError('pictureUrls', {
        type: 'manual',
        message: 'Foto Properti harus berisi minimal 1 gambar',
      })
    }
  }, [combinedImages, setError, clearErrors])

  const handleCityChange = (cityOption: SetStateAction<CityOption | null>) => {
    setSelectedCity(cityOption)
    listingDetails && resetFormValues(listingDetails)
  }

  const confirmTitle = 'Apakah Anda yakin tidak menyetujui persetujuan imbalan?'
  const confirmSubtitle =
    'Jika Anda ingin listing Anda cepat terjual, Anda harus menyetujui persetujuan imbalan.'

  const handleConfirmation = async () => {
    setIsDialogOpen(false)
    const formData = watch()
    onSubmit(id, formData, mutate, navigate, setIsSubmitting, combinedImages)
    setDirty(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  const submitProcess = async (data: GeneratedListing) => {
    if (localStorage.getItem('optional-agreement') === 'true') {
      if (!data.withRewardAgreement) {
        setIsDialogOpen(true)
      } else {
        onSubmit(id, data, mutate, navigate, setIsSubmitting, combinedImages)
        setDirty(false)
      }
    } else {
      onSubmit(id, data, mutate, navigate, setIsSubmitting, combinedImages)
      setDirty(false)
    }
  }

  if (isPending)
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
    <>
      <form
        className="w-full bg-slate-50 pb-20 pt-16 lg:pb-4 lg:pt-0"
        onSubmit={handleSubmit(submitProcess)}
      >
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
          <div className="text-xl font-semibold">Edit Listing</div>
          <Button
            size="sm"
            color="blue"
            type="submit"
            className="flex items-center gap-2 text-sm font-normal capitalize"
            disabled={isSubmitting || isErrorExist}
          >
            Simpan
          </Button>
        </div>
        <div className="items-start justify-center border-b border-solid border-slate-200 bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500">
          Dengan mengisi formulir listing ini, anda telah memahami{' '}
          <a
            target="_blank"
            className="text-blue-500 hover:underline"
            href="/peraturan"
          >
            peraturan
          </a>{' '}
          dan{' '}
          <a
            target="_blank"
            className="text-blue-500 hover:underline"
            href="/checklist"
          >
            <i>checklist</i>
          </a>{' '}
          Daftar Properti.
        </div>
        <div className="p-4 lg:w-4/5">
          <InputFileField
            label="Foto Properti"
            additionalLabel="Maksimal 10 foto, format .jpg, .png, @10mb"
            registerHook={register('pictureUrls')}
            dataListing={{ pictureUrls: listingDetails?.pictureUrls }}
            errorFieldName={errors.pictureUrls}
            combinedImages={combinedImages}
            setCombinedImages={setCombinedImages}
            setError={setError}
            onImageExistChange={(noExist) => {
              if (noExist) {
                setError('pictureUrls', {
                  message: 'Foto Properti harus berisi minimal 1 gambar',
                  type: 'manual',
                })
                setDirty(false)
              } else {
                clearErrors && clearErrors('pictureUrls')
                setDirty(true)
              }
            }}
          />
          <InputField
            label="Judul Listing"
            registerHook={register('title', { required: true })}
            placeholderValue="Tulis Judul"
            errorFieldName={errors.title}
          />
          <div className="mt-3" ref={checkboxSectionRef}>
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
            {!listingForSale && !listingForRent && (
              <p className="mt-1 self-stretch text-sm leading-5 text-red-500">
                {errors.listingType?.message ||
                  'Harus memilih minimal satu tipe listing'}
              </p>
            )}
          </div>
          <SelectField
            label="Tipe Properti"
            registerHook={register('propertyType', { required: false })}
            selectOptions={LISTING_OPTIONS.propertyType.options}
            defaultOption="Pilih Tipe Properti"
          />
          <div className="my-5">
            <InputCheckboxField
              label="Listing dengan Multi Unit"
              registerHook={register('isMultipleUnits')}
              inputID="isMultipleUnits"
              errorFieldName={errors.isMultipleUnits}
              showTooltip={true}
              tooltipContent="Centang jika di listing ini tersedia lebih dari 1 unit, misalnya cluster perumahan atau apartemen."
            />
          </div>
          <InputField
            label="Alamat"
            registerHook={register('address', { required: true })}
            placeholderValue="Isi alamat lengkap"
            errorFieldName={errors.address}
            additionalLabel={<AddressTooltip />}
          />
          <CustomSelectField
            control={control}
            name="cityId"
            placeholder="Pilih Kota"
            label="Kota"
            loadOptions={getDebouncedCities}
            defaultOptions={defaultCityOptions}
            defaultValue={selectedCity ?? undefined}
            onCityChange={handleCityChange}
          />
          <TextareaField
            label="Deskripsi"
            registerHook={register('description', { required: true })}
            placeholderValue="Tulis keterangan untuk listing ini"
            errorFieldName={errors.description}
          />
          {(listingForSale || (!listingForSale && !listingForRent)) && (
            <IntuitiveCurrencyInputField
              name="price"
              control={control}
              label="Harga Jual"
              placeholderValue="Isi Harga"
              errorFieldName={errors.price}
            />
          )}
          {listingForRent && (
            <IntuitiveCurrencyInputField
              name="rentPrice"
              control={control}
              label="Harga Sewa per tahun"
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
                type="number"
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
                type="number"
              />
            )}
            {propertyType == 'land' &&
              pricePerMeter !== null &&
              listingForSale && (
                <div className="ml-3 mt-3">
                  <label className="text-lg font-semibold leading-7">
                    Harga Jual /m<sup>2</sup>
                  </label>
                  <div className="mt-1 h-11 w-full rounded-lg border border-solid border-slate-300 bg-slate-200 px-3 py-2">
                    {`${formatCalculatedPrice(pricePerMeter)}`}/m<sup>2</sup>
                  </div>
                </div>
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
                registerHook={register('bedroomCounts', { required: true })}
                placeholderValue="Contoh: 3 atau 3+1"
                errorFieldName={errors.bedroomCounts}
                allowOnlyNumbersAndPlus={true}
              />
              <InputField
                halfWidth={true}
                label="Kamar Mandi"
                registerHook={register('bathroomCounts', {
                  required: true,
                })}
                placeholderValue="Contoh: 2 atau 2+1"
                errorFieldName={errors.bathroomCounts}
                allowOnlyNumbersAndPlus={true}
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
          {import.meta.env.VITE_WITH_LATLNG_PICKER && (
            <>
              <div className="flex w-full">
                <InputField
                  halfWidth={true}
                  leftPosition={true}
                  label={
                    <span className="flex items-center gap-1">
                      Koordinat{' '}
                      <Tooltip
                        className="border border-blue-gray-100 bg-white px-4 py-3 shadow shadow-black/10"
                        content={
                          <div className="w-60">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-80"
                            >
                              Ketuk map atau pindahkan pin di dalam map untuk
                              mendapatkan koordinat yang sesuai
                            </Typography>
                          </div>
                        }
                      >
                        <InformationCircleIcon className="h-5 w-5 text-slate-500" />
                      </Tooltip>
                    </span>
                  }
                  registerHook={register('coordinate.latitude', {
                    valueAsNumber: true,
                  })}
                  placeholderValue="Lat"
                  readOnly
                  errorFieldName={errors.coordinate?.latitude}
                />
                <InputField
                  halfWidth={true}
                  registerHook={register('coordinate.longitude', {
                    valueAsNumber: true,
                  })}
                  placeholderValue="Long"
                  readOnly
                  errorFieldName={errors.coordinate?.longitude}
                />
              </div>
              <GoogleMaps coord={coord} setCoord={setCoord} />
            </>
          )}
          <div className="relative mt-3 w-full self-stretch">
            <InputCheckboxField
              title="Persetujuan Imbalan"
              label="Saya setuju dengan persetujuan imbalan (0,5% jual / 2% sewa) ketika properti mendapatkan pembeli/penyewa melalui jaringan pemasar Daftar Properti"
              registerHook={register('withRewardAgreement')}
              inputID="withRewardAgreement"
              errorFieldName={errors.withRewardAgreement}
            />
          </div>
        </div>
        <div className="w-full bg-blue-100 px-4 py-3 text-lg lg:w-4/5">
          Kontak
        </div>
        <div className="bg-slate-50 p-4">
          {watch('user.profilePictureURL') && (
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <img
                loading="lazy"
                src={watch('user.profilePictureURL')}
                className="absolute inset-0 h-full w-full object-cover"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = appPath('/logo.svg')
                }}
              />
            </div>
          )}
          Nama: {watch('user.name')}
          <br />
          No. HP/WA: {watch('user.phoneNumber')}
          <br />
          <Link to="/user" className="cursor-pointer text-blue-500">
            Ubah Profil
          </Link>
        </div>
        <div className="lg:hidden">
          <BottomStickyButton
            type="submit"
            disabled={isSubmitting || isErrorExist}
          >
            Simpan
          </BottomStickyButton>
        </div>
      </form>
      {localStorage.getItem('optional-agreement') === 'true' && (
        <ConfirmationDialog
          title={confirmTitle}
          subtitle={confirmSubtitle}
          buttonText="Ya, saya yakin"
          isOpen={isDialogOpen}
          setIsOpen={handleCancel}
          onConfirm={handleConfirmation}
        />
      )}
    </>
  )
}

export default EditListing
