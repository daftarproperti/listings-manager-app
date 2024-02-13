import React from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'

const AlertDialog = ({
  isOpen,
  setIsOpen,
  message,
  onConfirm,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  onConfirm: () => void
}) => {
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      close={handleClose}
      classNames={{
        draggable:
          '!w-full !max-w-lg !mx-auto rounded-t-xl border border-slate-400',
      }}
    >
      <div className="mx-6 mb-6 text-center">
        <p className="my-4 font-normal text-slate-500">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleConfirm}
          >
            Tutup
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}

export default AlertDialog
