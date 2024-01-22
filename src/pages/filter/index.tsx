import { ReactNode } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { useNavigate, useSearchParams } from 'react-router-dom'

import BottomStickyButton from 'components/button/BottomStickyButton'
import { classNames } from 'utils'
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
    className={classNames(
      `w-fit cursor-pointer justify-center whitespace-nowrap rounded-3xl border border-solid border-primary-500 px-3 py-2 text-sm leading-5 hover:bg-primary-500 hover:text-white`,
      isActive ? 'bg-primary-500 text-white' : 'bg-white text-primary-500',
    )}
  >
    {children}
  </button>
)

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
            value={searchParams.get('minp') ?? ''}
            onValueChange={(value) => controlSearchParams('minp', value)}
            className="flex grow justify-between gap-1 rounded-lg border border-solid border-slate-400 bg-white px-3 py-2.5"
          />
          <CurrencyInput
            placeholder="Rp Maximum"
            prefix="Rp "
            decimalSeparator=","
            groupSeparator="."
            value={searchParams.get('maxp') ?? ''}
            onValueChange={(value) => controlSearchParams('maxp', value)}
            className="flex grow justify-between gap-1 rounded-lg border border-solid border-slate-400 bg-white px-3 py-2.5"
          />
        </div>
        <div className="mt-2 inline-grid grid-cols-3 gap-2">
          {FILTER_OPTIONS.priceRange.options.map((option, index) => {
            const isActive =
              searchParams.get('minp') === option.minValue.toString() &&
              searchParams.get('maxp') === option.maxValue.toString()
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    searchParams.delete('minp')
                    searchParams.delete('maxp')
                  } else {
                    searchParams.set('minp', option.minValue.toString())
                    searchParams.set('maxp', option.maxValue.toString())
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
            const isActive = searchParams.get('pt') === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams('pt', isActive ? undefined : option.value)
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
            const isActive = searchParams.get('bd') === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams('bd', isActive ? undefined : option.value)
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
            const isActive = searchParams.get('bt') === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams('bt', isActive ? undefined : option.value)
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
              value={searchParams.get('minl') ?? ''}
              onChange={(event) =>
                controlSearchParams('minl', event.target.value)
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
              value={searchParams.get('maxl') ?? ''}
              onChange={(event) =>
                controlSearchParams('maxl', event.target.value)
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
              value={searchParams.get('minb') ?? ''}
              onChange={(event) =>
                controlSearchParams('minb', event.target.value)
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
              value={searchParams.get('maxb') ?? ''}
              onChange={(event) =>
                controlSearchParams('maxb', event.target.value)
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
            const isActive = searchParams.get('ct') === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams('ct', isActive ? undefined : option.value)
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
            const isActive = searchParams.get('cr') === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams('cr', isActive ? undefined : option.value)
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
            const isActive = searchParams.get('el') === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() =>
                  controlSearchParams('el', isActive ? undefined : option.value)
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
