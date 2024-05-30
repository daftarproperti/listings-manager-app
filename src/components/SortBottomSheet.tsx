import {
  List,
  ListItem,
  ListItemSuffix,
  Radio,
  Typography,
} from '@material-tailwind/react'
import { type components } from 'api/generated'
import { type Dispatch, type SetStateAction } from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import { useSearchParams } from 'react-router-dom'

type ListingSort = components['schemas']['ListingSort']

export const LISTING_SORT_ENUM: { [key in ListingSort]: string } = {
  price: 'Harga Termahal',
  bedroomCount: 'Kamar Tidur',
  bathroomCount: 'Kamar Mandi',
  lotSize: 'Luas Tanah',
  buildingSize: 'Luas Bangunan',
}

export const SORT_OPTIONS = [
  {
    label: 'Harga Termurah',
    value: 'price',
    order: 'asc',
  },
  ...Object.keys(LISTING_SORT_ENUM).map((value) => ({
    label: LISTING_SORT_ENUM[value as ListingSort],
    value,
    order: 'desc',
  })),
]

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
    setIsFilterBottomBarOpen(false)
  }

  return (
    <BottomSheet
      isOpen={isFilterBottomSheetOpen}
      close={() => setIsFilterBottomBarOpen(false)}
      classNames={{
        draggable: '!w-full rounded-t-xl border border-slate-400',
      }}
    >
      <>
        <div data-no-drag className="mb-3 text-gray-800">
          <div className="px-4 py-3 text-2xl font-semibold leading-8">
            Urutkan berdasarkan
          </div>
          <List>
            {SORT_OPTIONS.map((option, index) => (
              <ListItem
                key={index}
                className="p-0"
                onClick={() => onClickApplyFilter(option)}
              >
                <label
                  htmlFor="sort-list"
                  className="flex w-full cursor-pointer items-center border-b border-gray-200 p-3"
                >
                  <Typography
                    color="blue-gray"
                    className="text-lg text-slate-900"
                  >
                    {option.label}
                  </Typography>
                  <ListItemSuffix className="mr-3">
                    <Radio
                      readOnly
                      ripple={false}
                      color="blue-gray"
                      crossOrigin={undefined}
                      className="hover:before:opacity-0"
                      containerProps={{ className: 'p-0' }}
                      checked={
                        searchParams.get('sort') === option.value &&
                        searchParams.get('order') === option.order
                      }
                    />
                  </ListItemSuffix>
                </label>
              </ListItem>
            ))}
          </List>
        </div>
      </>
    </BottomSheet>
  )
}

export default SortBottomSheet
