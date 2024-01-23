import React, { useEffect } from 'react'
import { CancelIconSVG } from 'assets/icons'
import { useImageHandler } from 'utils'

type InputFileProps = {
  registerHook: any
  dataProperty: any
  onNewFiles: any
  onExistingImagesChange: any
}

const InputFileField: React.FC<InputFileProps> = ({
  registerHook,
  dataProperty,
  onNewFiles,
  onExistingImagesChange,
}) => {
  const {
    selectedImages,
    existingImages,
    newImageFiles,
    handleImageChange,
    removeImage,
  } = useImageHandler(dataProperty)

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
        />
        <div className="my-2 grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {existingImages.map((url, index) => (
            <div key={`existing-${index}`} className="relative w-32">
              <img
                src={url}
                alt={`Existing Image ${index}`}
                className="h-32 w-32 rounded-lg object-cover"
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
            <div key={index} className="relative w-32">
              <img
                src={image}
                alt={`Preview ${index}`}
                className="h-32 w-32 rounded-lg object-cover"
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
    </div>
  )
}

export default InputFileField
