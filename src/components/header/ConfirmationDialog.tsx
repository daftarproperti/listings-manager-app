import React from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import { Button } from '@material-tailwind/react'

const ConfirmationDialog = ({
  isOpen,
  setIsOpen,
  onConfirm,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onConfirm: () => void
}) => {
  const title = document.querySelector('h1')?.textContent
  const handleCancel = () => {
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
          '!w-full lg:!max-w-lg lg:!mx-auto rounded-t-xl border border-slate-400',
      }}
    >
      <div className="space-y-4 px-4 pb-4 lg:px-6 lg:py-4">
        <h2 className="text-2xl">Yakin akan hapus {title}?</h2>
        <p className="font-normal text-slate-500">
          Setelah terhapus, listing tidak bisa ditemukan di jaringan Daftar
          Properti.
        </p>
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
    </BottomSheet>
  )
}

export default ConfirmationDialog
