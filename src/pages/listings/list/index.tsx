import { useInView } from 'react-intersection-observer'
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid'
import { useGetListingList } from 'api/queries'
import NewListingSheet from 'components/NewListingSheet'
import SortBottomSheet from 'components/SortBottomSheet'
import Card from 'components/Card'
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { countActiveFilters, isSorted } from 'utils'
import {
  Badge,
  Button,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from '@material-tailwind/react'

const ListingListPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { ref: fetchMoreRef, inView: isFetchMoreInView } = useInView()

  const [isSortedList, setIsSortedList] = useState(false)
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const [isFilterBottomSheetOpen, setIsFilterBottomBarOpen] = useState(false)
  const [isNewListingSheetOpen, setIsNewListingSheetOpen] = useState(false)
  const [searchText, setSearchText] = useState(searchParams?.get('q') ?? '')

  const {
    data,
    isPending,
    isFetchingNextPage,
    error,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useGetListingList({
    searchParams,
  })

  const listingsLength = data?.pages?.[0]?.listings?.length || 0

  const maxListings = Number(
    (import.meta.env.VITE_MAX_LISTINGS_PER_USER as string) || '10',
  )

  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  const onClickReset = (isReplace: boolean) => {
    setSearchText('')
    navigate('/', { replace: isReplace })
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
      <div className="flex min-h-dvh w-full flex-col bg-slate-100 pb-20 pt-16 lg:p-0">
        {data?.pages[0]?.listings?.length !== undefined &&
          data.pages[0].listings.length > 0 && (
            <div className="bg-white p-4 lg:hidden">
              <div className="relative mb-4">
                <Input
                  autoComplete="off"
                  crossOrigin={undefined}
                  label="Cari"
                  type="text"
                  name="listing-search"
                  id="listing-search"
                  icon={<MagnifyingGlassIcon />}
                  placeholder="Kata kunci pencarian"
                  value={searchText}
                  onChange={handleChangeSearchText}
                />
              </div>
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
            </div>
          )}
        <div className="sticky top-0 z-10 hidden items-center justify-between bg-slate-100 p-4 pt-8 lg:flex">
          <div className="flex items-center gap-1">
            <Typography variant="h5">
              Listing Saya ({listingsLength}/{maxListings})
            </Typography>
            <Tooltip
              className="border border-blue-gray-100 bg-white px-4 py-3 shadow shadow-black/10"
              content={
                <div className="w-60">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-80"
                  >
                    Anda memiliki kuota listing yang tersisa sebanyak{' '}
                    {maxListings - listingsLength}
                  </Typography>
                </div>
              }
            >
              <QuestionMarkCircleIcon className="h-5 w-5 text-slate-500" />
            </Tooltip>
          </div>
          {listingsLength > 0 ? (
            <Button
              size="sm"
              color="blue"
              variant="outlined"
              disabled={listingsLength >= maxListings}
              className="flex items-center gap-2 bg-white text-sm font-normal capitalize"
              onClick={() => navigate('/listings/add')}
            >
              <PlusIcon className="w-5" />
              Tambah Listing Baru
            </Button>
          ) : null}
        </div>

        <div className="flex grow flex-col p-4 lg:pt-0">
          {isError ? (
            <div className="my-auto text-center">Error: {error.message}</div>
          ) : isPending && !isFetchingNextPage ? (
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
                            <>
                              <div className="flex space-x-2 rounded-lg bg-blue-100 p-3">
                                <div className="shrink-0">
                                  <InformationCircleIcon className="h-5 w-5 text-slate-800" />
                                </div>
                                <Typography className="text-center text-sm">
                                  Anda memiliki maksimal {maxListings} kuota
                                  listing.
                                </Typography>
                              </div>
                              <Typography variant="h6" className="my-2">
                                Tentang Daftar Properti
                              </Typography>
                              <Typography variant="small" className="mb-2">
                                Tidak seperti papan iklan, listing yang
                                terdaftar di Daftar Properti harus transparan
                                lokasi nya sehingga kami bisa menjamin 1
                                properti = 1 pendaftar.
                              </Typography>
                              <Typography variant="small" className="mb-2">
                                Listing yang terdaftar akan tersebar ke jaringan
                                pemasar kami, salah satunya{' '}
                                <a
                                  target="_blank"
                                  href="https://jelajahrumah.id/"
                                  className="text-blue-500"
                                  rel="noreferrer"
                                >
                                  Jelajah Rumah
                                </a>
                                .
                              </Typography>
                              <Typography variant="small" className="mb-2">
                                Ke depannya jaringan pemasar akan bertambah
                                banyak, maka daftarkan listing anda sekarang,
                                nikmati jaminan menjadi pendaftar eksklusif dan
                                nantikan pertumbuhannya!
                              </Typography>
                              <div className="mx-auto p-3">
                                <Button
                                  color="blue"
                                  variant="filled"
                                  className="mx-auto flex items-center gap-2 text-sm font-normal capitalize"
                                  onClick={() => navigate('/listings/add')}
                                >
                                  <PlusIcon className="w-5" />
                                  Tambah Listing Baru
                                </Button>
                              </div>
                            </>
                          ) : (
                            <Typography className="text-center">
                              Listing tidak tersedia
                            </Typography>
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

      <div className="fixed bottom-36 right-4 h-0 w-full max-w-lg text-right lg:hidden">
        <IconButton
          size="lg"
          color="blue"
          className="rounded-full drop-shadow-lg"
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
      <NewListingSheet
        isOpen={isNewListingSheetOpen}
        setIsOpen={setIsNewListingSheetOpen}
      />
    </>
  )
}

export default ListingListPage
