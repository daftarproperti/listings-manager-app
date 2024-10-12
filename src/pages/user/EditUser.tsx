import { useState, useEffect, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { type UpdateProfileRequest, type CityOption } from 'api/types'
import {
  useGetUserProfile,
  useUpdateUserProfile,
  getDebouncedCities,
  useGenerateSecretKey,
  useDeleteSecretKey,
} from 'api/queries'
import { useNavigate } from 'react-router-dom'
import InputField from 'components/input/InputField'
import CustomSelectField from 'components/input/CustomSelectField'
import InputSingleFileField from 'components/input/InputSingleFileField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import ConfirmDialog from 'components/ConfirmDialog'
import { Button, IconButton } from '@material-tailwind/react'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import QRCode from 'react-qr-code'

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
  const { data: userDetails, isLoading, isPending } = useGetUserProfile()
  const { mutate } = useUpdateUserProfile()
  const { mutate: deleteSecretKey } = useDeleteSecretKey()
  const { mutate: generateSecretKey, data: user } = useGenerateSecretKey()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const showSecretKey = searchParams.get('withSecretKey') === 'true'
  const [isSecretKeyVisible, setIsSecretKeyVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null)
  const picture = watch('picture')
  const phoneNumber = userDetails?.phoneNumber

  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const handleNewFile = (file: File | null) => {
    setNewImageFile(file)
  }

  const [shouldReset, setShouldReset] = useState(true)

  console.log('selected city', selectedCity)

  useEffect(() => {
    if (userDetails && shouldReset) {
      const safeUserDetails = {
        name: userDetails.name || '',
        company: userDetails.company || '',
        phoneNumber: userDetails.phoneNumber || '',
        cityId: userDetails.cityId || 0,
        secretKey: userDetails.secretKey || '',
      }
      reset(safeUserDetails)
    }
  }, [userDetails, reset, shouldReset])

  // TODO: This is glitchy. Find an alternative to sync city name with city ID.
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
    if (!user?.secretKey) return
    setValue('secretKey', user?.secretKey)
  }, [user])

  const handleCityChange = (cityOption: SetStateAction<CityOption | null>) => {
    setSelectedCity(cityOption)
    setShouldReset(false)
  }

  const handleDeleteSecretKey = () => {
    setValue('secretKey', '')
    deleteSecretKey()
    handleDialog()
  }

  const handleDialog = () => {
    setIsDialogOpen((prev) => !prev)
  }

  const phoneNumberPattern = /^(\+[1-9]\d{1,14}|0\d{5,14})$/

  return isPending ? (
    <div>loading</div>
  ) : (
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
            additionalLabel={`(User ID: ${userDetails?.userIdStr})`}
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
            defaultOptions={[]}
            defaultValue={selectedCity ?? undefined}
            onCityChange={handleCityChange}
            required={false}
          />
          {showSecretKey && (
            <div>
              {isSecretKeyVisible ? (
                <>
                  <InputField
                    disabled
                    label="Kode Secret"
                    placeholderValue="Klik button untuk generate"
                    registerHook={register('secretKey')}
                    rightContent={
                      !watch('secretKey') ? (
                        <Button
                          variant="outlined"
                          className="bg-white"
                          onClick={() => generateSecretKey()}
                        >
                          Generate Secret Key
                        </Button>
                      ) : (
                        <IconButton
                          variant="text"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              watch('secretKey') as string,
                            )
                          }
                        >
                          <DocumentDuplicateIcon className="h-5 w-5" />
                        </IconButton>
                      )
                    }
                    additionalLabel={
                      watch('secretKey') ? (
                        <button
                          className="text-sm text-red-500"
                          onClick={(e) => {
                            e.preventDefault()
                            handleDialog()
                          }}
                        >
                          * Hapus Kode Secret
                        </button>
                      ) : null
                    }
                  />
                  {watch('secretKey') && (
                    <div className="mt-4 inline-block border border-solid border-slate-300 p-4">
                      <QRCode
                        value={`otpauth://totp/DaftarProperti:${phoneNumber}?secret=${watch(
                          'secretKey',
                        )}`}
                        size={128}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="py-4">
                  Anda bisa menggunakan kode rahasia untuk memudahkan Anda
                  mengelola akun Anda. <br /> Jika Anda ingin menggunakan Kode
                  Secret, silahkan klik{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsSecretKeyVisible(true)
                    }}
                    className="text-blue-500"
                  >
                    link berikut
                  </a>
                  .
                </div>
              )}
            </div>
          )}
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
      <ConfirmDialog
        confirmDelete
        open={isDialogOpen}
        cancelLabel="Batal"
        confirmLabel="Hapus"
        title="Hapus Kode Secret"
        body="Apakah Anda yakin ingin menghapus kode secret?"
        handleOpen={handleDialog}
        handleCancel={handleDialog}
        handleConfirm={handleDeleteSecretKey}
      />
    </div>
  )
}

export default EditUser
