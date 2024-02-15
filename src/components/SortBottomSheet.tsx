import { type Dispatch, type SetStateAction } from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import { useSearchParams } from 'react-router-dom'

const SORT_OPTIONS = [
  {
    label: 'Harga Termurah',
    value: 'cheap',
  },
  {
    label: 'Harga termahal',
    value: 'expensive',
  },
  {
    label: 'Jumlah kamar tidur terbanyak',
    value: 'bed',
  },
]

const SortOptionsComponent = ({
  title,
  isSelected,
  ...props
}: {
  title: string
  isSelected: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="mt-6 flex w-full justify-between gap-2 border-b border-solid border-b-gray-200 py-3"
    >
      <div className="text-lg">{title}</div>
      <div className="my-auto flex h-4 w-4 items-center justify-center rounded-full ring ring-slate-400">
        {isSelected && (
          <div className="m-auto h-2.5 w-2.5 rounded-full bg-slate-400" />
        )}
      </div>
    </button>
  )
}

const SortBottomSheet = ({
  isOpen: isFilterBottomSheetOpen,
  setIsOpen: setIsFilterBottomBarOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
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
          <div className="text-2xl font-semibold leading-8">
            Urutkan berdasarkan
          </div>
          {SORT_OPTIONS.map((v, i) => (
            <SortOptionsComponent
              key={i}
              title={v.label}
              isSelected={searchParams.get('s') === v.value}
              onClick={() => {
                if (searchParams.get('s') === v.value) {
                  searchParams.delete('s')
                } else {
                  searchParams.set('s', v.value)
                }
                setSearchParams(searchParams, {
                  replace: !!searchParams.get('s'),
                })
              }}
            />
          ))}
        </div>
      </>
    </BottomSheet>
  )
}

export default SortBottomSheet
