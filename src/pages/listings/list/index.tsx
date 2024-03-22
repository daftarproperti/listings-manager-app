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
import Card from 'components/Card'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { countActiveFilters } from 'utils'

const ListingListPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { ref: fetchMoreRef, inView: isFetchMoreInView } = useInView()

  const [activeFilterCount, setActiveFilterCount] = useState(0)
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

  return (
    <div className="relative h-dvh">
      <div className="flex h-dvh w-full flex-col pb-20 pt-16">
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
          <div className="flex flex-row gap-2">
            <LinkChip
              to={`/listings/filter?${searchParams}`}
              icon={
                <AdjustmentsHorizontalIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
              }
              text="Filter"
              additionalInfo={
                activeFilterCount > 0 && (
                  <span className="absolute -end-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-red-100">
                    {activeFilterCount}
                  </span>
                )
              }
              className="relative"
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

        <div className="grow bg-slate-100 p-4 pb-24">
          {isError ? (
            <div className="flex h-96 items-center justify-center">
              <span className="mb-4">Error: {error.message}</span>
            </div>
          ) : isFetching && !isFetchingNextPage ? (
            <div className="flex h-96 items-center justify-center">
              Loading...
            </div>
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
                        <div className="flex h-96 flex-col items-center justify-center gap-3">
                          {`${searchParams}` === '' && (
                            <div className="rounded-lg bg-primary-100 p-3 text-xs">
                              Anda dapat dengan mudah menambahkan listing dengan
                              cara menyalin dan menempelkan seluruh informasi
                              listing Anda pada bot chat Telegram Anda.
                            </div>
                          )}
                          Data Tidak Tersedia
                        </div>
                      )}
                    </Fragment>
                  ))}
                </ul>
                {hasNextPage && (
                  <div
                    ref={fetchMoreRef}
                    className="flex h-96 items-center justify-center"
                  >
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
