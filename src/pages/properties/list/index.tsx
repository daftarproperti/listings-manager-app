import { useInView } from 'react-intersection-observer'
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { useGetPropertyList } from 'api/queries'
import { type Property } from 'api/types'
import { Fragment, useEffect, useState } from 'react'
import ButtonChip from 'components/button/ButtonChip'
import LinkChip from 'components/button/LinkChip'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Card from 'components/Card'
import SortBottomSheet from 'components/SortBottomSheet'
import { XCircleIcon } from '@heroicons/react/24/outline'

const PropertyListPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { ref: fetchMoreRef, inView: isFetchMoreInView } = useInView()
  const [isFilterBottomSheetOpen, setIsFilterBottomBarOpen] = useState(false)

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
  } = useGetPropertyList({
    searchParams,
  })

  const onClickCard = (item: Property) => navigate(`/properties/${item.id}`)
  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  const onClickReset = (isReplace: boolean) => {
    setSearchText('')
    navigate('/properties', { replace: isReplace })
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
      <div className="py-16">
        <div className="px-4 pb-0 pt-4">
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-2 top-[50%] h-4 w-4 -translate-y-[50%] text-slate-400" />
            <input
              type="text"
              name="property-search"
              id="property-search"
              className="block w-full rounded border border-slate-300 p-4 py-2 pl-8 text-lg text-gray-900"
              placeholder="Kata kunci pencarian"
              onChange={handleChangeSearchText}
            />
          </div>
          <div className="mb-0">
            <div className="flex flex-row gap-2">
              <LinkChip
                to={`/properties/filter`}
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
        </div>
        <div className="mt-4 bg-slate-100 p-4 pb-14">
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
                      {page.properties?.length ? (
                        page.properties?.map((property, index) => (
                          <div
                            key={index}
                            onClick={() => onClickCard(property)}
                            className="cursor-pointer"
                          >
                            <Card data={property} fromPage="properties" />
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
      <SortBottomSheet
        isOpen={isFilterBottomSheetOpen}
        setIsOpen={setIsFilterBottomBarOpen}
      />
    </div>
  )
}

export default PropertyListPage
