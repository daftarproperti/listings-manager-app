import { type Dispatch, type SetStateAction } from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import { Link } from 'react-router-dom'

const ClosingDialog = ({
  isOpen: isFilterBottomSheetOpen,
  setIsOpen: setIsFilterBottomBarOpen,
  listingId,
  setMode,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setMode: Dispatch<SetStateAction<string>>
  listingId?: string
}) => {
  return (
    <BottomSheet
      isOpen={isFilterBottomSheetOpen}
      close={() => {
        setIsFilterBottomBarOpen(false)
        setMode('')
      }}
      classNames={{
        draggable:
          '!w-full !max-w-lg !mx-auto rounded-t-xl border border-slate-400',
      }}
    >
      <>
        <div data-no-drag className="mx-6 mb-6 text-gray-800">
          <div className="mb-4 border-b border-solid border-b-gray-200 pb-2">
            <Link
              to={`/listings/closing/${listingId}`}
              onClick={() => {
                setMode('closing')
                setIsFilterBottomBarOpen(false)
              }}
            >
              <h3 className="text-lg">Closing Listing</h3>
              <p className="text-sm font-light text-slate-500">
                Isi detail berikut ini jika listing Anda sudah laku terjual atau
                disewa melalui Anda.
              </p>
            </Link>
          </div>
          <div className="mb-4 border-b border-solid border-b-gray-200 pb-2">
            <Link
              to={`/listings/cancel/${listingId}`}
              onClick={() => {
                setMode('cancel')
                setIsFilterBottomBarOpen(false)
              }}
            >
              <h3 className="text-lg">Pembatalan Penjualan/Persewaan</h3>
              <p className="text-sm font-light text-slate-500">
                Isi detail berikut jika listing Anda batal untuk dijual atau
                disewa melalui Anda.
              </p>
            </Link>
          </div>
        </div>
      </>
    </BottomSheet>
  )
}

export default ClosingDialog
