import React from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'

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
        <div className="mx-6 mb-6 text-center">
          <h2 className="text-2xl text-slate-900">Yakin akan hapus {title}?</h2>
          <p className="my-4 font-normal text-slate-500">
            Saat ada yang bertanya soal properti ini, Anda akan lebih sulit
            mencarinya.
          </p>
          <div className="flex justify-evenly space-x-2">
            <button
              className="inline-block w-1/2 grow items-stretch justify-center whitespace-nowrap rounded-lg border border-solid border-[color:var(--Blue-Ribbon-500,#2A91FF)] bg-white px-1 py-2.5 text-center text-sm leading-5 text-blue-500"
              onClick={handleCancel}
            >
              Tidak, batalkan
            </button>
            <button
              className="inline-block w-1/2 grow items-stretch justify-center whitespace-nowrap rounded-lg border border-solid border-transparent bg-red-50 px-11 py-2.5 text-center text-sm leading-5 text-red-500"
              onClick={handleConfirm}
            >
              Ya, hapus
            </button>
          </div>
        </div>
      </>
    </BottomSheet>
  )
}

export default ConfirmationDialog
