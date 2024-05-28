import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { clsx } from 'clsx'
import ReactGA from 'react-ga4'
import SwiperSlider from 'components/SwiperSlider'
import { useGetPropertyDetail } from 'api/queries'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import {
  clipboardCopyIfMiniApp,
  formatCurrencyToIDRText,
  appPath,
  getLabelForValue,
} from 'utils'
import RenderDescription from 'pages/listings/detail/Description'
import DetailPropertyTable from 'components/DetailPropertyTable'

function PropertyDetail({ id }: { id: string }) {
  const { data, isFetching, isError, refetch } = useGetPropertyDetail({ id })
  const location = useLocation()
  const updateSuccess = location.state?.updateSuccess
  const navigate = useNavigate()

  useEffect(() => {
    if (updateSuccess) {
      refetch()
    }
  }, [updateSuccess, refetch])

  useEffect(() => {
    if (data?.listings) {
      data.listings.forEach((listing) => {
        ReactGA.event('listing_view', {
          listing_id: listing.id,
        })
      })
    }
  }, [data])

  const contact = data?.listings?.[0]?.user?.name
    ? {
        name: data?.listings?.[0]?.user?.name,
        phoneNumber: data?.listings?.[0]?.user?.phoneNumber,
        profilePictureURL: data?.listings?.[0]?.user?.profilePictureURL,
      }
    : data?.listings?.[0]?.contact?.name
      ? {
          name: data?.listings?.[0]?.contact?.name,
          phoneNumber: data?.listings?.[0]?.contact?.phoneNumber,
          profilePictureURL: null,
        }
      : null

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
                <h1 className="text-lg font-semibold leading-7 text-slate-500">
                  {data?.title}
                </h1>
                <div className="text-2xl font-semibold leading-8 text-slate-800">
                  {data.listingForSale && !data.listingForRent
                    ? formatCurrencyToIDRText(data.price)
                    : data.listingForRent && !data.listingForSale
                      ? formatCurrencyToIDRText(data.rentPrice) + ' per tahun'
                      : `${formatCurrencyToIDRText(
                          data.price,
                        )} / ${formatCurrencyToIDRText(
                          data.rentPrice,
                        )} per tahun`}
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
                      {data.listingForSale && data.listingForRent
                        ? 'Dijual/Disewa'
                        : data.listingForSale
                          ? 'Dijual'
                          : data.listingForRent
                            ? 'Disewa'
                            : null}
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
                  Detail Properti
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
            {contact?.name && (
              <div className="sticky bottom-0 flex w-full max-w-lg items-stretch justify-between gap-5 border-t bg-blue-50 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  {contact?.profilePictureURL && (
                    <img
                      loading="lazy"
                      src={contact?.profilePictureURL}
                      className="my-auto aspect-square w-8 max-w-full shrink-0 overflow-hidden rounded-full border border-white object-contain object-center shadow-sm"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null
                        currentTarget.src = appPath('/logo.svg')
                      }}
                    />
                  )}
                  <span className="flex grow basis-[0%] flex-col items-stretch justify-center self-stretch">
                    <div className="whitespace-nowrap text-sm font-semibold leading-5 text-slate-800">
                      {contact?.name}
                    </div>
                    <div className="whitespace-nowrap text-sm leading-5 text-slate-500">
                      {contact?.phoneNumber}
                    </div>
                  </span>
                </div>
                {contact?.phoneNumber && (
                  <a href={`tel:${contact?.phoneNumber}`}>
                    <Button
                      size="sm"
                      color="blue"
                      className="text-sm font-normal capitalize"
                      onClick={(e) => {
                        e.stopPropagation()
                        const phoneNumber = contact?.phoneNumber
                        clipboardCopyIfMiniApp(phoneNumber, e)
                      }}
                    >
                      Hubungi
                    </Button>
                  </a>
                )}
              </div>
            )}
          </>
        )
      )}
    </div>
  )
}

export default PropertyDetail
