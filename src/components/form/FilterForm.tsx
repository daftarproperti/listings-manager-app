import { clsx } from 'clsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import {
  searchparamsToSavedSearch,
  useValidateMinMaxValue,
  convertAbbreviationToNumber,
  formatNumber,
} from 'utils'
import {
  useAddSavedSearch,
  useUpdateSavedSearch,
  fetchDefaultCities,
  getDebouncedCities,
  getCityById,
} from 'api/queries'
import { ArrowDownIconSVG } from 'assets/icons'
import AsyncSelect from 'react-select/async'
import { type CityOption } from 'api/types'
import { useEffect, useState } from 'react'

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

const customStyles = {
  control: () => ({
    width: '100%',
    border: '1px solid #C6CAFF',
    borderRadius: '0.5rem',
    padding: '0.2rem 2.2rem 0.2rem 0.3rem',
    height: '46px',
    boxShadow: 'none',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    background: 'white',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  clearIndicator: () => ({
    padding: '0 8px',
  }),
}

export const filterKeyStrings = {
  minPrice: 'price[min]',
  maxPrice: 'price[max]',
  minRentPrice: 'rentPrice[min]',
  maxRentPrice: 'rentPrice[max]',
  propertyType: 'propertyType',
  listingForSale: 'listingForSale',
  listingForRent: 'listingForRent',
  bedroomCount: 'bedroomCount[min]',
  bathroomCount: 'bathroomCount[min]',
  minLotSize: 'lotSize[min]',
  maxLotSize: 'lotSize[max]',
  minBuildingSize: 'buildingSize[min]',
  maxBuildingSize: 'buildingSize[max]',
  ownership: 'ownership',
  carCount: 'carCount[min]',
  electricPower: 'electricPower',
  cityId: 'cityId',
}

type FilterFormProps = {
  type: 'listing' | 'property' | 'savedSearch'
}

const FilterForm = ({ type }: FilterFormProps) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { validationMessage } = useValidateMinMaxValue(searchParams)
  const [defaultCityOptions, setDefaultCityOptions] = useState<CityOption[]>([])
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null)
  const cityIdParam = searchParams.get(filterKeyStrings.cityId)

  useEffect(() => {
    const loadDefaultCity = async () => {
      if (cityIdParam) {
        try {
          const city = await getCityById(parseInt(cityIdParam))
          if (city) {
            const defaultCity = {
              label: city.name || 'Unknown city',
              value: city.id || 0,
            }
            setSelectedCity(defaultCity as CityOption)
          }
        } catch (error) {
          console.error('Error fetching city by ID:', error)
        }
      }
    }

    loadDefaultCity()
    fetchDefaultCities().then((cities) => {
      const cityOptions = cities.map((city) => ({
        label: city.name || 'Unknown city',
        value: city.id || 0,
      }))
      setDefaultCityOptions(cityOptions)
    })
  }, [cityIdParam])

  const searchId = searchParams.get('searchId')

  const { mutate: addSearch, isPending: loadingAdd } = useAddSavedSearch()
  const { mutate: updateSearch, isPending: loadingUpdate } =
    useUpdateSavedSearch()

  const listingForRent =
    searchParams.get(filterKeyStrings.listingForRent) === 'true'
  const listingForSale =
    searchParams.get(filterKeyStrings.listingForSale) === 'true'

  const controlSearchParams = (
    key: string,
    value?: string,
    exclusiveKey?: string,
  ) => {
    if (exclusiveKey) {
      searchParams.delete(exclusiveKey)

      if (exclusiveKey === 'listingForSale') {
        searchParams.delete(filterKeyStrings.minPrice)
        searchParams.delete(filterKeyStrings.maxPrice)
      } else if (exclusiveKey === 'listingForRent') {
        searchParams.delete(filterKeyStrings.minRentPrice)
        searchParams.delete(filterKeyStrings.maxRentPrice)
      }
    }

    searchParams.delete(key)

    if (value === undefined || value === null || value === '') {
      searchParams.delete(key)
    } else if (
      key === 'price[min]' ||
      key === 'price[max]' ||
      key === 'rentPrice[min]' ||
      key === 'rentPrice[max]'
    ) {
      searchParams.set(key, value.replace('Rp', '').trim())
    } else {
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
    <form onSubmit={onSubmit} className="w-full bg-inherit">
      {type === 'savedSearch' && (
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
          <div className="text-xl font-semibold">
            {searchId ? 'Edit' : 'Tambah'} Permintaan
          </div>
          <Button
            size="sm"
            color="blue"
            type="submit"
            className="flex items-center gap-2 text-sm font-normal capitalize"
            disabled={loadingAdd || loadingUpdate}
          >
            Simpan
          </Button>
        </div>
      )}
      <div
        className={`p-4 pb-24 pt-20 ${
          type === 'savedSearch' ? 'lg:w-4/5 lg:p-4' : 'lg:p-0'
        }`}
      >
        {type === 'savedSearch' && (
          <>
            <div className="w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
              Judul
            </div>
            <div className="mb-6 mt-1 flex w-full">
              <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
                <input
                  required
                  type="text"
                  placeholder="cth: Nama calon pembeli"
                  className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
                  value={searchParams.get('title') ?? ''}
                  onChange={(event) =>
                    controlSearchParams('title', event.target.value)
                  }
                />
              </div>
            </div>
          </>
        )}
        <div className="w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
          Tipe Listing
        </div>
        <div className="mb-5 mt-1 flex w-full gap-2">
          <ButtonFilterChip
            key="forSale"
            isActive={
              searchParams.get(filterKeyStrings.listingForSale) === 'true'
            }
            onClick={() =>
              controlSearchParams(
                filterKeyStrings.listingForSale,
                searchParams.get(filterKeyStrings.listingForSale) === 'true'
                  ? 'false'
                  : 'true',
                filterKeyStrings.listingForRent,
              )
            }
          >
            Dijual
          </ButtonFilterChip>
          <ButtonFilterChip
            key="forRent"
            isActive={
              searchParams.get(filterKeyStrings.listingForRent) === 'true'
            }
            onClick={() =>
              controlSearchParams(
                filterKeyStrings.listingForRent,
                searchParams.get(filterKeyStrings.listingForRent) === 'true'
                  ? 'false'
                  : 'true',
                filterKeyStrings.listingForSale,
              )
            }
          >
            Disewakan
          </ButtonFilterChip>
        </div>
        {(!listingForRent || listingForSale) && (
          <>
            <div className="w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
              Harga Jual
            </div>
            <div className="mt-1 flex w-full justify-between gap-2">
              <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
                <input
                  type="text"
                  className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
                  placeholder="Rp Minimum"
                  value={formatNumber(
                    searchParams.get(filterKeyStrings.minPrice) ?? '',
                  )}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(filterKeyStrings.minPrice, rawValue)
                  }}
                  onBlur={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(
                      filterKeyStrings.minPrice,
                      convertAbbreviationToNumber(rawValue).toString(),
                    )
                  }}
                />
              </div>
              <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
                <input
                  type="text"
                  className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
                  placeholder="Rp Maximum"
                  value={formatNumber(
                    searchParams.get(filterKeyStrings.maxPrice) ?? '',
                  )}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(filterKeyStrings.maxPrice, rawValue)
                  }}
                  onBlur={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(
                      filterKeyStrings.maxPrice,
                      convertAbbreviationToNumber(rawValue).toString(),
                    )
                  }}
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
          </>
        )}
        {listingForRent && (
          <>
            <div className="w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
              Harga Sewa per tahun
            </div>
            <div className="mt-1 flex w-full justify-between gap-2">
              <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
                <input
                  type="text"
                  className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
                  placeholder="Rp Minimum"
                  value={formatNumber(
                    searchParams.get(filterKeyStrings.minRentPrice) ?? '',
                  )}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(filterKeyStrings.minRentPrice, rawValue)
                  }}
                  onBlur={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(
                      filterKeyStrings.minRentPrice,
                      convertAbbreviationToNumber(rawValue).toString(),
                    )
                  }}
                />
              </div>
              <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
                <input
                  type="text"
                  className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
                  placeholder="Rp Maksimum"
                  value={formatNumber(
                    searchParams.get(filterKeyStrings.maxRentPrice) ?? '',
                  )}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(filterKeyStrings.maxRentPrice, rawValue)
                  }}
                  onBlur={(e) => {
                    const rawValue = e.target.value.replace(/\./g, '')
                    controlSearchParams(
                      filterKeyStrings.maxRentPrice,
                      convertAbbreviationToNumber(rawValue).toString(),
                    )
                  }}
                />
              </div>
            </div>
            <span className="self-stretch text-sm text-red-500">
              {validationMessage('price')}
            </span>
            <div className="mt-2 inline-grid grid-cols-3 gap-2">
              {FILTER_OPTIONS.rentPriceRange.options.map((option, index) => {
                const isActive =
                  searchParams.get(filterKeyStrings.minRentPrice) ===
                    option.minValue.toString() &&
                  (searchParams.get(filterKeyStrings.maxRentPrice) ?? '') ===
                    option.maxValue.toString()
                return (
                  <ButtonFilterChip
                    key={index}
                    type="button"
                    isActive={isActive}
                    onClick={() => {
                      if (isActive) {
                        searchParams.delete(filterKeyStrings.minRentPrice)
                        searchParams.delete(filterKeyStrings.maxRentPrice)
                      } else {
                        searchParams.set(
                          filterKeyStrings.minRentPrice,
                          option.minValue.toString(),
                        )
                        searchParams.set(
                          filterKeyStrings.maxRentPrice,
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
          </>
        )}

        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
          Kota
        </div>
        <div className="relative mt-2">
          <AsyncSelect
            placeholder={'Pilih Kota'}
            loadOptions={getDebouncedCities}
            defaultOptions={defaultCityOptions || true}
            value={selectedCity}
            onChange={(selectedOption) => {
              if (selectedOption !== null) {
                setSelectedCity(selectedOption)
                controlSearchParams('cityId', selectedOption.value.toString())
              }
            }}
            styles={customStyles}
          />
          <div className="pointer-events-none absolute right-3 top-2.5 group-hover:pointer-events-auto">
            <ArrowDownIconSVG />
          </div>
        </div>
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
          Kamar tidur
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
          Kamar mandi
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
          Luas Tanah
        </div>
        <div className="mt-1 flex gap-2">
          <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
            <input
              placeholder="Minimum"
              type="number"
              className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
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
              className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
            />
            <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-400">
              m2
            </span>
          </div>
        </div>
        <span className="self-stretch text-sm text-red-500">
          {validationMessage('lotSize')}
        </span>
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
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
              className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
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
              className="h-full w-full rounded-lg border-none p-3 py-2.5 ring-0"
            />
            <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-400">
              m2
            </span>
          </div>
        </div>
        <span className="self-stretch text-sm text-red-500">
          {validationMessage('buildingSize')}
        </span>
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
          Sertifikat
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
          Kapasitas Mobil
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
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
        <div className="mt-6 w-full text-lg font-semibold leading-7 lg:text-sm lg:font-bold lg:uppercase lg:text-slate-500">
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
      <div className="lg:hidden">
        <BottomStickyButton
          type="submit"
          disabled={loadingAdd || loadingUpdate}
        >
          {type === 'savedSearch' ? 'Simpan' : 'Lihat Hasil Filter'}
        </BottomStickyButton>
      </div>
    </form>
  )
}

export default FilterForm
