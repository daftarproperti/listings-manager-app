import { useDeleteListing } from 'api/queries'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const useHandleDelete = (listingId: string) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const deleteListing = useDeleteListing()
  const navigate = useNavigate()

  const handleDeleteInitiation = () => {
    setIsDialogOpen(true)
  }

  const handleDeleteConfirmation = () => {
    setIsDialogOpen(false)
    deleteListing.mutate(
      { id: listingId },
      {
        onSuccess: () => {
          navigate(`/`)
          toast('Data Berhasil Dihapus', { type: 'success' })
        },
        onError: (error) => {
          toast(`Failed to delete listing ${error}`, { type: 'error' })
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
