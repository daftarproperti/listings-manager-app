import { useDeleteProperty } from 'api/queries'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const useHandleDelete = (propertyId: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const deleteProperty = useDeleteProperty()
  const navigate = useNavigate()

  const handleDeleteInitiation = () => {
    setIsDialogOpen(true)
  }

  const handleDeleteConfirmation = () => {
    setIsDialogOpen(false)
    deleteProperty.mutate(
      { id: propertyId },
      {
        onSuccess: () => {
          navigate(`/`, { state: { updateSuccess: true } })
          toast('Data Berhasil Dihapus', { type: 'success' })
        },
        onError: (error) => {
          toast(`Failed to delete property ${error}`, { type: 'error' })
        },
      },
    )
  }

  const handleDeleteCancellation = () => {
    setIsDialogOpen(false)
  }

  return {
    isDialogOpen,
    handleDeleteInitiation,
    handleDeleteConfirmation,
    handleDeleteCancellation,
  }
}

export default useHandleDelete
