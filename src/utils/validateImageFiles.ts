import { toast } from 'react-toastify'

const MAX_FILE_SIZE = 10485760 // 10MB
const MAX_FILE_SIZE_MB = (MAX_FILE_SIZE / 1048576).toFixed()
export const validateImageFiles = (files: FileList | File[]) => {
  const validFiles: File[] = []
  Array.from(files).map((file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast(
        `File "${file.name}" gagal ditambahkan. Ukuran gambar harus kurang dari ${MAX_FILE_SIZE_MB} MB`,
        {
          type: 'error',
        },
      )
      return
    } else {
      validFiles.push(file)
    }
  })
  return validFiles
}
