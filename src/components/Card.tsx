import { type Listing } from 'api/types'
import { BathIconSVG, BedIconSVG, HouseIconSVG, LotIconSVG } from 'assets/icons'
import ImageWithAuth from 'components/ImageWithAuth'
import { formatCurrencyToIDRText } from 'utils'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const Card = ({ data }: { data: Listing }) => {
  const navigate = useNavigate()
  const navigateToEditForm = (id: string) => {
    navigate(`/listings/edit/${id}`)
  }
  const onClickCard = (id: string) => {
    navigate(`/listings/${id}`)
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
          <div className="px-3 py-1">
            <div className="text-xs leading-4 text-slate-500">{data.title}</div>
            <div className="mt-2 flex flex-col">
              <div className="text-2xl font-semibold leading-8 text-slate-800">
                {formatCurrencyToIDRText(data.price)}
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
        </div>
      </div>
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
