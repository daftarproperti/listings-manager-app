import { type Property } from 'api/types'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import { clsx } from 'clsx'
import ImageWithAuth from 'components/ImageWithAuth'
import { formatCurrencyToIDRText } from 'utils'

const Card = ({ data }: { data: Property }) => {
  return (
    <div className="flex flex-col rounded-lg border">
      <div className="relative flex justify-between gap-0">
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
        <div className="flex items-center justify-between gap-2">
          <div className="aspect-square w-8 max-w-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-300">
            <img
              loading="lazy"
              src={data.contacts?.profilePictureURL}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <div className="flex grow basis-[0%] flex-col self-stretch">
            <div className="text-sm font-semibold leading-5 text-slate-800">
              {data.contacts?.name}
            </div>
            <div className="text-sm leading-5 text-slate-500">
              {data.contacts?.phoneNumber}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => e.stopPropagation()}
          className="justify-center self-center whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2 text-center text-sm leading-5 text-slate-50"
        >
          Bagikan
        </button>
      </div>
    </div>
  )
}

export default Card
