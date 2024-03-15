import { clsx } from 'clsx'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'

import { FILTER_OPTIONS } from './constant'

const ButtonFilterChip = ({
  children,
  isActive,
  ...props
}: {
  children: ReactNode
  isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={clsx(
      `w-fit cursor-pointer justify-center whitespace-nowrap rounded-3xl border border-solid border-primary-500 px-3 py-2 text-sm leading-5 hover:bg-primary-500 hover:text-white`,
      isActive ? 'bg-primary-500 text-white' : 'bg-white text-primary-500',
    )}
  >
    {children}
  </button>
)

const filterKeyStrings = {
  minPrice: 'price[min]',
  maxPrice: 'price[max]',
  listingType: 'type',
  bedroomCount: 'bedroomCount',
  bathroomCount: 'bathroomCount',
  minLotSize: 'lotSize[min]',
  maxLotSize: 'lotSize[max]',
  minBuildingSize: 'buildingSize[min]',
  maxBuildingSize: 'buildingSize[max]',
  ownership: 'ownership',
  carCount: 'carCount',
  electricPower: 'electricPower',
}

const FilterForm = ({ type }: { type: 'listing' | 'property' }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const controlSearchParams = (key: string, value?: string) => {
    searchParams.delete(key)
    searchParams.delete(`${key}[min]`)

    if (value) {
      if (
        key === 'bedroomCount' ||
        key === 'bathroomCount' ||
        key === 'carCount'
      ) {
        const minCountValue = value.replace('+', '')
        searchParams.set(`${key}[min]`, minCountValue)
      } else {
        searchParams.set(key, value)
      }
    }

    setSearchParams(searchParams, { replace: true })
  }

  const onSubmit = () => {
    if (type === 'listing') {
      navigate(`/?${searchParams}`)
    } else {
      navigate(`/properties?${searchParams}`)
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full bg-slate-100">
      <div className="p-4 pb-24 pt-20">
        <div className="w-full text-lg font-semibold leading-7 text-slate-500">
          Harga
        </div>
        <div className="mt-1 flex w-full justify-between">
          <NumericFormat
            placeholder="Rp Minimum"
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            decimalScale={2}
            value={searchParams.get(filterKeyStrings.minPrice) ?? ''}
            onValueChange={(event) =>
              controlSearchParams(filterKeyStrings.minPrice, event.value)
            }
            className="mr-2 w-1/2 justify-between gap-1 rounded-lg border border-solid border-slate-400 bg-white px-3 py-2.5"
          />
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            decimalScale={2}
            placeholder="Rp Maximum"
            value={searchParams.get(filterKeyStrings.maxPrice) ?? ''}
            onValueChange={(event) =>
              controlSearchParams(filterKeyStrings.maxPrice, event.value)
            }
            className="ml-2 w-1/2 justify-between gap-1 rounded-lg border border-solid border-slate-400 bg-white px-3 py-2.5"
          />
        </div>
        <div className="mt-2 inline-grid grid-cols-3 gap-2">
          {FILTER_OPTIONS.priceRange.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.minPrice) ===
                option.minValue.toString() &&
              searchParams.get(filterKeyStrings.maxPrice) ===
                option.maxValue.toString()
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    searchParams.delete(filterKeyStrings.minPrice)
                    searchParams.delete(filterKeyStrings.maxPrice)
                  } else {
                    searchParams.set(
                      filterKeyStrings.minPrice,
                      option.minValue.toString(),
                    )
                    searchParams.set(
                      filterKeyStrings.maxPrice,
                      option.maxValue.toString(),
                    )
                  }
                  setSearchParams(searchParams, { replace: true })
                }}
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-black">
          Tipe Listing
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.listingType.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.listingType) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams(
                    filterKeyStrings.listingType,
                    isActive ? undefined : option.value,
                  )
                }
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-black">
          Kamar tidur
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.bedroomCount.options.map((option, index) => {
            const minValue = searchParams.get(
              `${filterKeyStrings.bedroomCount}[min]`,
            )
            const optionMinValue = option.value.replace('+', '')
            const isActive = minValue === optionMinValue

            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    searchParams.delete(`${filterKeyStrings.bedroomCount}[min]`)
                  } else {
                    searchParams.set(
                      `${filterKeyStrings.bedroomCount}[min]`,
                      optionMinValue,
                    )
                  }
                  setSearchParams(searchParams, { replace: true })
                }}
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-black">
          Kamar mandi
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.bathroomCount.options.map((option, index) => {
            const minValue = searchParams.get(
              `${filterKeyStrings.bathroomCount}[min]`,
            )
            const optionMinValue = option.value.replace('+', '')
            const isActive = minValue === optionMinValue
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    searchParams.delete(
                      `${filterKeyStrings.bathroomCount}[min]`,
                    )
                  } else {
                    searchParams.set(
                      `${filterKeyStrings.bathroomCount}[min]`,
                      optionMinValue,
                    )
                  }
                  setSearchParams(searchParams, { replace: true })
                }}
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-500">
          Luas Tanah
        </div>
        <div className="mt-1 flex gap-2">
          <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
            <input
              placeholder="Minimum"
              type="number"
              className="h-full w-full rounded-lg border-none p-3 py-3.5 ring-0"
              value={searchParams.get(filterKeyStrings.minLotSize) ?? ''}
              onChange={(event) =>
                controlSearchParams(
                  filterKeyStrings.minLotSize,
                  event.target.value,
                )
              }
            />
            <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-400">
              m2
            </span>
          </div>
          <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
            <input
              placeholder="Maximum"
              type="number"
              value={searchParams.get(filterKeyStrings.maxLotSize) ?? ''}
              onChange={(event) =>
                controlSearchParams(
                  filterKeyStrings.maxLotSize,
                  event.target.value,
                )
              }
              className="h-full w-full rounded-lg border-none p-3 py-3.5 ring-0"
            />
            <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-400">
              m2
            </span>
          </div>
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-500">
          Luas bangunan
        </div>
        <div className="mt-1 flex gap-2">
          <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
            <input
              placeholder="Minimum"
              type="number"
              value={searchParams.get(filterKeyStrings.minBuildingSize) ?? ''}
              onChange={(event) =>
                controlSearchParams(
                  filterKeyStrings.minBuildingSize,
                  event.target.value,
                )
              }
              className="h-full w-full rounded-lg border-none p-3 py-3.5 ring-0"
            />
            <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-400">
              m2
            </span>
          </div>
          <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
            <input
              placeholder="Maximum"
              type="number"
              value={searchParams.get(filterKeyStrings.maxBuildingSize) ?? ''}
              onChange={(event) =>
                controlSearchParams(
                  filterKeyStrings.maxBuildingSize,
                  event.target.value,
                )
              }
              className="h-full w-full rounded-lg border-none p-3 py-3.5 ring-0"
            />
            <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-400">
              m2
            </span>
          </div>
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-black">
          Sertifikat
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.certificate.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.ownership) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams(
                    filterKeyStrings.ownership,
                    isActive ? undefined : option.value,
                  )
                }
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-black">
          Kapasitas garasi mobil
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.carCount.options.map((option, index) => {
            const minValue = searchParams.get(
              `${filterKeyStrings.carCount}[min]`,
            )
            const optionMinValue = option.value.replace('+', '')
            const isActive = minValue === optionMinValue
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    searchParams.delete(`${filterKeyStrings.carCount}[min]`)
                  } else {
                    searchParams.set(
                      `${filterKeyStrings.carCount}[min]`,
                      optionMinValue,
                    )
                  }
                  setSearchParams(searchParams, { replace: true })
                }}
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-black">
          Listrik
        </div>
        <div className="mt-2 inline-grid grid-cols-4 gap-2">
          {FILTER_OPTIONS.electricity.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.electricPower) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams(
                    filterKeyStrings.electricPower,
                    isActive ? undefined : option.value,
                  )
                }
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
      </div>
      <BottomStickyButton type="submit">Lihat Hasil Filter</BottomStickyButton>
    </form>
  )
}

export default FilterForm
