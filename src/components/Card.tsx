import { type Listing } from 'api/types'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import { clsx } from 'clsx'
import ImageWithAuth from 'components/ImageWithAuth'
import { formatCurrencyToIDRText } from 'utils'
import { useNavigate } from 'react-router-dom'

const Card = ({ data, fromPage }: { data: Listing; fromPage: string }) => {
  const navigate = useNavigate()
  const navigateToEditForm = (id: string) => {
    navigate(`/listings/edit/${id}`)
  }
  const onClickCard = (id: string) => {
    navigate(`/listings/${id}`)
  }

  return (
    <div className="flex flex-col rounded-lg border bg-white">
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
        <div className="flex flex-1 flex-col px-3 py-2">
          <div className="text-xs leading-4 text-slate-500">{data.title}</div>
          <div className="mt-2 flex flex-col">
            <div className="text-2xl font-semibold leading-8 text-slate-800">
              Rp {formatCurrencyToIDRText(data.price)}
            </div>
            <div className="mt-1.5 line-clamp-3 text-xs leading-4 text-slate-500">
              {data.address}
            </div>
          </div>
          <div className="mt-1 flex flex-col flex-wrap content-start border-t border-solid border-t-slate-200 py-2">
            <div
              className={clsx(
                'grid gap-2',
                data.pictureUrls ? 'grid-cols-2' : 'grid-cols-4',
              )}
            >
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
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between gap-5 rounded-none bg-primary-100 px-3 py-2.5">
        {fromPage === 'listings' && (
          <button
            onClick={() => navigateToEditForm(data?.id ?? '')}
            className="w-full justify-center self-center whitespace-nowrap rounded-lg border border-solid border-primary-500 bg-white px-4 py-2 text-center text-sm leading-5 text-primary-500"
          >
            Edit
          </button>
        )}
        {fromPage === 'properties' && (
          <div className="w-full py-1 text-right">
            <a
              href={`tel:${data?.user?.phoneNumber}`}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="justify-center self-center whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-center text-sm leading-5 text-slate-50"
            >
              Hubungi
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
