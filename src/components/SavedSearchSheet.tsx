import {
  List,
  ListItem,
  ListItemSuffix,
  Radio,
  Typography,
} from '@material-tailwind/react'
import { type Dispatch, type SetStateAction } from 'react'
import BottomSheet from 'react-draggable-bottom-sheet'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { type SavedSearchListRes, type SavedSearch } from 'api/types'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SavedSearchSheet = ({
  isOpen: isSavedSearchSheetOpen,
  setIsOpen: setIsSavedSearchSheetOpen,
  savedSearches,
  onSelectSearch,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  savedSearches: SavedSearchListRes
  onSelectSearch: (title: string, searchParams: URLSearchParams) => void
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedRadioIndex, setSelectedRadioIndex] = useState<number | null>(
    null,
  )

  const handleClickSearch = (search: SavedSearch, index: number) => {
    const newSearchParams = new URLSearchParams(searchParams)

    searchParams.forEach((_, key) => {
      newSearchParams.delete(key)
    })

    if (search.filterSet) {
      const filterSetKeys = Object.keys(search.filterSet)
      filterSetKeys.forEach((key) => {
        const value = search.filterSet
          ? search.filterSet[key as keyof typeof search.filterSet]
          : ''

        if (value != null) {
          if (typeof value === 'object' && 'min' in value && 'max' in value) {
            if (value.min != null && value.max != null) {
              newSearchParams.set(`${key}[min]`, value.min.toString())
              newSearchParams.set(`${key}[max]`, value.max.toString())
            }
          } else {
            newSearchParams.set(key, value.toString())
          }
        }
      })

      setSearchParams(newSearchParams)
    }

    if (search.title) {
      onSelectSearch(search.title, newSearchParams)
    }

    setSelectedRadioIndex(index)
    setIsSavedSearchSheetOpen(false)
  }

  return (
    <BottomSheet
      isOpen={isSavedSearchSheetOpen}
      close={() => setIsSavedSearchSheetOpen(false)}
      classNames={{
        draggable:
          '!w-full !max-w-lg !mx-auto rounded-t-xl border border-slate-400',
      }}
    >
      <>
        <div id="sheet-overlay" className="w-full cursor-pointer pt-3">
          <div className="mx-auto h-1 w-12 rounded-full bg-slate-300" />
        </div>
        <div data-no-drag className="mb-20 text-gray-800">
          <div className="p-4 text-2xl font-semibold leading-8">
            Calon Pembeli
          </div>
          {(savedSearches?.saved_searches?.length ?? 0) > 0 && (
            <List>
              {savedSearches?.saved_searches?.map((search, index) => (
                <ListItem
                  key={index}
                  className="p-0"
                  onClick={() =>
                    search.title && handleClickSearch(search, index)
                  }
                >
                  <label
                    htmlFor={`saved-search-${index}`}
                    className="flex w-full cursor-pointer items-center border-b border-gray-200 p-3"
                  >
                    <Typography
                      color="blue-gray"
                      className="text-lg text-slate-900"
                    >
                      {search.title}
                    </Typography>
                    <ListItemSuffix className="mr-3">
                      <Radio
                        readOnly
                        ripple={false}
                        color="blue-gray"
                        crossOrigin={undefined}
                        checked={
                          selectedRadioIndex === index && searchParams.size > 0
                        }
                        onChange={() => {}}
                        className="hover:before:opacity-0"
                        containerProps={{ className: 'p-0' }}
                        id={`saved-search-${index}`}
                      />
                    </ListItemSuffix>
                  </label>
                </ListItem>
              ))}
            </List>
          )}
          <div className="flex justify-center">
            <BottomStickyButton type="submit">
              Kelola Calon Pembeli
            </BottomStickyButton>
          </div>
        </div>
      </>
    </BottomSheet>
  )
}

export default SavedSearchSheet
