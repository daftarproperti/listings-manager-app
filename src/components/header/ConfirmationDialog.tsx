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
          '!w-full !max-w-lg !mx-auto rounded-t-xl border border-slate-400',
      }}
    >
      <>
        <div id="sheet-overlay" className="w-full cursor-pointer pt-3">
          <div className="mx-auto h-1 w-12 rounded-full bg-slate-300" />
        </div>
        <div className="p-4 pb-8">
          <h2 className="text-2xl text-slate-900">Yakin akan hapus {title}?</h2>
          <p className="my-4 font-normal text-slate-500">
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
      </>
    </BottomSheet>
  )
}

export default ConfirmationDialog
