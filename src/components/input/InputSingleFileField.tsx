import { Button } from '@material-tailwind/react'
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
    </div>
  )
}

export default InputSingleFileField
