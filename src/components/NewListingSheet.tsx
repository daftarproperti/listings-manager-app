import { type Dispatch, type SetStateAction } from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import { Link } from 'react-router-dom'

const NewListingSheet = ({
  isOpen: isFilterBottomSheetOpen,
  setIsOpen: setIsFilterBottomBarOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <BottomSheet
      isOpen={isFilterBottomSheetOpen}
      close={() => setIsFilterBottomBarOpen(false)}
      classNames={{
        draggable:
          '!w-full !max-w-lg !mx-auto rounded-t-xl border border-slate-400',
      }}
    >
      <>
        <div id="sheet-overlay" className="w-full cursor-pointer pb-8 pt-3">
          <div className="mx-auto h-1 w-12 rounded-full bg-slate-300" />
        </div>
        <div data-no-drag className="mx-6 mb-6 text-gray-800">
          <div className="mb-4 text-2xl font-semibold leading-8">
            Tambah Listing
          </div>
          <div className="mb-8">
            <div className="mb-4 border-b border-solid border-b-gray-200 pb-2">
              <Link to="/listings/add/simpleform">
                <h3 className="text-lg">Cara Cepat</h3>
                <p className="text-sm font-light text-slate-500">
                  Salin dan tempel informasi listing Anda
                </p>
              </Link>
            </div>
            <div className="mb-4 border-b border-solid border-b-gray-200 pb-2">
              <Link to="/listings/add">
                <h3 className="text-lg">Lebih Lengkap</h3>
                <p className="text-sm font-light text-slate-500">
                  Isi detail setiap informasi listing Anda
                </p>
              </Link>
            </div>
          </div>
        </div>
      </>
    </BottomSheet>
  )
}

export default NewListingSheet
