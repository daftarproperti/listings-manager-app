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

import { SortableList } from './components/Sortable'
import type { CombinedImage } from './types'

type InputFileProps = {
  label: string
  additionalLabel?: string
  registerHook: UseFormRegisterReturn<string>
  dataListing?: { pictureUrls?: string[] }
  errorFieldName?: Merge<FieldError, (FieldError | undefined)[]>
  setError?: UseFormSetError<ExtendedListing>
  clearErrors?: UseFormClearErrors<ExtendedListing>
  combinedImages: CombinedImage[] | undefined
  setCombinedImages: React.Dispatch<
    React.SetStateAction<CombinedImage[] | undefined>
  >
  onImageExistChange: (noExist: boolean) => void
}

const InputFileField: React.FC<InputFileProps> = ({
  label,
  additionalLabel,
  registerHook,
  dataListing,
  errorFieldName,
  setError,
  clearErrors,
  combinedImages,
  setCombinedImages,
  onImageExistChange,
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
    newlyAddedImages,
    handleImageChange,
    removeImage,
  } = useImageHandler(dataListing, triggerAlert)

  useEffect(() => {
    setCombinedImages(
      combinedImages?.length && newlyAddedImages?.length
        ? [
            ...combinedImages,
            ...newlyAddedImages.map((image, index) => ({
              id: index + combinedImages.length + 1,
              url: image.url,
              isExistingImage: false,
              file: image.file,
            })),
          ]
        : [
            ...existingImages.map(
              (image, index) =>
                ({
                  id: index + 1,
                  url: image,
                  isExistingImage: true,
                }) as CombinedImage,
            ),
            ...newImageFiles.map((image, index) => ({
              id: index + existingImages.length + 1,
              url: URL.createObjectURL(image),
              isExistingImage: false,
              file: image,
            })),
          ],
    )
  }, [existingImages, newImageFiles, newlyAddedImages])

  useEffect(() => {
    const noExist =
      (!!dataListing?.pictureUrls?.length && existingImages.length === 0) ||
      newImageFiles?.length === 0
    if (noExist) {
      setError &&
        setError('pictureUrls', {
          message: 'Foto Properti harus berisi minimal 1 gambar',
          type: 'manual',
        })
    } else {
      clearErrors && clearErrors('pictureUrls')
    }
    onImageExistChange(noExist)
  }, [
    dataListing?.pictureUrls?.length,
    existingImages.length,
    newImageFiles?.length,
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
          <>
            {!!combinedImages?.length && (
              <SortableList
                items={combinedImages}
                setItems={setCombinedImages}
                className="mr-auto grid grid-cols-2 gap-4 md:grid-cols-3"
                renderItem={(item) => (
                  <SortableList.Item
                    id={item.id}
                    className="relative flex h-40 w-40 justify-center rounded-sm bg-white p-2 shadow-md"
                  >
                    <div key={item.id}>
                      <img
                        src={item.url}
                        alt={`Preview ${item.id}`}
                        className="h-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeImage(item.url, item.isExistingImage)
                        }
                        className="absolute right-0 top-0 rounded-full p-1 text-white"
                      >
                        <CancelIconSVG />
                      </button>
                    </div>
                  </SortableList.Item>
                )}
              />
            )}
            <div className="w-fit">
              <Button
                size="sm"
                color="blue"
                variant="outlined"
                className="mt-4 flex items-center gap-1.5 bg-white text-sm font-normal capitalize"
                onClick={() => fileInputRef.current?.click()}
              >
                Tambah Upload Foto
              </Button>
            </div>
          </>
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
