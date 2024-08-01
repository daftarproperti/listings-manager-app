import { useState, useEffect, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { type UpdateProfileRequest, type CityOption } from 'api/types'
import {
  useGetUserProfile,
  useUpdateUserProfile,
  getDebouncedCities,
  fetchDefaultCities,
} from 'api/queries'
import { useNavigate } from 'react-router-dom'
import InputField from 'components/input/InputField'
import CustomSelectField from 'components/input/CustomSelectField'
import InputSingleFileField from 'components/input/InputSingleFileField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { Button } from '@material-tailwind/react'

import { onSubmit } from './handleUserForm'

function EditUser() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm<UpdateProfileRequest>()
  const { data: userDetails, isLoading } = useGetUserProfile()
  const { mutate } = useUpdateUserProfile()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const picture = watch('picture')

  const [defaultCityOptions, setDefaultCityOptions] = useState<CityOption[]>([])
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null)
  const cityId = watch('cityId')
  const cityName = watch('cityName')
  const phoneNumber = userDetails?.phoneNumber

  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const handleNewFile = (file: File | null) => {
    setNewImageFile(file)
  }

  const [shouldReset, setShouldReset] = useState(true)

  useEffect(() => {
    if (userDetails && shouldReset) {
      const safeUserDetails = {
        name: userDetails.name || '',
        company: userDetails.company || '',
        phoneNumber: userDetails.phoneNumber || '',
        cityId: userDetails.cityId || 0,
      }
      reset(safeUserDetails)
    }
  }, [userDetails, reset, shouldReset])

  useEffect(() => {
    if (userDetails?.cityId && !selectedCity) {
      const defaultCity = {
        label: userDetails.cityName,
        value: userDetails.cityId,
      }
      setSelectedCity((defaultCity as CityOption) || null)
      setValue('cityId', defaultCity.value)
    }
  }, [userDetails, selectedCity])

  useEffect(() => {
    fetchDefaultCities().then((cities) => {
      const cityOptions = cities.map((city) => ({
        label: city.name || 'Unknown city',
        value: city.id || 0,
      }))
      setDefaultCityOptions(cityOptions)

      if (cityId && cityName && typeof cityName === 'string' && shouldReset) {
        const initialCity = cityOptions.find(
          (option) => option.value === cityId,
        ) || {
          label: cityName,
          value: cityId,
        }
        setSelectedCity(initialCity as CityOption)
      }
    })
  }, [cityId, cityName, setValue])

  const handleCityChange = (cityOption: SetStateAction<CityOption | null>) => {
    setSelectedCity(cityOption)
    setShouldReset(false)
  }

  const phoneNumberPattern = /^(\+[1-9]\d{1,14}|0\d{5,14})$/

  return (
    <div className="min-h-screen">
      <form
        className="w-full bg-slate-100 pb-20 pt-16 lg:pb-4 lg:pt-0"
        onSubmit={handleSubmit((formData) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { picture, ...otherData } = formData
          onSubmit(otherData, mutate, navigate, setIsSubmitting, newImageFile)
        })}
      >
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
          <div className="text-xl font-semibold">Informasi Profil Saya</div>
          <Button
            size="sm"
            color="blue"
            type="submit"
            className="flex items-center gap-2 text-sm font-normal capitalize"
            disabled={isSubmitting || isLoading}
          >
            Simpan Perubahan
          </Button>
        </div>
        <div className="p-4 lg:w-4/5">
          <InputSingleFileField
            label="Foto Profil"
            registerHook={register('picture')}
            existingImageUrl={picture}
            onImageUpload={handleNewFile}
          />
          <InputField
            label="Nama"
            registerHook={register('name', { required: true })}
            placeholderValue="Tulis Nama Anda"
            errorFieldName={errors.name}
            errorMessage="Nama Anda harus diisi"
          />
          <InputField
            label="Perusahaan"
            additionalLabel="(Jika Agen/Broker Profesional)"
            registerHook={register('company')}
            placeholderValue="Tulis Nama Perusahaan Anda"
          />
          <InputField
            label="Nomor HP"
            additionalLabel={`(User ID: ${userDetails?.userId})`}
            registerHook={register('phoneNumber', {
              required: 'Nomor HP harus diisi',
              pattern: {
                value: phoneNumberPattern,
                message: 'Format Nomor HP Anda salah',
              },
            })}
            placeholderValue="Isi dengan awalan 0 atau +"
            errorFieldName={errors.phoneNumber}
            disabled={phoneNumber !== '' && phoneNumber !== undefined}
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
            required={false}
          />
        </div>
        <div className="lg:hidden">
          <BottomStickyButton
            type="submit"
            disabled={isSubmitting || isLoading}
          >
            Simpan
          </BottomStickyButton>
        </div>
      </form>
    </div>
  )
}

export default EditUser
