import { CancelIconSVG } from 'assets/icons'
import React, { useEffect, useRef, useState } from 'react'
import type { FieldError, Merge, UseFormRegisterReturn } from 'react-hook-form'
import { getMobileOperatingSystem, useImageHandler } from 'utils'
import AlertDialog from 'components/AlertDialog'
import { Button } from '@material-tailwind/react'
import WebApp from '@twa-dev/sdk'

type InputFileProps = {
  registerHook: UseFormRegisterReturn<string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataListing: any
  onNewFiles: (newFiles: File[]) => void
  onExistingImagesChange: (existingImages: string[]) => void
  errorFieldName?: Merge<FieldError, (FieldError | undefined)[]>
}

const InputFileField: React.FC<InputFileProps> = ({
  registerHook,
  dataListing,
  onNewFiles,
  onExistingImagesChange,
  errorFieldName,
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
  }, [newImageFiles, onNewFiles])

  useEffect(() => {
    onExistingImagesChange(existingImages)
  }, [existingImages, onExistingImagesChange])

  return (
    <div className="ml-1">
      <div className="mb-1 text-lg font-semibold leading-7 text-gray-800">
        Foto
      </div>
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
        {(existingImages.length > 0 || selectedImages.length > 0) && (
          <div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
            {existingImages.map((url, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={url}
                  alt={`Existing Image ${index}`}
                  className="rounded-lg object-cover"
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
                  className="rounded-lg object-cover"
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
          </div>
        )}
        <div className="w-fit">
          <Button
            size="sm"
            color="blue"
            variant="outlined"
            className="flex items-center gap-1.5 bg-white text-sm font-normal capitalize"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Foto
          </Button>
        </div>
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
