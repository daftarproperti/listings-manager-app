import { useGetListingDetail } from 'api/queries'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import { clsx } from 'clsx'
import RenderDescription from 'pages/listings/detail/Description'
import SwiperSlider from 'components/SwiperSlider'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Chip } from '@material-tailwind/react'
import {
  formatCurrencyToIDRText,
  appPath,
  dpPath,
  getLabelForValue,
} from 'utils'
import DetailPropertyTable from 'components/DetailPropertyTable'
import ShareButton from 'components/button/ShareButton'

function ListingDetail({
  id,
  setCanEdit,
}: {
  id: string
  setCanEdit: (canEdit: boolean) => void
}) {
  const { data, isFetching, isError, refetch } = useGetListingDetail({ id })
  const navigate = useNavigate()
  const navigateToEditForm = (id: string) => {
    navigate(`/listings/edit/${id}`, { replace: true })
  }
  const location = useLocation()
  const updateSuccess = location.state?.updateSuccess
  const listingPublicUrl = dpPath(`/public/listings/${data?.id || ''}`)

  useEffect(() => {
    if (updateSuccess) {
      refetch()
    }
  }, [updateSuccess, refetch])

  useEffect(() => {
    setCanEdit(data?.userCanEdit ?? false)
  }, [data?.userCanEdit, setCanEdit])

  return (
    <div className="flex min-h-screen flex-col break-words bg-slate-100 pt-16">
      {isError ? (
        <div className="mt-[50%] flex h-full -translate-y-1/2 flex-col items-center justify-center">
          <span className="mb-4">Data tidak ditemukan.</span>
          <div className="flex items-center justify-center">
            <Button
              size="sm"
              color="blue"
              className="text-sm font-normal capitalize"
              onClick={() => navigate('/')}
            >
              Kembali ke Halaman Utama
            </Button>
          </div>
        </div>
      ) : isFetching ? (
        <div className="m-auto mt-[50%] flex h-full items-center justify-center">
          Loading...
        </div>
      ) : (
        data && (
          <>
            {!!data?.pictureUrls?.length && (
              <SwiperSlider pictures={data?.pictureUrls} />
            )}
            <div className="grow py-2">
              <div
                className={clsx(
                  'px-4',
                  data?.pictureUrls?.length === undefined && 'pt-4',
                )}
              >
                {data?.isPrivate && (
                  <Chip
                    value="PRIVATE"
                    className="mb-1.5 w-fit rounded-full border-2 border-sky-500 bg-indigo-900 px-1.5 py-0.5 shadow"
                  />
                )}
                <h1 className="text-lg font-semibold leading-7 text-slate-500">
                  {data?.title}
                </h1>
                <div className="text-2xl font-semibold leading-8 text-slate-800">
                  {formatCurrencyToIDRText(data?.price)}
                </div>
                <div className="mt-1.5 line-clamp-3 text-xs leading-4 text-slate-500">
                  {data?.address}
                </div>
                <div className="mt-1.5 line-clamp-3 text-[10px] leading-4 text-slate-400">
                  Diperbarui pada: {data?.updatedAt}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap content-start items-stretch gap-4 border-y border-solid border-y-[color:var(--slate-200,#E2E8F0)] py-2 pl-4 pr-14">
                <span className="flex items-center justify-between gap-1">
                  <BedIconSVG />
                  <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                    {data?.bedroomCount} KT
                  </div>
                </span>
                <span className="flex items-center justify-between gap-1">
                  <BathIconSVG />
                  <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                    {data?.bathroomCount} KM
                  </div>
                </span>
                <span className="flex items-center justify-between gap-1">
                  <HouseIconSVG />
                  <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                    {data?.buildingSize} m2
                  </div>
                </span>
                <span className="flex items-center justify-between gap-1">
                  <LotIconSVG />
                  <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                    {data?.lotSize} m2
                  </div>
                </span>
              </div>
              {(data.listingType || data.propertyType) && (
                <>
                  <div className="flex flex-wrap content-start gap-x-4 gap-y-1 border-b border-solid border-t-slate-200 px-3 py-2 text-[10px] text-slate-400">
                    <div className="flex items-center justify-between gap-1">
                      Tipe Listing:{' '}
                      {getLabelForValue(
                        'listingType',
                        data.listingType || 'defaultType',
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      Tipe Properti:{' '}
                      {getLabelForValue(
                        'propertyType',
                        data.propertyType || 'defaultType',
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="px-4 py-1 text-sm leading-5 text-slate-800">
                <h2 className="text-sm font-semibold leading-7 text-slate-500">
                  Detail Listing
                </h2>
                {data && <DetailPropertyTable dataTable={data} />}
              </div>
              {data && data.description && (
                <div className="px-4 py-1 text-sm leading-5 text-slate-800">
                  <h2 className="text-sm font-semibold leading-7 text-slate-500">
                    Deskripsi
                  </h2>
                  <RenderDescription description={data.description} />
                </div>
              )}
            </div>
            <div className="sticky bottom-0 border-t">
              <div className="flex items-stretch justify-between gap-5 bg-blue-100 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  {data?.user?.profilePictureURL && (
                    <img
                      loading="lazy"
                      src={data?.user?.profilePictureURL}
                      className="my-auto aspect-square w-8 max-w-full shrink-0 overflow-hidden rounded-full border border-white object-contain object-center shadow-sm"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null
                        currentTarget.src = appPath('/logo.svg')
                      }}
                    />
                  )}
                  <span className="flex grow basis-[0%] flex-col items-stretch justify-center self-stretch">
                    <div className="whitespace-nowrap text-sm font-semibold leading-5 text-slate-800">
                      {data?.user?.name}
                    </div>
                    <div className="whitespace-nowrap text-sm leading-5 text-slate-500">
                      {data?.user?.phoneNumber}
                    </div>
                  </span>
                </div>
              </div>
              {data?.userCanEdit && (
                <div className="flex w-full max-w-lg items-stretch gap-4 bg-sky-50 px-4 py-2">
                  <div className="w-full">
                    <Button
                      fullWidth
                      color="blue"
                      variant="outlined"
                      className="text-sm font-normal capitalize"
                      onClick={() => navigateToEditForm(id)}
                    >
                      Edit
                    </Button>
                  </div>
                  <ShareButton
                    url={listingPublicUrl}
                    title={data?.title || 'Default Title'}
                    className="w-full"
                  >
                    <Button
                      fullWidth
                      color="blue"
                      className="h-full text-sm font-normal capitalize"
                    >
                      Bagikan
                    </Button>
                  </ShareButton>
                </div>
              )}
            </div>
          </>
        )
      )}
    </div>
  )
}

export default ListingDetail
