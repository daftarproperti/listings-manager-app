import { useInView } from 'react-intersection-observer'
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { useGetListingList } from 'api/queries'
import NewListingSheet from 'components/NewListingSheet'
import SortBottomSheet from 'components/SortBottomSheet'
import ButtonChip from 'components/button/ButtonChip'
import LinkChip from 'components/button/LinkChip'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/24/outline'
import Card from 'components/Card'

const ListingListPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { ref: fetchMoreRef, inView: isFetchMoreInView } = useInView()

  const [isFilterBottomSheetOpen, setIsFilterBottomBarOpen] = useState(false)
  const [isNewListingSheetOpen, setIsNewListingSheetOpen] = useState(false)
  const [searchText, setSearchText] = useState(searchParams?.get('q') ?? '')

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

  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  const onClickReset = (isReplace: boolean) => {
    setSearchText('')
    navigate('/', { replace: isReplace })
  }

  useEffect(() => {
    refetch()
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

  const countActiveFilters = () => {
    let activeFilters = 0
    for (const [, value] of searchParams.entries()) {
      if (value) {
        activeFilters++
      }
    }
    return activeFilters
  }
  const activeFilterCount = countActiveFilters()

  return (
    <div className="relative w-full">
      <div className="pb-6 pt-20">
        <div className="px-4 py-2 pt-0">
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
          <div className="flex flex-row gap-2">
            <LinkChip
              to={`/listings/filter?${searchParams}`}
              icon={
                <AdjustmentsHorizontalIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
              }
              text="Filter"
              additionalInfo={
                activeFilterCount > 0 && (
                  <span className="absolute left-5 top-4 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs leading-none text-red-100">
                    {activeFilterCount}
                  </span>
                )
              }
            />
            <ButtonChip
              icon={
                <Bars3BottomLeftIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
              }
              text="Urutkan"
              onClick={() => setIsFilterBottomBarOpen(true)}
            />
            {searchParams?.size > 0 && (
              <ButtonChip
                text="Reset"
                icon={<XCircleIcon className="w-5" />}
                isActive
                onClick={() => onClickReset(true)}
              />
            )}
          </div>
        </div>

        <div className="mt-2 bg-slate-100 p-4 pb-36">
          {isError ? (
            <div className="mt-[50%] flex h-full -translate-y-1/2 flex-col items-center justify-center">
              <span className="mb-4">Error: {error.message}</span>
            </div>
          ) : isFetching && !isFetchingNextPage ? (
            <span className="mt-[50%] flex h-full -translate-y-1/2 items-center justify-center">
              Loading...
            </span>
          ) : (
            data?.pages?.length && (
              <>
                <ul role="list" className="space-y-4">
                  {data.pages.map((page, index) => (
                    <Fragment key={index}>
                      {page.listings?.length ? (
                        page.listings?.map((listing, index) => (
                          <div key={index}>
                            <Card data={listing} fromPage="listings" />
                          </div>
                        ))
                      ) : (
                        <div className="mt-[50%] flex h-full -translate-y-1/2 flex-col items-center justify-center">
                          {countActiveFilters() > 0 ? (
                            <>
                              <span className="mb-4">
                                Listing tidak ditemukan
                              </span>
                              <ButtonChip
                                text="Reset Filter Pencarian"
                                onClick={() => onClickReset(false)}
                              />
                            </>
                          ) : (
                            <span className="mb-4">
                              Anda belum mempunyai Listing
                            </span>
                          )}
                        </div>
                      )}
                    </Fragment>
                  ))}
                </ul>
                {hasNextPage && (
                  <div ref={fetchMoreRef} className="mt-4 text-center">
                    Loading...
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
      <div className="fixed bottom-36 h-0 w-full max-w-lg text-right">
        <button
          // if tambah listing cara cepat already to use, change this to open NewListingSheet
          // onClick={() => setIsNewListingSheetOpen(true)}
          onClick={() => navigate('/listings/add')}
          className="mr-4 inline-block h-14 w-14 items-center justify-center rounded-full bg-primary-500 p-4"
        >
          <PlusIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      <SortBottomSheet
        isOpen={isFilterBottomSheetOpen}
        setIsOpen={setIsFilterBottomBarOpen}
      />
      <NewListingSheet
        isOpen={isNewListingSheetOpen}
        setIsOpen={setIsNewListingSheetOpen}
      />
    </div>
  )
}

export default ListingListPage
