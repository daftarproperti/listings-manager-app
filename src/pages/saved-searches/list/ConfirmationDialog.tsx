import React from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import { Button } from '@material-tailwind/react'

const ConfirmationDialog = ({
  title,
  isOpen,
  setIsOpen,
  onConfirm,
  onCancel,
}: {
  title?: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onConfirm: () => void
  onCancel: () => void
}) => {
  const handleCancel = () => {
    onCancel()
    setIsOpen(false)
  }
  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      close={handleCancel}
      classNames={{
        draggable:
          '!w-full !max-w-lg !mx-auto rounded-t-xl border border-slate-400',
      }}
    >
      <>
        <div id="sheet-overlay" className="w-full cursor-pointer pt-3">
          <div className="mx-auto h-1 w-12 rounded-full bg-slate-300" />
        </div>
        <div className="p-4 pb-8">
          <h2 className="mb-6 text-xl text-slate-900">
            Yakin akan hapus Permintaan: {title}?
          </h2>
          <div className="flex gap-x-2">
            <Button
              fullWidth
              color="blue"
              variant="outlined"
              className="text-sm font-normal capitalize"
              onClick={handleCancel}
            >
              Tidak, batalkan
            </Button>
            <Button
              fullWidth
              color="red"
              variant="outlined"
              className="border-red-100 bg-red-100 text-sm font-normal capitalize"
              onClick={handleConfirm}
            >
              Ya, hapus
            </Button>
          </div>
        </div>
      </>
    </BottomSheet>
  )
}

export default ConfirmationDialog
