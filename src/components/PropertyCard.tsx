import { type Property } from 'api/types'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import ImageWithAuth from 'components/ImageWithAuth'
import {
  formatCurrencyToIDRText,
  clipboardCopyIfMiniApp,
  appPath,
  getLabelForValue,
} from 'utils'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const PropertyCard = ({ data }: { data: Property }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const onClickCard = (id: string) => {
    navigate(`/properties/${id}`)
  }

  const searchParams = new URLSearchParams(location.search)
  const listingForSaleParam = searchParams.get('listingForSale') === 'true'
  const listingForRentParam = searchParams.get('listingForRent') === 'true'

  const getPriceDisplay = (data: Property) => {
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
    <div className="flex flex-col rounded-lg border bg-white">
      <div
        className="relative flex cursor-pointer justify-between gap-0"
        onClick={() => onClickCard(data?.id ?? '')}
      >
        {!!data.pictureUrls?.length && (
          <ImageWithAuth link={data.pictureUrls[0]} />
        )}
        <div className="flex flex-1 flex-col">
          <div className="px-3 py-1">
            <div className="text-xs leading-4 text-slate-500">{data.title}</div>
            <div className="mt-2 flex flex-col">
              <div className="text-2xl font-semibold leading-8 text-slate-800">
                {getPriceDisplay(data)}
              </div>
              <div className="mt-1.5 line-clamp-3 text-xs leading-4 text-slate-500">
                {data.address}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap content-start gap-x-4 gap-y-1 border-t border-solid border-t-slate-200 px-3 py-2">
            <div className="flex items-center justify-between gap-1">
              <BedIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.bedroomCount} KT
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <BathIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.bathroomCount} KM
              </div>
            </div>
            <div className="flex items-center justify-start gap-1">
              <HouseIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.buildingSize}m2
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <LotIconSVG />
              <div className="grow self-stretch whitespace-nowrap text-base leading-6 text-slate-800">
                {data.lotSize}m2
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
      {contact?.name && (
        <div className="flex w-full justify-between gap-5 rounded-b-lg bg-blue-100 px-3 py-2.5">
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
    </div>
  )
}

export default PropertyCard
