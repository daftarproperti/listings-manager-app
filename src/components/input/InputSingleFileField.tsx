import React, { useState, useCallback, useRef, useEffect } from 'react'
import { type UseFormRegisterReturn } from 'react-hook-form'
import { validateImageFiles } from 'utils'

type InputSingleFileProps = {
  registerHook: UseFormRegisterReturn<string>
  existingImageUrl?: string
  onImageUpload?: (file: File) => void
}

const InputSingleFileField: React.FC<InputSingleFileProps> = ({
  registerHook,
  existingImageUrl,
  onImageUpload,
}) => {
  const [previewUrl, setPreviewUrl] = useState(
    existingImageUrl ? `${existingImageUrl}?t=${new Date().getTime()}` : '',
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (existingImageUrl) {
      setPreviewUrl(`${existingImageUrl}?t=${new Date().getTime()}`)
    }
  }, [existingImageUrl])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = validateImageFiles([e.target.files[0]])[0]
        const fileUrl = URL.createObjectURL(file)
        setPreviewUrl(fileUrl)

        if (onImageUpload) {
          onImageUpload(file)
        }

        return () => URL.revokeObjectURL(fileUrl)
      }
    },
    [onImageUpload],
  )

  return (
    <div>
      <div className="text-lg font-semibold leading-7 text-gray-800">Foto</div>
      <div className="mb-4 flex flex-col">
        <input
          id="image-upload"
          type="file"
          {...registerHook}
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {previewUrl && (
          <div className="relative my-2 w-36">
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-36 rounded-lg object-cover"
            />
          </div>
        )}
        <label htmlFor="image-upload" className="cursor-pointer">
          <span className="mt-2 inline-block items-stretch justify-center whitespace-nowrap rounded-lg border border-solid border-blue-500 bg-white px-4 py-2 text-center text-sm leading-5 text-blue-500">
            Upload foto
          </span>
        </label>
      </div>
    </div>
  )
}

export default InputSingleFileField
