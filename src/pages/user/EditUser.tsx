import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { PROPERTY_OPTIONS } from 'pages/edit/dummy'
import { type UpdateProfileRequest } from 'api/types'
import { useGetUserProfile, useUpdateUserProfile } from 'api/queries'
import { useNavigate } from 'react-router-dom'
import InputField from 'components/input/InputField'
import SelectField from 'components/input/SelectField'
import TextareaField from 'components/input/TextareaField'
import InputSingleFileField from 'components/input/InputSingleFileField'
import BottomStickyButton from 'components/button/BottomStickyButton'

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

  return (
    <div>
      <form
        className="mx-auto max-w-lg"
        onSubmit={handleSubmit((formData) => {
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
            selectOptions={PROPERTY_OPTIONS.cities.options}
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
        </div>
        <BottomStickyButton type="submit" disabled={isSubmitting || isLoading}>
          Simpan
        </BottomStickyButton>
      </form>
    </div>
  )
}

export default EditUser
