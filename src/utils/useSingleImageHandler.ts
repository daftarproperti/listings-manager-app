import { useState, useEffect } from 'react'

export const useSingleImageHandler = (
  initialImageUrl: string = '',
  onNewFile: (file: File | null) => void,
) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(String(initialImageUrl))

  useEffect(() => {
    if (typeof initialImageUrl === 'string' && initialImageUrl) {
      setPreviewUrl(initialImageUrl)
    }

    return () => {
      if (
        previewUrl &&
        typeof previewUrl === 'string' &&
        typeof initialImageUrl === 'string' &&
        !initialImageUrl.includes(previewUrl)
      ) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [initialImageUrl, previewUrl])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      if (previewUrl && typeof previewUrl === 'string') {
        URL.revokeObjectURL(previewUrl)
      }
      const newPreviewUrl = URL.createObjectURL(file)
      setSelectedFile(file)
      setPreviewUrl(newPreviewUrl)
      onNewFile(file)
    }
  }

  return {
    selectedFile,
    previewUrl,
    handleImageChange,
  }
}
