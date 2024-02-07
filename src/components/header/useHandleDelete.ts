import { useState } from 'react'
import { useDeleteProperty } from 'api/queries'
import { useNavigate } from 'react-router-dom'

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
        },
        onError: (error) => {
          console.error('Failed to delete property', error)
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
