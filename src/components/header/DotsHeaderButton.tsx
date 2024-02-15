import { MoreIconSVG, TrashIconSVG } from 'assets/icons'
import React, { useState } from 'react'

import ConfirmationDialog from './ConfirmationDialog'
import useHandleDelete from './useHandleDelete'

interface DotsButtonProps {
  propertyId?: string
}

const DotsHeaderButton: React.FC<DotsButtonProps> = ({ propertyId }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const {
    isDialogOpen,
    handleDeleteInitiation,
    handleDeleteConfirmation,
    handleDeleteCancellation,
  } = useHandleDelete(propertyId || 'defaultId')
  const initiateDelete = () => {
    handleDeleteInitiation()
    setShowDropdown(false)
  }

  return (
    <>
      <>
        <button
          className="h-5 w-5 cursor-pointer"
          onClick={() => {
            setShowDropdown(!showDropdown)
          }}
        >
          <MoreIconSVG />
        </button>
        {showDropdown && (
          <div className="absolute right-4 top-0 z-10 mt-14 w-36 rounded-md bg-white py-1 shadow-lg">
            <button
              className="inline-flex w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={initiateDelete}
            >
              <TrashIconSVG />
              <span className="ml-2 text-lg">Hapus</span>
            </button>
          </div>
        )}
      </>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        setIsOpen={handleDeleteCancellation}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  )
}

export default DotsHeaderButton
