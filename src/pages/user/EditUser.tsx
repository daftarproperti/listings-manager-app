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
  const dpHome = import.meta.env.VITE_DP_HOME

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

  return (
    <div>
      <form
        className="mx-auto max-w-lg"
        onSubmit={handleSubmit((formData) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { picture, ...otherData } = formData
          onSubmit(otherData, mutate, navigate, setIsSubmitting, newImageFile)
        })}
      >
        <div className="items-start justify-center whitespace-nowrap border-b border-solid border-b-[color:var(--slate-200,#E2E8F0)] bg-slate-50 py-3 pl-4 pr-16 text-sm font-semibold leading-5 text-slate-500">
          Lengkapi data dibawah ini
        </div>
        <div className="mb-10 bg-slate-50 p-4">
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
            registerHook={register('phoneNumber')}
            placeholderValue="Isi dengan awalan 0"
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
          <InputSingleFileField
            registerHook={register('picture')}
            existingImageUrl={picture}
            onImageUpload={handleNewFile}
          />
          <div className="mb-10">
            <InputCheckboxField
              label="Profile Publik"
              registerHook={register('isPublicProfile')}
              inputID="isPrivate"
              showTooltip
              tooltipContent="Dapatkan halaman web profile yang dapat dikunjungi oleh publik."
            />
            {watch('isPublicProfile') ? (
              <div className="mt-2 flex items-center space-x-2">
                <input
                  id="publicUrlInput"
                  onClick={handleInputClick}
                  type="text"
                  value={`${dpHome}/public/agents/${
                    userDetails?.publicId || ''
                  }`}
                  readOnly
                  className="mt-1 w-full items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-gray-100 px-2 py-1 text-sm leading-7 text-gray-800"
                />
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="mt-1 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <BottomStickyButton type="submit" disabled={isSubmitting || isLoading}>
          Simpan
        </BottomStickyButton>
      </form>
    </div>
  )
}

export default EditUser
