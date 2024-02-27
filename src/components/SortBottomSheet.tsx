import { type Dispatch, type SetStateAction } from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import { useSearchParams } from 'react-router-dom'

const SORT_OPTIONS = [
  {
    label: 'Harga Termurah',
    value: 'price',
    order: 'asc',
  },
  {
    label: 'Harga termahal',
    value: 'price',
    order: 'desc',
  },
  {
    label: 'Jumlah kamar tidur terbanyak',
    value: 'bedroomCount',
    order: 'desc',
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

  const onClickApplyFilter = (v: (typeof SORT_OPTIONS)[0]) => {
    if (
      searchParams.get('sort') === v.value &&
      searchParams.get('order') === v.order
    ) {
      searchParams.delete('sort')
      searchParams.delete('order')
    } else {
      searchParams.set('sort', v.value)
      searchParams.set('order', v.order)
    }
    setSearchParams(searchParams)
  }

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
          {SORT_OPTIONS.map((option, index) => (
            <SortOptionsComponent
              key={index}
              title={option.label}
              isSelected={
                searchParams.get('sort') === option.value &&
                searchParams.get('order') === option.order
              }
              onClick={() => onClickApplyFilter(option)}
            />
          ))}
        </div>
      </>
    </BottomSheet>
  )
}

export default SortBottomSheet
