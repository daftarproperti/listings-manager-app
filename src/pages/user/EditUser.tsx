import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'
import { type UpdateProfileRequest } from 'api/types'
import { useGetUserProfile, useUpdateUserProfile } from 'api/queries'
import { useNavigate } from 'react-router-dom'
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
  const viteBaseURL = import.meta.env.VITE_BASE_URL.replace('/api/tele-app', '')

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
              label="Public URL"
              registerHook={register('isPublicProfile')}
              inputID="isPrivate"
              showTooltip
              tooltipContent="Generates a shareable URL containing your profile and listings. URL will be usable after the changes is saved"
            />
            {watch('isPublicProfile') ? (
              <div className="mt-2 flex items-center">
                <input
                  id="publicUrlInput"
                  type="text"
                  value={`${viteBaseURL}/public/agent/${
                    userDetails?.publicId || ''
                  }`}
                  readOnly
                  className="mr-2 border-none bg-slate-50 p-2"
                />
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Copy
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
