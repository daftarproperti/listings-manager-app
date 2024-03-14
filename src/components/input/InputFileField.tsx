import { CancelIconSVG } from 'assets/icons'
import React, { useEffect, useState } from 'react'
import type { FieldError, Merge, UseFormRegisterReturn } from 'react-hook-form'
import { useImageHandler } from 'utils'
import AlertDialog from 'components/AlertDialog'

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
    <div>
      <div className="text-lg font-semibold leading-7 text-gray-800">Foto</div>
      <div className="mb-4 flex flex-col">
        <input
          id="image-upload"
          type="file"
          multiple
          {...registerHook}
          onChange={handleImageChange}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
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
        <label htmlFor="image-upload" className="cursor-pointer">
          <span className="mt-2 inline-block items-stretch justify-center whitespace-nowrap rounded-lg border border-solid border-[color:var(--Blue-Ribbon-500,#2A91FF)] bg-white px-4 py-2 text-center text-sm leading-5 text-blue-500">
            Upload foto
          </span>
        </label>
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
