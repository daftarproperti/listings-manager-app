import { clsx } from 'clsx'
import BottomStickyButton from 'components/button/BottomStickyButton'
import { type ReactNode } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { FILTER_OPTIONS } from './dummy'

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
  propertyType: 'type',
  bedroomCount: 'bedroom_count',
  bathroomCount: 'bathroom_count',
  minLotSize: 'lot_size[min]',
  maxLotSize: 'lot_size[max]',
  minBuildingSize: 'building_size[min]',
  maxBuildingSize: 'building_size[max]',
  ownership: 'ownership',
  carCount: 'car_count',
  electricPower: 'electric_power',
}

const FilterPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const controlSearchParams = (key: string, value?: string) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const onSubmit = () => {
    navigate(`/?${searchParams}`)
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full bg-slate-100">
      <div className="p-4 pb-24">
        <div className="w-full text-lg font-semibold leading-7 text-slate-500">
          Harga
        </div>
        <div className="mt-1 flex justify-between gap-2">
          <CurrencyInput
            placeholder="Rp Minimum"
            prefix="Rp "
            lang="ID"
            decimalSeparator=","
            groupSeparator="."
            value={searchParams.get(filterKeyStrings.minPrice) ?? ''}
            onValueChange={(value) =>
              controlSearchParams(filterKeyStrings.minPrice, value)
            }
            className="flex grow justify-between gap-1 rounded-lg border border-solid border-slate-400 bg-white px-3 py-2.5"
          />
          <CurrencyInput
            placeholder="Rp Maximum"
            prefix="Rp "
            decimalSeparator=","
            groupSeparator="."
            value={searchParams.get(filterKeyStrings.maxPrice) ?? ''}
            onValueChange={(value) =>
              controlSearchParams(filterKeyStrings.maxPrice, value)
            }
            className="flex grow justify-between gap-1 rounded-lg border border-solid border-slate-400 bg-white px-3 py-2.5"
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
          Tipe properti
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.propertyType.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.propertyType) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams(
                    filterKeyStrings.propertyType,
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
            const isActive =
              searchParams.get(filterKeyStrings.bedroomCount) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams(
                    filterKeyStrings.bedroomCount,
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
          Kamar mandi
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.bathroomCount.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.bathroomCount) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams(
                    filterKeyStrings.bathroomCount,
                    isActive ? undefined : option.value,
                  )
                }
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
          {FILTER_OPTIONS.garageCarCapacity.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.carCount) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams(
                    filterKeyStrings.carCount,
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

export default FilterPage
