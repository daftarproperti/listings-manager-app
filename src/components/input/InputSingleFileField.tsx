import { Button } from '@material-tailwind/react'
import { useState, useCallback, useRef, useEffect } from 'react'
import { CameraIcon } from '@heroicons/react/24/solid'
import { type UseFormRegisterReturn } from 'react-hook-form'
import { validateImageFiles } from 'utils'

type InputSingleFileProps = {
  label: string
  registerHook: UseFormRegisterReturn<string>
  existingImageUrl?: string
  onImageUpload?: (file: File) => void
}

const InputSingleFileField: React.FC<InputSingleFileProps> = ({
  label,
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
    <div className="space-y-2">
      <div className="text-lg font-semibold leading-7 text-gray-800">
        {label}
      </div>
      <div className="mb-4 flex items-center gap-4">
        <input
          id="image-upload"
          type="file"
          {...registerHook}
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-dashed border-slate-500 bg-slate-200"
          >
            <CameraIcon className="h-5 w-5" />
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
            {previewUrl ? 'Edit' : 'Upload'} Foto
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InputSingleFileField
