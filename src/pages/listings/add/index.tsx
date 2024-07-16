import { useState, useEffect, type SetStateAction, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Tooltip, Typography } from '@material-tailwind/react'
import {
  useAddListing,
  getDebouncedCities,
  fetchDefaultCities,
  useGetUserProfile,
} from 'api/queries'
import type {
  UpdateListingRequest as GeneratedListing,
  CityOption,
} from 'api/types'
import { dpPath } from 'utils'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { schema } from 'components/form/addEditSchema'
import IntuitiveCurrencyInputField from 'components/input/IntuitiveCurrencyInputField'
import InputField from 'components/input/InputField'
import InputFileField from 'components/input/InputFileField'
import SelectField from 'components/input/SelectField'
import CustomSelectField from 'components/input/CustomSelectField'
import TextareaField from 'components/input/TextareaField'
import InputCheckboxField from 'components/input/InputCheckboxField'
import transformListingObjectToFormData from 'components/input/transformObjectToFormdata'
import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import GoogleMaps from 'components/GoogleMaps'
import { DEFAULT_LAT_LNG } from 'utils/constant'
import ConfirmationDialog from 'components/header/ConfirmationDialog'
import type { CombinedImage } from 'components/input/types'

interface ExtendedListing extends GeneratedListing {
  bedroomCounts?: string
  bathroomCounts?: string
}

const AddPage = () => {
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [combinedImages, setCombinedImages] = useState<
    CombinedImage[] | undefined
  >()

  const checkboxSectionRef = useRef<HTMLDivElement | null>(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm<ExtendedListing>({
    defaultValues: {
      isPrivate: false,
      listingForSale: true,
      listingForRent: false,
      ownership: 'unknown',
      city: '',
    },
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useAddListing()

  const listingForSale = watch('listingForSale')
  const listingForRent = watch('listingForRent')
  const propertyType = watch('propertyType')

  const [defaultCityOptions, setDefaultCityOptions] = useState<CityOption[]>([])
  const { data: userProfile, isFetched } = useGetUserProfile()
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null)
  const [coord, setCoord] = useState<google.maps.LatLngLiteral>(DEFAULT_LAT_LNG)

  useEffect(() => {
    if (isFetched) {
      if (userProfile && userProfile.cityName && userProfile.cityId != null) {
        const defaultCity = {
          label: userProfile.cityName,
          value: userProfile.cityId,
        }
        setSelectedCity(defaultCity as CityOption)

        if (selectedCity) {
          setValue('cityId', selectedCity.value, { shouldValidate: true })
        }
      } else {
        setSelectedCity(null)
      }
    }
  }, [userProfile, isFetched])

  useEffect(() => {
    fetchDefaultCities().then((cities) => {
      const cityOptions = cities.map((city) => ({
        label: city.name || 'Unknown city',
        value: city.id || 0,
      }))
      setDefaultCityOptions(cityOptions)
    })
  }, [])

  useEffect(() => {
    if (selectedCity) {
      setValue('cityId', selectedCity.value, { shouldValidate: true })
    }
  }, [selectedCity])

  useEffect(() => {
    if (coord) {
      setValue('coordinate.latitude', coord.lat)
      setValue('coordinate.longitude', coord.lng)
    } else {
      setValue('coordinate', undefined)
    }
  }, [coord])

  useEffect(() => {
    if (errors.listingType && Object.keys(errors).length === 1) {
      checkboxSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [errors.listingType])

  const handleCityChange = (cityOption: SetStateAction<CityOption | null>) => {
    setSelectedCity(cityOption)
  }

  const confirmTitle = 'Apakah Anda yakin tidak menyetujui persetujuan imbalan?'
  const confirmSubtitle =
    'Jika Anda ingin listing Anda cepat terjual, Anda harus menyetujui persetujuan imbalan.'

  const handleConfirmation = async () => {
    setIsDialogOpen(false)
    const currentData = watch()
    await submitData(currentData)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  const onSubmit = async (data: GeneratedListing) => {
    if (import.meta.env.VITE_OPTIONAL_REWARD_AGREEMENT === 'true') {
      if (!data.withRewardAgreement) {
        setIsDialogOpen(true)
      } else {
        await submitData(data)
      }
    } else {
      await submitData(data)
    }
  }

  const submitData = async (data: GeneratedListing) => {
    const addNewListingPayload = await transformListingObjectToFormData({
      data,
      combinedImages,
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
    <>
      <form
        className="w-full bg-slate-50 pb-20 pt-16 lg:pb-4 lg:pt-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
          <div className="text-xl font-semibold">Tambah Properti</div>
          <Button
            size="sm"
            color="blue"
            type="submit"
            className="flex items-center gap-2 text-sm font-normal capitalize"
            disabled={isPending}
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
          Daftar Properti.
        </div>
        <div className="p-4 lg:w-4/5">
          <InputFileField
            label="Foto Properti"
            additionalLabel="Maksimal 10 foto, format .jpg, .png, @10mb"
            registerHook={register('pictureUrls')}
            errorFieldName={errors.pictureUrls}
            combinedImages={combinedImages}
            setCombinedImages={setCombinedImages}
          />
          <InputField
            label="Judul Listing"
            registerHook={register('title', { required: true })}
            placeholderValue="Tulis Judul"
            errorFieldName={errors.title}
            halfWidth={false}
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
            registerHook={register('propertyType', { required: true })}
            selectOptions={LISTING_OPTIONS.propertyType.options}
            defaultOption="Pilih Tipe Properti"
            errorFieldName={errors.propertyType}
          />
          <InputField
            label="Alamat"
            registerHook={register('address', { required: true })}
            placeholderValue="Isi alamat lengkap"
            errorFieldName={errors.address}
            additionalLabel="Pelajari lebih lanjut di "
            linkHref={dpPath('/peraturan')}
            linkText="sini"
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
          {listingForSale && (
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
                halfWidth={propertyType !== 'land'}
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
                halfWidth={propertyType !== 'apartment'}
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
                  type="number"
                />
                <InputField
                  halfWidth={true}
                  label="Kapasitas Mobil"
                  registerHook={register('carCount', { required: false })}
                  placeholderValue="Silahkan isi"
                  errorFieldName={errors.carCount}
                  type="number"
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
                  halfWidth
                  leftPosition
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
                  halfWidth
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

        <div className="lg:hidden">
          <BottomStickyButton type="submit" disabled={isPending}>
            Simpan
          </BottomStickyButton>
        </div>
      </form>
      {import.meta.env.VITE_OPTIONAL_REWARD_AGREEMENT === 'true' && (
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

export default AddPage
