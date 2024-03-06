import { useInView } from 'react-intersection-observer'
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { useGetListingList } from 'api/queries'
import { type Listing } from 'api/types'
import NewListingSheet from 'components/NewListingSheet'
import SortBottomSheet from 'components/SortBottomSheet'
import ButtonChip from 'components/button/ButtonChip'
import LinkChip from 'components/button/LinkChip'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/24/outline'

import Card from './Card'

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

  const onClickCard = (item: Listing) => navigate(`/listings/${item.id}`)

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

  return (
    <div className="relative w-full">
      <div className="p-4 pb-20">
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-2 top-[50%] h-4 w-4 -translate-y-[50%] text-slate-400" />
          <input
            type="text"
            name="listing-search"
            id="listing-search"
            className="block w-full rounded border border-slate-400 p-4 py-1.5 pl-8 text-gray-900 sm:text-sm sm:leading-6"
            placeholder="Cari Rumah Dimana?"
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
          />
          <ButtonChip
            icon={
              <Bars3BottomLeftIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
            }
            text="Urutkan"
            onClick={() => setIsFilterBottomBarOpen(true)}
          />
          <ButtonChip
            text="Private"
            isActive={searchParams?.get('collection') === 'true'}
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams)
              if (newSearchParams.get('collection')) {
                newSearchParams.delete('collection')
              } else {
                newSearchParams.set('collection', 'true')
              }
              setSearchParams(newSearchParams, { replace: true })
            }}
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
        <div className="mt-4">
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
                          <div
                            key={index}
                            onClick={() => onClickCard(listing)}
                            className="cursor-pointer"
                          >
                            <Card data={listing} />
                          </div>
                        ))
                      ) : (
                        <div className="mt-[50%] flex h-full -translate-y-1/2 flex-col items-center justify-center">
                          <span className="mb-4">Data Tidak Tersedia</span>
                          <ButtonChip
                            text="Reset"
                            onClick={() => onClickReset(false)}
                          />
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
      <div className="fixed bottom-0 w-full max-w-lg bg-white px-4 py-2">
        <button
          onClick={() => setIsNewListingSheetOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-20 py-3"
        >
          <PlusIcon className="w-[18px] text-white" />
          <div className=" text-base leading-6 text-white">
            Tambah listing baru
          </div>
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
