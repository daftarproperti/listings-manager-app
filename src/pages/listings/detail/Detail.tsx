import SwiperSlider from 'components/SwiperSlider'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Button,
  type ButtonProps,
  Card,
  Chip,
  Typography,
} from '@material-tailwind/react'
import { useGetListingDetail } from 'api/queries'
import {
  BathIconSVG,
  BedIconSVG,
  CancelIconSVG,
  HouseIconSVG,
  LotIconSVG,
  VerifyIconSVG,
  ArrowDownIconSVG,
  NewReleaseIconSVG,
  MinusCircleIconSVG,
} from 'assets/icons'
import {
  formatCurrencyToIDRText,
  appPath,
  getLabelForValue,
  replaceWithBr,
  getVerifyStatus,
  getActiveStatus,
  getCancellationStatus,
  getClosingStatus,
} from 'utils'
import MarketerLink from 'components/MarketerLink'
import DetailListingTable from 'components/DetailListingTable'
import DotsHeaderButton from 'components/header/DotsHeaderButton'
import type {
  VerifyStatus,
  ActiveStatus,
  CancellationStatus,
  ClosingStatus,
} from 'api/types'

function ListingDetail({
  id,
  setCanEdit,
  checkMultipleUnit,
  checkClosings,
  setIsApproved,
}: {
  id: string
  setCanEdit: (canEdit: boolean) => void
  checkMultipleUnit: (multipleUnit: boolean) => void
  checkClosings: (closing: number) => void
  setIsApproved: (isApproved: boolean) => void
}) {
  const { data, isPending, isError, refetch } = useGetListingDetail({ id })
  const navigate = useNavigate()
  const navigateToEditForm = (id: string) => {
    navigate(`/listings/${id}/edit`, { replace: true })
  }
  const location = useLocation()
  const updateSuccess = location.state?.updateSuccess

  const [showAdminNote, setShowAdminNote] = useState(false)

  const toggleAdminNote = () => {
    setShowAdminNote((prev) => !prev)
  }

  const isExpired =
    data?.rawExpiredAt &&
    new Date(data.rawExpiredAt).setHours(0, 0, 0, 0) <=
      new Date().setHours(0, 0, 0, 0)

  useEffect(() => {
    if (updateSuccess) {
      refetch()
    }
  }, [updateSuccess, refetch])

  useEffect(() => {
    setIsApproved(data?.verifyStatus === 'approved')
  }, [data?.verifyStatus, setIsApproved])

  useEffect(() => {
    setCanEdit(data?.userCanEdit ?? false)
  }, [data?.userCanEdit, setCanEdit])

  useEffect(() => {
    checkMultipleUnit(data?.isMultipleUnits ?? false)
  }, [data?.isMultipleUnits, checkMultipleUnit])

  useEffect(() => {
    if (data?.closings) {
      const closingsCount = data.closings.length
      checkClosings(closingsCount)
    }
  }, [data?.closings])

  const actionButton = ({ size }: Omit<ButtonProps, 'children'>) => (
    <>
      <div className="w-full">
        <Button
          fullWidth
          size={size}
          color="blue"
          variant="outlined"
          className="text-sm font-normal capitalize"
          onClick={() => navigateToEditForm(id)}
        >
          Edit
        </Button>
      </div>
      <div className="hidden w-fit lg:block">
        <DotsHeaderButton propertyId={id} />
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col break-words bg-slate-100 pt-16 lg:pt-0">
      <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
        <div className="text-xl font-semibold">Rincian Listing</div>
        <div className="flex gap-3">{actionButton({ size: 'sm' })}</div>
      </div>
      {isError ? (
        <div className="flex grow flex-col items-center justify-center">
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
      ) : isPending ? (
        <div className="flex grow items-center justify-center">Loading...</div>
      ) : (
        data && (
          <>
            {!!data?.pictureUrls?.length && (
              <div className="m-4 mb-0">
                <SwiperSlider pictures={data?.pictureUrls} />
              </div>
            )}
            <div className="grow py-4">
              {(data.listingType || data.propertyType) && (
                <>
                  <div className="flex gap-2 px-4">
                    <Chip
                      variant="outlined"
                      size="sm"
                      value={getLabelForValue(
                        'propertyType',
                        data.propertyType || 'defaultType',
                      )}
                    ></Chip>
                    <Chip
                      variant="outlined"
                      size="sm"
                      value={
                        data.listingForSale && data.listingForRent
                          ? 'Dijual/Disewa'
                          : data.listingForSale
                            ? 'Dijual'
                            : data.listingForRent
                              ? 'Disewa'
                              : null
                      }
                    ></Chip>
                  </div>
                </>
              )}
              <div className="px-4">
                {data?.isPrivate && (
                  <Chip
                    value="PRIVATE"
                    className="mb-1.5 w-fit rounded-full border-2 border-sky-500 bg-indigo-900 px-1.5 py-0.5 shadow"
                  />
                )}
                <Typography variant="small" className="mt-3">
                  Listing ID: {data?.listingIdStr}
                </Typography>
                <Typography variant="h6" className="mt-3 leading-tight">
                  {data?.address}
                </Typography>
                <Typography variant="h4" className="mt-2">
                  {data.listingForSale && !data.listingForRent
                    ? formatCurrencyToIDRText(data.price)
                    : data.listingForRent && !data.listingForSale
                      ? formatCurrencyToIDRText(data.rentPrice) + ' per tahun'
                      : `${formatCurrencyToIDRText(
                          data.price,
                        )} / ${formatCurrencyToIDRText(
                          data.rentPrice,
                        )} per tahun`}
                </Typography>
                <Typography variant="small" className="mt-2 flex">
                  <span className="w-20">Diposting:</span>{' '}
                  <span>{data?.createdAt}</span>
                </Typography>
                <Typography variant="small" className="flex">
                  <span className="w-20">Diperbarui:</span> {data?.updatedAt}
                </Typography>
              </div>
              <Typography variant="small" className="mt-2 flex gap-4 px-4 py-2">
                <span className="flex items-center gap-1">
                  <BedIconSVG />
                  <span>
                    {data?.bedroomCount}
                    {data.additionalBedroomCount
                      ? `+` + `${data.additionalBedroomCount}`
                      : ''}{' '}
                    KT
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <BathIconSVG />
                  <span>
                    {data?.bathroomCount}
                    {data.additionalBathroomCount
                      ? `+` + `${data.additionalBathroomCount}`
                      : ''}{' '}
                    KM
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <HouseIconSVG />
                  <span>{data?.buildingSize} m&sup2;</span>
                </span>
                <span className="flex items-center gap-1">
                  <LotIconSVG />
                  <span>{data?.lotSize} m&sup2;</span>
                </span>
              </Typography>
              <div className="px-3 py-2.5">
                <div className="flex w-full justify-between gap-5">
                  <Typography
                    variant="small"
                    className="flex items-center space-x-2"
                  >
                    {data.verifyStatus !== 'approved' ? (
                      <>
                        {data.verifyStatus === 'rejected' ? (
                          <CancelIconSVG className="text-red-500" />
                        ) : (
                          <NewReleaseIconSVG className="text-slate-500" />
                        )}
                        <span>
                          {getVerifyStatus(data.verifyStatus as VerifyStatus)}
                        </span>
                      </>
                    ) : (
                      <>
                        {data.activeStatus === 'archived' ? (
                          <MinusCircleIconSVG className="w-6 text-slate-600" />
                        ) : data.activeStatus === 'waitlisted' ? (
                          <NewReleaseIconSVG className="text-fireBush-400" />
                        ) : (
                          <VerifyIconSVG className="text-blue-500" />
                        )}
                        <span>
                          {getActiveStatus(data.activeStatus as ActiveStatus)}
                          <MarketerLink data={data}></MarketerLink>
                        </span>
                      </>
                    )}
                    {isExpired && (
                      <div className="py-0.5 pr-3 font-semibold">
                        &nbsp;-&nbsp;
                        <span className="text-red-500">
                          Masa berlaku listing telah berakhir
                        </span>
                      </div>
                    )}
                  </Typography>
                  <div className="flex-1 justify-end text-right lg:max-w-96">
                    {data?.cancellationNote?.status !== undefined && (
                      <div className="inline-block">
                        Status Pembatalan:
                        <span className="ml-2">
                          {getCancellationStatus(
                            data.cancellationNote.status as CancellationStatus,
                          )}
                        </span>
                      </div>
                    )}
                    {data?.closings?.[0]?.status &&
                      data?.closings?.length == 1 && (
                        <div className="inline-block">
                          Status Closing:
                          <span
                            className="ml-2 cursor-pointer underline"
                            onClick={() =>
                              navigate(
                                `/listings/${data.id}/closing/${data?.closings?.[0]?.id}/detail`,
                              )
                            }
                          >
                            {getClosingStatus(
                              data?.closings?.[0]?.status as ClosingStatus,
                            )}
                          </span>
                        </div>
                      )}
                    {data.adminNote?.message &&
                      data.cancellationNote?.status === undefined && (
                        <>
                          <div className="my-2 inline-block lg:my-0 lg:ml-4">
                            <button
                              className="flex text-blue-500"
                              onClick={toggleAdminNote}
                            >
                              {showAdminNote
                                ? 'Tutup Catatan'
                                : 'Lihat Catatan'}
                              <ArrowDownIconSVG
                                className={`ml-2 h-5 w-5 ${
                                  showAdminNote ? 'rotate-180' : 'rotate-0'
                                }`}
                              />
                            </button>
                          </div>
                        </>
                      )}
                  </div>
                </div>
                {showAdminNote && data.adminNote?.message && (
                  <div className="lg:flex lg:justify-between">
                    <div className="my-4 rounded-lg border border-solid border-slate-300 bg-slate-200 p-4 py-3 text-justify lg:ml-auto lg:w-1/2">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: replaceWithBr(data.adminNote.message),
                        }}
                        className="whitespace-pre-wrap text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
              <Card className="mx-4 my-1 bg-slate-50 p-3">
                <div>
                  <Typography variant="h6" className="">
                    Detail Listing
                  </Typography>
                  <div className="mt-2">
                    {data && <DetailListingTable dataTable={data} />}
                  </div>
                </div>
                {data && data.description && (
                  <div className="mt-3">
                    <Typography variant="h6">Deskripsi</Typography>
                    <Typography
                      variant="small"
                      className="mt-2 whitespace-pre-wrap text-sm leading-6"
                    >
                      {data.description}
                    </Typography>
                  </div>
                )}
              </Card>
            </div>
            <div className="sticky bottom-0 border-t lg:border-0">
              {data?.user?.name && (
                <div className="flex items-stretch justify-between gap-5 bg-blue-100 px-4 py-3">
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
              )}
              {data?.userCanEdit && (
                <div className="flex w-full max-w-lg items-stretch gap-4 bg-sky-50 px-4 py-2 lg:hidden">
                  {actionButton({ size: 'md' })}
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
