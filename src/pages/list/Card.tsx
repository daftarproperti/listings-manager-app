import { Property } from 'api/types'
import BathIconSVG from 'assets/icons/BathIconSVG'
import BedIconSVG from 'assets/icons/BedIconSVG'
import HouseIconSVG from 'assets/icons/HouseIconSVG'
import LotIconSVG from 'assets/icons/LotIconSVG'
import { classNames, formatCurrencyToIDRText } from 'utils'

export default function Card({ data }: { data: Property }) {
  return (
    <div className="flex flex-col rounded-lg border">
      <div className="flex justify-between gap-0">
        {data.contacts?.profilePictureURL && (
          <div className="relative flex w-1/2 flex-col overflow-hidden p-2">
            <img
              loading="lazy"
              src={data.contacts?.profilePictureURL}
              className="absolute inset-0 h-full w-full rounded-tl-lg object-cover object-center"
            />
            <span className="relative w-fit justify-center rounded-xl border-2 border-solid border-sky-500 bg-indigo-900 px-1.5 py-0.5 text-xs leading-4 text-indigo-50 shadow-sm">
              PRIVATE
            </span>
          </div>
        )}
        <div className="flex flex-col px-3 py-0.5">
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
              className={classNames(
                'grid gap-2',
                data.contacts?.profilePictureURL
                  ? 'grid-cols-2'
                  : 'grid-cols-4',
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
          <div className="aspect-square w-8 max-w-full shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-400">
            <img
              loading="lazy"
              src={data.contacts?.profilePictureURL}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <div className="flex grow basis-[0%] flex-col self-stretch">
            <div className="text-sm font-semibold leading-5 text-slate-800">
              Yayuk Timoho
            </div>
            <div className="text-sm leading-5 text-slate-500">08223226588</div>
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
