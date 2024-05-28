import {
  List,
  ListItem,
  ListItemSuffix,
  Radio,
  Typography,
} from '@material-tailwind/react'
import { type Dispatch, type SetStateAction } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { savedSearchToSearchParams } from 'utils'
import { useGetSavedSearchList } from 'api/queries'
import type { SavedSearch } from 'api/types'
import BottomSheet from 'react-draggable-bottom-sheet'

import BottomStickyButton from './button/BottomStickyButton'

const SavedSearchSheet = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data } = useGetSavedSearchList()

  const handleClickSearch = (search: SavedSearch) => {
    if (searchParams.get('searchId') === search.id) {
      const newSearchParams = new URLSearchParams()
      setSearchParams(newSearchParams)
    } else {
      const newSearchParams = savedSearchToSearchParams(search)
      setSearchParams(newSearchParams)
    }

    setIsOpen(false)
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      close={() => setIsOpen(false)}
      classNames={{
        draggable: '!w-full rounded-t-xl border border-slate-400',
      }}
    >
      <>
        <div data-no-drag className="mb-20 text-gray-800">
          <div className="px-4 py-3 text-2xl font-semibold leading-8">
            Calon Pembeli
          </div>
          {data?.saved_searches?.length ? (
            <List>
              {data?.saved_searches?.map((search, index) => (
                <ListItem
                  key={index}
                  className="p-0"
                  onClick={(e) => {
                    e.preventDefault()
                    handleClickSearch(search)
                  }}
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
                        checked={searchParams.get('searchId') === search.id}
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
          ) : (
            <div className="w-full text-center text-slate-500">
              Belum ada permintaan
            </div>
          )}
          <div className="flex justify-center">
            <BottomStickyButton onClick={() => navigate('/saved-searches')}>
              Kelola Calon Pembeli
            </BottomStickyButton>
          </div>
        </div>
      </>
    </BottomSheet>
  )
}

export default SavedSearchSheet
