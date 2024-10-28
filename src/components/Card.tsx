import type {
  Listing,
  VerifyStatus,
  ActiveStatus,
  ClosingStatus,
} from 'api/types'
import {
  BathIconSVG,
  BedIconSVG,
  CancelIconSVG,
  HouseIconSVG,
  LotIconSVG,
  NewReleaseIconSVG,
  VerifyIconSVG,
  ArrowDownIconSVG,
  MinusCircleIconSVG,
} from 'assets/icons'
import MarketerLink from 'components/MarketerLink'
import {
  formatCurrencyToIDRText,
  getLabelForValue,
  getVerifyStatus,
  getActiveStatus,
  replaceWithBr,
  getClosingStatus,
} from 'utils'
import { useNavigate, useLocation } from 'react-router-dom'
import { Img } from 'react-image'
import { Button } from '@material-tailwind/react'
import { useState } from 'react'

const Card = ({ data }: { data: Listing }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateToEditForm = (id: string) => {
    navigate(`/listings/${id}/edit`)
  }
  const onClickCard = (id: string) => {
    navigate(`/listings/${id}`)
  }

  const searchParams = new URLSearchParams(location.search)
  const listingForSaleParam = searchParams.get('listingForSale') === 'true'
  const listingForRentParam = searchParams.get('listingForRent') === 'true'
  const [showAdminNote, setShowAdminNote] = useState(true)

  const toggleAdminNote = () => {
    setShowAdminNote((prev) => !prev)
  }

  const getPriceDisplay = (data: Listing) => {
    if (listingForSaleParam) return formatCurrencyToIDRText(data.price)
    if (listingForRentParam)
      return `${formatCurrencyToIDRText(data.rentPrice)} per tahun`
    if (!listingForSaleParam && !listingForRentParam) {
      if (data.listingForSale && data.listingForRent) {
        return `${formatCurrencyToIDRText(
          data.price,
        )} / ${formatCurrencyToIDRText(data.rentPrice)} per tahun`
      } else if (data.listingForSale) {
        return formatCurrencyToIDRText(data.price)
      } else if (data.listingForRent) {
        return `${formatCurrencyToIDRText(data.rentPrice)} per tahun`
      } else {
        return formatCurrencyToIDRText(data.price)
      }
    }
  }

  const isExpired =
    data.rawExpiredAt &&
    new Date(data.rawExpiredAt).setHours(0, 0, 0, 0) <=
      new Date().setHours(0, 0, 0, 0)

  return (
    <div className="flex flex-col rounded-lg bg-white shadow-sm">
      <div
        className="relative flex cursor-pointer justify-between gap-0"
        onClick={() => onClickCard(data?.id ?? '')}
      >
        {!!data.pictureUrls?.length && data.isPrivate && (
          <span className="absolute m-2 w-fit justify-center rounded-xl border-2 border-solid border-sky-500 bg-indigo-900 px-1.5 py-0.5 text-xs leading-4 text-indigo-50 shadow-sm">
            PRIVATE
          </span>
        )}
        {!!data.pictureUrls?.length && (
          <div className="relative flex w-1/3 flex-col overflow-hidden">
            <Img
              src={data.pictureUrls[0]}
              className="h-full rounded-tl-lg object-cover lg:max-h-80"
              unloader={
                <div className="absolute inset-0 flex items-center justify-center rounded-tl-lg bg-slate-300">
                  <p className="text-xs text-slate-500">Image not found</p>
                </div>
              }
            />
          </div>
        )}
        <div className="flex flex-1 flex-col">
          <div className="px-3 py-2">
            <div className="text-xs leading-4 text-slate-500">
              {data.address}
            </div>
            <div className="mt-2 flex flex-col">
              <div className="text-2xl font-semibold leading-8 text-slate-800">
                {getPriceDisplay(data)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap content-start gap-x-4 gap-y-1 border-t border-solid border-t-slate-200 px-3 py-2">
            <div className="flex items-center justify-between gap-1">
              <BedIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.bedroomCount}
                {data.additionalBedroomCount
                  ? `+` + `${data.additionalBedroomCount}`
                  : ''}{' '}
                KT
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <BathIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.bathroomCount}
                {data.additionalBathroomCount
                  ? `+` + `${data.additionalBathroomCount}`
                  : ''}{' '}
                KM
              </div>
            </div>
            <div className="flex items-center justify-start gap-1">
              <HouseIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.buildingSize} m2
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <LotIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.lotSize ? `${data.lotSize} m2` : '-'}
              </div>
            </div>
          </div>
          {(data.listingType || data.propertyType) && (
            <>
              <div className="flex flex-wrap content-start gap-x-4 gap-y-1 border-t border-solid border-t-slate-200 px-3 py-2 text-[10px] text-slate-400">
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
        </div>
      </div>
      <div className="w-full justify-end gap-5 rounded-b-lg bg-blue-100 px-3 py-2.5">
        <div className="flex justify-between gap-4">
          <div className="flex items-center space-x-2 pb-2 text-sm">
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
              <div className="py-0.5 pr-3 text-sm font-semibold">
                &nbsp;-&nbsp;
                <span className="text-red-500">
                  Masa berlaku listing telah berakhir
                </span>
              </div>
            )}
          </div>
          <div className="lg:flex">
            {data?.closings?.[0]?.status && data?.closings?.length == 1 && (
              <div className="inline-block text-sm">
                Status Closing: &nbsp;
                <span
                  className="cursor-pointer underline"
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
            {data.adminNote?.message && (
              <div className="my-2 ml-2 flex-1 justify-end text-right text-sm lg:my-0 lg:max-w-96">
                <div className="inline-block">
                  <button
                    className="flex text-blue-500"
                    onClick={toggleAdminNote}
                  >
                    {showAdminNote ? 'Tutup Catatan' : 'Lihat Catatan'}
                    <ArrowDownIconSVG
                      className={`ml-2 h-5 w-5 ${
                        showAdminNote ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {showAdminNote && data.adminNote?.message && (
          <div className="mb-2 block w-full rounded-lg border border-solid border-slate-300 bg-amber-100 p-4 py-3 text-justify">
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(data.adminNote.message),
              }}
              className="whitespace-pre-wrap text-sm"
            />
          </div>
        )}
        <Button
          size="sm"
          fullWidth
          color="blue"
          variant="outlined"
          onClick={() => navigateToEditForm(data?.id ?? '')}
          className="bg-white text-center text-sm font-normal capitalize"
        >
          Edit
        </Button>
      </div>
    </div>
  )
}

export default Card
