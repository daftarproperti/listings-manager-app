import { type Property } from 'api/types'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import { clsx } from 'clsx'
import ImageWithAuth from 'components/ImageWithAuth'
import { formatCurrencyToIDRText, clipboardCopyIfMiniApp } from 'utils'
import { useNavigate } from 'react-router-dom'

const PropertyCard = ({ data }: { data: Property }) => {
  const navigate = useNavigate()
  const onClickCard = (id: string) => {
    navigate(`/properties/${id}`)
  }

  return (
    <div className="flex flex-col rounded-lg border bg-white">
      <div
        className="relative flex cursor-pointer justify-between gap-0"
        onClick={() => onClickCard(data?.id ?? '')}
      >
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
        <div className="w-full py-1 text-right">
          <a
            href={`tel:${data?.listings?.[0]?.user?.phoneNumber}`}
            className="justify-center self-center whitespace-nowrap rounded-lg bg-primary-500 px-4 py-2.5 text-center text-sm leading-5 text-slate-50"
            onClick={(e) => {
              e.stopPropagation()
              const phoneNumber = data?.listings?.[0]?.user?.phoneNumber
              clipboardCopyIfMiniApp(phoneNumber, e)
            }}
          >
            Hubungi
          </a>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
