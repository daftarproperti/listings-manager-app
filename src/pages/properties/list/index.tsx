import { useInView } from 'react-intersection-observer'
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Badge, Button } from '@material-tailwind/react'
import { useGetPropertyList } from 'api/queries'
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import SortBottomSheet from 'components/SortBottomSheet'
import { countActiveFilters, isSorted } from 'utils'
import PropertyCard from 'components/PropertyCard'

const PropertyListPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { ref: fetchMoreRef, inView: isFetchMoreInView } = useInView()
  const [isFilterBottomSheetOpen, setIsFilterBottomBarOpen] = useState(false)

  const [isSortedList, setIsSortedList] = useState(false)
  const [activeFilterCount, setActiveFilterCount] = useState(0)
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

  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  const onClickReset = (isReplace: boolean) => {
    setSearchText('')
    navigate('/properties', { replace: isReplace })
  }

  useEffect(() => {
    refetch()
    setIsSortedList(isSorted(searchParams))
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
    <>
      <div className="flex min-h-dvh w-full flex-col pb-20 pt-16">
        <div className="bg-white p-4">
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
              <Badge
                content={activeFilterCount}
                invisible={activeFilterCount === 0}
                className="min-h-5 min-w-5"
              >
                <Link to={`/properties/filter?${searchParams}`}>
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
                  className="flex items-center gap-1.5 text-sm font-normal capitalize"
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
                      {page.properties?.length ? (
                        page.properties?.map((property, index) => (
                          <Fragment key={index}>
                            <PropertyCard data={property} />
                          </Fragment>
                        ))
                      ) : (
                        <div className="my-auto text-center">
                          Data Tidak Tersedia
                        </div>
                      )}
                    </Fragment>
                  ))}
                </ul>
                {hasNextPage && (
                  <div ref={fetchMoreRef} className="pt-4 text-center">
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
    </>
  )
}

export default PropertyListPage
