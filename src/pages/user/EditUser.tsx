import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'
import { type UpdateProfileRequest } from 'api/types'
import { useGetUserProfile, useUpdateUserProfile } from 'api/queries'
import { useNavigate } from 'react-router-dom'
import { ClipboardIcon } from '@heroicons/react/24/solid'
import InputField from 'components/input/InputField'
import SelectField from 'components/input/SelectField'
import TextareaField from 'components/input/TextareaField'
import InputSingleFileField from 'components/input/InputSingleFileField'
import BottomStickyButton from 'components/button/BottomStickyButton'
import InputCheckboxField from 'components/input/InputCheckboxField'
import { toast } from 'react-toastify'
import { Button } from '@material-tailwind/react'
import { dpPath } from 'utils'

import { onSubmit } from './handleUserForm'

function EditUser() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm<UpdateProfileRequest>()
  const { data: userDetails, isLoading } = useGetUserProfile()
  const { mutate } = useUpdateUserProfile()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const picture = watch('picture')

  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const handleNewFile = (file: File | null) => {
    setNewImageFile(file)
  }

  useEffect(() => {
    if (userDetails) {
      reset(userDetails)
    }
  }, [userDetails, reset])

  const handleCopyText = () => {
    const inputElement = document.getElementById(
      'publicUrlInput',
    ) as HTMLInputElement | null

    if (inputElement && navigator.clipboard) {
      navigator.clipboard
        .writeText(inputElement.value)
        .then(() => {
          toast(`Successfully copied to clipboard`, { type: 'info' })
        })
        .catch(() => {
          toast(`Failed to copy to clipboard`, { type: 'error' })
        })
    }
  }

  const handleInputClick = () => {
    const inputElement = document.getElementById(
      'publicUrlInput',
    ) as HTMLInputElement | null

    if (inputElement) {
      inputElement.select()
    }
  }

  const phoneNumberPattern = /^(\+[1-9]\d{1,14}|0\d{5,14})$/

  return (
    <div>
      <form
        className="w-full bg-slate-100 pb-20 pt-16 lg:pb-4 lg:pt-0"
        onSubmit={handleSubmit((formData) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { picture, ...otherData } = formData
          onSubmit(otherData, mutate, navigate, setIsSubmitting, newImageFile)
        })}
      >
        <div className="items-start justify-center whitespace-nowrap border-b border-solid border-slate-200 bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500 lg:hidden">
          Lengkapi data dibawah ini
        </div>
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
            label="Foto profil"
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
            registerHook={register('company')}
            placeholderValue="Tulis Nama Perusahaan Anda"
          />
          <InputField
            label="Nomor HP"
            registerHook={register('phoneNumber', {
              required: 'Nomor HP harus diisi',
              pattern: {
                value: phoneNumberPattern,
                message: 'Format Nomor HP Anda salah',
              },
            })}
            placeholderValue="Isi dengan awalan 0 atau +"
            errorFieldName={errors.phoneNumber}
          />
          <SelectField
            label="Daerah Operasi"
            registerHook={register('city', { required: true })}
            selectOptions={LISTING_OPTIONS.cities.options}
            defaultOption="Pilih Kota"
            errorFieldName={errors.city}
            errorMessage="Kota harus diisi"
          />
          <TextareaField
            label="Deskripsi"
            registerHook={register('description')}
            placeholderValue="Tulis deskripsi tentang Anda di sini"
            errorFieldName={errors.description}
          />
          <div className="mb-5">
            <InputCheckboxField
              label="Profil Publik"
              registerHook={register('isPublicProfile')}
              inputID="isPrivate"
              showTooltip
              tooltipContent="Dapatkan halaman web profile yang dapat dikunjungi oleh publik."
            />
            {watch('isPublicProfile') ? (
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="publicUrlInput"
                  onClick={handleInputClick}
                  type="text"
                  value={dpPath(
                    `/public/agents/${userDetails?.publicId || ''}`,
                  )}
                  readOnly
                  className="w-full items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-gray-100 px-2 py-1 text-sm leading-7 text-gray-800"
                />
                <Button
                  size="sm"
                  color="blue"
                  className="h-full text-center"
                  onClick={handleCopyText}
                >
                  <ClipboardIcon className="h-5 w-5" />
                </Button>
              </div>
            ) : null}
          </div>
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
