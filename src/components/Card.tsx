import { type Listing } from 'api/types'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import ImageWithAuth from 'components/ImageWithAuth'
import { formatCurrencyToIDRText, getLabelForValue } from 'utils'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { EyeIcon } from '@heroicons/react/24/solid'

const Card = ({ data }: { data: Listing }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateToEditForm = (id: string) => {
    navigate(`/listings/edit/${id}`)
  }
  const onClickCard = (id: string) => {
    navigate(`/listings/${id}`)
  }

  const searchParams = new URLSearchParams(location.search)
  const listingForSaleParam = searchParams.get('listingForSale') === 'true'
  const listingForRentParam = searchParams.get('listingForRent') === 'true'

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
          <ImageWithAuth link={data.pictureUrls[0]} />
        )}
        <div className="flex flex-1 flex-col">
          <div className="px-3 py-2">
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
      {import.meta.env.VITE_FEATURE_VIEW_COUNT === 'true' && (
        <div className="flex bg-slate-200 px-4 py-3">
          <div className="flex gap-1">
            <EyeIcon className="w-5 text-slate-500" />
            <div className="shrink-0 text-slate-800">
              Dilihat: {data.viewCount}
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full justify-end gap-5 rounded-b-lg bg-blue-100 px-3 py-2.5">
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
