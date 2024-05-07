import { clsx } from 'clsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { searchparamsToSavedSearch, useValidateMinMaxValue } from 'utils'
import { useAddSavedSearch, useUpdateSavedSearch } from 'api/queries'
import { ArrowDownIconSVG } from 'assets/icons'

import { FILTER_OPTIONS } from './constant'
import BottomStickyButton from '../button/BottomStickyButton'

const ButtonFilterChip = ({
  children,
  isActive,
  onClick,
}: {
  isActive?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => (
  <Button
    size="sm"
    color="blue"
    variant={isActive ? 'filled' : 'outlined'}
    className={clsx(
      'w-fit rounded-full text-sm font-normal capitalize',
      !isActive && 'bg-white',
    )}
    onClick={onClick}
  >
    {children}
  </Button>
)

export const filterKeyStrings = {
  minPrice: 'price[min]',
  maxPrice: 'price[max]',
  propertyType: 'propertyType',
  bedroomCount: 'bedroomCount[min]',
  bathroomCount: 'bathroomCount[min]',
  minLotSize: 'lotSize[min]',
  maxLotSize: 'lotSize[max]',
  minBuildingSize: 'buildingSize[min]',
  maxBuildingSize: 'buildingSize[max]',
  ownership: 'ownership',
  carCount: 'carCount[min]',
  electricPower: 'electricPower',
  city: 'city',
}

type FilterFormProps = {
  type: 'listing' | 'property' | 'savedSearch'
}

const FilterForm = ({ type }: FilterFormProps) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { validationMessage } = useValidateMinMaxValue(searchParams)

  const { mutate: addSearch, isPending: loadingAdd } = useAddSavedSearch()
  const { mutate: updateSearch, isPending: loadingUpdate } =
    useUpdateSavedSearch()

  const controlSearchParams = (key: string, value?: string) => {
    searchParams.delete(key)
    if (value) {
      searchParams.set(key, value)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const handleSuccess = () => {
    toast('Permintaan berhasil disimpan!', { type: 'success' })
    navigate(-1)
  }

  const handleError = (error: Error) => {
    toast(`Mohon maaf, telah terjadi kesalahan (${error?.message})`, {
      type: 'error',
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const search = searchparamsToSavedSearch(searchParams)
    const searchId = searchParams.get('searchId')
    switch (type) {
      case 'savedSearch':
        if (searchId) {
          updateSearch(
            { id: searchId, requestBody: search },
            {
              onSuccess: handleSuccess,
              onError: handleError,
            },
          )
          break
        }
        addSearch(search, {
          onSuccess: handleSuccess,
          onError: handleError,
        })
        break
      case 'property':
        navigate(`/properties?${searchParams}`)
        break
      default:
        navigate(`/?${searchParams}`)
        break
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full bg-slate-100">
      <div className="p-4 pb-24 pt-20">
        {type === 'savedSearch' && (
          <>
            <div className="w-full text-lg font-semibold leading-7 text-slate-800">
              Judul
            </div>
            <div className="mb-6 mt-1 flex w-full">
              <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
                <input
                  required
                  type="text"
                  placeholder="cth: Nama calon pembeli"
                  className="h-full w-full rounded-lg border-none p-3 py-3.5 ring-0"
                  value={searchParams.get('title') ?? ''}
                  onChange={(event) =>
                    controlSearchParams('title', event.target.value)
                  }
                />
              </div>
            </div>
          </>
        )}
        <div className="w-full text-lg font-semibold leading-7 text-slate-800">
          Harga
        </div>
        <div className="mt-1 flex w-full justify-between gap-2">
          <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
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
              className="h-full w-full rounded-lg border-none p-3 py-3.5 ring-0"
            />
          </div>
          <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
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
              className="h-full w-full rounded-lg border-none p-3 py-3.5 ring-0"
            />
          </div>
        </div>
        <span className="self-stretch text-sm text-red-500">
          {validationMessage('price')}
        </span>
        <div className="mt-2 inline-grid grid-cols-3 gap-2">
          {FILTER_OPTIONS.priceRange.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.minPrice) ===
                option.minValue.toString() &&
              (searchParams.get(filterKeyStrings.maxPrice) ?? '') ===
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
          Tipe Properti
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
          Kota
        </div>
        <div className="relative mt-2 flex flex-wrap gap-2">
          <select
            name="city"
            value={searchParams.get(filterKeyStrings.city) || ''}
            onChange={(event) =>
              controlSearchParams(filterKeyStrings.city, event.target.value)
            }
            className="h-full w-full appearance-none rounded-lg border border-solid border-slate-400 p-3 py-3.5 ring-0"
          >
            <option>Pilih Kota</option>
            {FILTER_OPTIONS.city.options.map((option, index) => (
              <option value={option.value} key={index}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-3.5 group-hover:pointer-events-auto">
            <ArrowDownIconSVG />
          </div>
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
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
                onClick={() => {
                  controlSearchParams(
                    filterKeyStrings.bedroomCount,
                    isActive ? undefined : option.value,
                  )
                }}
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
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
                onClick={() => {
                  controlSearchParams(
                    filterKeyStrings.bathroomCount,
                    isActive ? undefined : option.value,
                  )
                }}
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
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
        <span className="self-stretch text-sm text-red-500">
          {validationMessage('lotSize')}
        </span>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
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
        <span className="self-stretch text-sm text-red-500">
          {validationMessage('buildingSize')}
        </span>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
          Kapasitas Mobil
        </div>
        <div className="mt-2 flex gap-2">
          {FILTER_OPTIONS.carCount.options.map((option, index) => {
            const isActive =
              searchParams.get(filterKeyStrings.carCount) === option.value
            return (
              <ButtonFilterChip
                key={index}
                type="button"
                isActive={isActive}
                onClick={() => {
                  controlSearchParams(
                    filterKeyStrings.carCount,
                    isActive ? undefined : option.value,
                  )
                }}
              >
                {option.label}
              </ButtonFilterChip>
            )
          })}
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 text-slate-800">
          Listrik
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
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
      <BottomStickyButton type="submit" disabled={loadingAdd || loadingUpdate}>
        {type === 'savedSearch' ? 'Simpan' : 'Lihat Hasil Filter'}
      </BottomStickyButton>
    </form>
  )
}

export default FilterForm
