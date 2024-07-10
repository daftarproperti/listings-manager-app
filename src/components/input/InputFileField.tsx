import { CancelIconSVG } from 'assets/icons'
import React, { useEffect, useRef, useState } from 'react'
import type {
  FieldError,
  Merge,
  UseFormClearErrors,
  UseFormRegisterReturn,
  UseFormSetError,
} from 'react-hook-form'
import { getMobileOperatingSystem, useImageHandler } from 'utils'
import AlertDialog from 'components/AlertDialog'
import { Button } from '@material-tailwind/react'
import WebApp from '@twa-dev/sdk'
import { CameraIcon } from '@heroicons/react/24/solid'
import type { ExtendedListing } from 'pages/listings/edit/editListing'

type InputFileProps = {
  label: string
  additionalLabel?: string
  registerHook: UseFormRegisterReturn<string>
  dataListing?: { pictureUrls?: string[] }
  onNewFiles: (newFiles: File[]) => void
  onExistingImagesChange: (existingImages: string[]) => void
  errorFieldName?: Merge<FieldError, (FieldError | undefined)[]>
  setError?: UseFormSetError<ExtendedListing>
  clearErrors?: UseFormClearErrors<ExtendedListing>
}

const InputFileField: React.FC<InputFileProps> = ({
  label,
  additionalLabel,
  registerHook,
  dataListing,
  onNewFiles,
  onExistingImagesChange,
  errorFieldName,
  setError,
  clearErrors,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [alertMessage, setAlertMessage] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const triggerAlert = (message: string) => {
    setAlertMessage(message)
    setIsAlertOpen(true)
  }

  const {
    selectedImages,
    existingImages,
    newImageFiles,
    handleImageChange,
    removeImage,
  } = useImageHandler(dataListing, triggerAlert)

  useEffect(() => {
    onNewFiles(newImageFiles)
  }, [newImageFiles])

  useEffect(() => {
    onExistingImagesChange(existingImages)
  }, [existingImages])

  useEffect(() => {
    if (
      !!dataListing?.pictureUrls?.length &&
      existingImages.length === 0 &&
      newImageFiles.length === 0
    ) {
      setError &&
        setError('pictureUrls', {
          message: 'Harus memiliki minimal 1 gambar',
          type: 'manual',
        })
    } else {
      clearErrors && clearErrors('pictureUrls')
    }
  }, [
    dataListing?.pictureUrls?.length,
    existingImages.length,
    newImageFiles.length,
  ])

  return (
    <div className="w-auto">
      <div className="mb-1 text-lg font-semibold leading-7 text-gray-800">
        {label}
      </div>
      {additionalLabel && (
        <div className="mb-4 text-sm text-gray-500">{additionalLabel}</div>
      )}
      <div className="mb-4 flex flex-col">
        <input
          id="image-upload"
          type="file"
          multiple={
            getMobileOperatingSystem() === 'Android' ? !WebApp.initData : true
          }
          {...registerHook}
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
        {existingImages.length > 0 || selectedImages.length > 0 ? (
          <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-3">
            {existingImages.map((url, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={url}
                  alt={`Existing Image ${index}`}
                  className="h-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, true)}
                  className="absolute right-0 top-0 rounded-full p-1 text-white"
                >
                  <CancelIconSVG />
                </button>
              </div>
            ))}
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="h-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, false)}
                  className="absolute right-0 top-0 rounded-full p-1 text-white"
                >
                  <CancelIconSVG />
                </button>
              </div>
            ))}
            <div className="w-fit">
              <Button
                size="sm"
                color="blue"
                variant="outlined"
                className="flex items-center gap-1.5 bg-white text-sm font-normal capitalize"
                onClick={() => fileInputRef.current?.click()}
              >
                Tambah Upload Foto
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex h-32 w-full cursor-pointer items-center justify-center border-2 border-dashed border-slate-500 bg-slate-200"
            >
              <CameraIcon className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorFieldName?.message}
        </span>
      )}
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={alertMessage}
        onConfirm={() => setIsAlertOpen(false)}
      />
    </div>
  )
}

export default InputFileField
