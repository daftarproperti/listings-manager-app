import { useInView } from 'react-intersection-observer'
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { useGetListingList, useListSavedSearch } from 'api/queries'
import { type SavedSearchListRes } from 'api/types'
import NewListingSheet from 'components/NewListingSheet'
import SortBottomSheet from 'components/SortBottomSheet'
import SavedSearchSheet from 'components/SavedSearchSheet'
import Card from 'components/Card'
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { countActiveFilters, isSorted, isSavedSearchApplied } from 'utils'
import { Badge, Button, IconButton } from '@material-tailwind/react'

const ListingListPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { ref: fetchMoreRef, inView: isFetchMoreInView } = useInView()

  const [isSortedList, setIsSortedList] = useState(false)
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const [isFilterBottomSheetOpen, setIsFilterBottomBarOpen] = useState(false)
  const [isSavedSearchSheetOpen, setIsSavedSearchSheetOpen] = useState(false)
  const [isNewListingSheetOpen, setIsNewListingSheetOpen] = useState(false)
  const [searchText, setSearchText] = useState(searchParams?.get('q') ?? '')
  const [savedSearches, setSavedSearches] = useState<SavedSearchListRes>({})
  const [selectedSearchTitle, setSelectedSearchTitle] = useState('')

  const {
    data,
    isFetching,
    isFetchingNextPage,
    error,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useGetListingList({
    searchParams,
  })

  const { data: savedSearchData } = useListSavedSearch()

  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  const handleSelectSearch = (title: string, searchParams: URLSearchParams) => {
    setSelectedSearchTitle(title)
    setSearchParams(searchParams)
  }

  const onClickReset = (isReplace: boolean) => {
    setSearchText('')
    navigate('/', { replace: isReplace })
  }

  useEffect(() => {
    refetch()
    setIsSortedList(isSorted(searchParams))
    setSelectedSearchTitle(isSavedSearchApplied(searchParams))
    setActiveFilterCount(countActiveFilters(searchParams))
  }, [searchParams])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams)
      if (searchText) {
        newSearchParams.set('q', searchText)
      } else {
        newSearchParams.delete('q')
      }
      setSearchParams(newSearchParams, { replace: true })
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchText])

  useEffect(() => {
    if (isFetchMoreInView) fetchNextPage()
  }, [isFetchMoreInView])

  useEffect(() => {
    if (savedSearchData) setSavedSearches(savedSearchData)
  }, [savedSearchData])

  return (
    <>
      <div className="flex min-h-dvh w-full flex-col pb-20 pt-16">
        <div className="bg-white p-4">
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-2 top-[50%] h-4 w-4 -translate-y-[50%] text-slate-400" />
            <input
              type="text"
              name="listing-search"
              id="listing-search"
              className="block w-full rounded border border-slate-300 p-4 py-2 pl-8 text-lg text-gray-900"
              placeholder="Kata kunci pencarian"
              value={searchText}
              onChange={handleChangeSearchText}
            />
          </div>
          <div className="flex flex-row justify-between gap-2">
            <div className="flex flex-row gap-2">
              <Badge
                content={activeFilterCount}
                invisible={activeFilterCount === 0}
                className="min-h-5 min-w-5"
              >
                <Link to={`/listings/filter?${searchParams}`}>
                  <Button
                    size="sm"
                    color="blue"
                    variant="outlined"
                    className="relative flex items-center gap-1.5 text-sm font-normal capitalize"
                  >
                    <AdjustmentsHorizontalIcon className="w-5" />
                    Filter
                  </Button>
                </Link>
              </Badge>
              <Badge
                content="1"
                invisible={!isSortedList}
                className="min-h-5 min-w-5"
              >
                <Button
                  size="sm"
                  color="blue"
                  variant="outlined"
                  className="relative flex items-center gap-1.5 text-sm font-normal capitalize"
                  onClick={() => setIsFilterBottomBarOpen(true)}
                >
                  <Bars3BottomLeftIcon className="w-5" />
                  Urutkan
                </Button>
              </Badge>
              {searchParams?.size > 0 && (
                <Button
                  size="sm"
                  color="blue"
                  className="flex items-center gap-1.5 text-sm font-normal capitalize"
                  onClick={() => onClickReset(true)}
                >
                  <XCircleIcon className="w-5" />
                  Reset
                </Button>
              )}
            </div>
            <div>
              <Badge invisible={true} className="min-h-5 min-w-5">
                <Button
                  size="sm"
                  color="blue"
                  variant="outlined"
                  className="relative flex items-center gap-1.5 text-sm font-normal capitalize"
                  onClick={() => setIsSavedSearchSheetOpen(true)}
                >
                  <PlusIcon className="w-5" />
                  {selectedSearchTitle ? selectedSearchTitle : 'Calon Pembeli'}
                </Button>
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex grow flex-col bg-slate-100 p-4">
          {isError ? (
            <div className="my-auto text-center">Error: {error.message}</div>
          ) : isFetching && !isFetchingNextPage ? (
            <div className="my-auto text-center">Loading...</div>
          ) : (
            data?.pages?.length && (
              <>
                <ul role="list" className="flex grow flex-col space-y-4">
                  {data.pages.map((page, index) => (
                    <Fragment key={index}>
                      {page.listings?.length ? (
                        page.listings?.map((listing, index) => (
                          <Fragment key={index}>
                            <Card data={listing} />
                          </Fragment>
                        ))
                      ) : (
                        <div className="my-auto space-y-3">
                          {`${searchParams}` === '' ? (
                            <div className="flex space-x-2 rounded-lg bg-blue-100 p-3">
                              <div className="shrink-0">
                                <InformationCircleIcon className="h-5 w-5 text-slate-800" />
                              </div>
                              <div className="text-sm">
                                Anda dapat dengan mudah menambahkan listing
                                dengan cara menyalin dan menempelkan seluruh
                                informasi listing Anda pada bot chat Telegram
                                Anda.
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              Data Tidak Tersedia
                            </div>
                          )}
                        </div>
                      )}
                    </Fragment>
                  ))}
                </ul>
                {hasNextPage && (
                  <div ref={fetchMoreRef} className="text-center">
                    Loading...
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
      <div className="fixed bottom-36 h-0 w-full max-w-lg pr-4 text-right">
        <IconButton
          size="lg"
          color="blue"
          className="rounded-full"
          // TODO if tambah listing cara cepat already to use, change this to open NewListingSheet
          // onClick={() => setIsNewListingSheetOpen(true)}
          onClick={() => navigate('/listings/add')}
        >
          <PlusIcon className="h-6 w-6 text-white" />
        </IconButton>
      </div>

      <SortBottomSheet
        isOpen={isFilterBottomSheetOpen}
        setIsOpen={setIsFilterBottomBarOpen}
      />
      <SavedSearchSheet
        isOpen={isSavedSearchSheetOpen}
        setIsOpen={setIsSavedSearchSheetOpen}
        savedSearches={savedSearches}
        onSelectSearch={handleSelectSearch}
      />
      <NewListingSheet
        isOpen={isNewListingSheetOpen}
        setIsOpen={setIsNewListingSheetOpen}
      />
    </>
  )
}

export default ListingListPage
