import { useGetPropertyDetail } from 'api/queries'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import { clsx } from 'clsx'
import RenderDescription from 'pages/listings/detail/Description'
import SwiperSlider from 'components/SwiperSlider'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatCurrencyToIDRText } from 'utils'
import DetailPropertyTable from 'components/DetailPropertyTable'
import ButtonChip from 'components/button/ButtonChip'

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

  return (
    <div className="h-auto min-h-screen space-y-4 break-words bg-slate-100 pt-16">
      {isError ? (
        <div className="mt-[50%] flex h-full -translate-y-1/2 flex-col items-center justify-center">
          <span className="mb-4">Data tidak ditemukan.</span>
          <div className="flex items-center justify-center">
            <ButtonChip
              text="Kembali ke Halaman Utama"
              isActive
              onClick={() => navigate('/')}
              className="inline-block"
            />
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
            <div
              className={clsx(
                'px-4',
                data?.pictureUrls?.length === undefined && 'pt-4',
              )}
            >
              <h1 className=" pt-2 text-lg font-semibold leading-7 text-slate-500">
                {data?.title}
              </h1>
              <div className="text-2xl font-semibold leading-8 text-slate-800">
                Rp {formatCurrencyToIDRText(data?.price)}
              </div>
              <div className="mt-1.5 line-clamp-3 text-xs leading-4 text-slate-500">
                {data?.address}
              </div>
            </div>
            <div className="flex flex-wrap content-start items-stretch gap-4 border-y border-solid border-y-[color:var(--slate-200,#E2E8F0)] py-2 pl-4 pr-14">
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
            <div className="px-4 text-sm leading-5 text-slate-800">
              <h2 className="text-sm font-semibold leading-7 text-slate-500">
                Detail Properti
              </h2>
              {data && <DetailPropertyTable dataTable={data} />}
            </div>
            <div className="px-4 text-sm leading-5 text-slate-800">
              {data && data.description && (
                <>
                  <h2 className="text-sm font-semibold leading-7 text-slate-500">
                    Deskripsi
                  </h2>
                  <RenderDescription description={data.description} />
                </>
              )}
            </div>
            <div className="flex items-stretch justify-between gap-5 bg-blue-100 px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="aspect-square w-8 max-w-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-300">
                  {data?.user?.profilePictureURL && (
                    <img
                      loading="lazy"
                      srcSet={data?.user?.profilePictureURL}
                      className="my-auto aspect-square w-8 max-w-full shrink-0 items-center justify-center overflow-hidden object-contain object-center"
                    />
                  )}
                </div>
                <span className="flex grow basis-[0%] flex-col items-stretch self-stretch">
                  <div className="whitespace-nowrap text-sm font-semibold leading-5 text-slate-800">
                    {data?.user?.name}
                  </div>
                  <div className="whitespace-nowrap text-sm leading-5 text-slate-500">
                    {data?.user?.phoneNumber}
                  </div>
                </span>
              </div>
              {data?.user?.phoneNumber && (
                <a
                  href={`tel:${data.user.phoneNumber}`}
                  className="items-stretch justify-center whitespace-nowrap rounded-lg bg-blue-500 px-4 py-2 text-center text-sm leading-5 text-slate-50"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  Hubungi
                </a>
              )}
            </div>
          </>
        )
      )}
    </div>
  )
}

export default PropertyDetail
