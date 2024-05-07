import { PlusIcon } from '@heroicons/react/24/solid'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
} from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteSavedSearch, useGetSavedSearchList } from 'api/queries'
import { type SavedSearch } from 'api/types'
import {
  BathIconSVG,
  BedIconSVG,
  CarIconSVG,
  DocumentIconSVG,
  EditIconSVG,
  HouseIconSVG,
  InfoIconSVG,
  LotIconSVG,
  MapIconSVG,
  PriceIconSVG,
  TrashIconSVG,
} from 'assets/icons'
import { formatCurrencyToIDRText, savedSearchToSearchParams } from 'utils'
import {
  PROPERTY_OWNERSHIP_ENUM,
  PROPERTY_TYPE_ENUM,
  FACING_DIRECTION_ENUM,
  LISTING_TYPE_ENUM,
  type PropertyType,
  type PropertyOwnership,
  type FacingDirection,
  type ListingType,
} from 'components/form/constant'

import ConfirmationDialog from './ConfirmationDialog'

export const FILTER_ICON: {
  [key: string]: JSX.Element
} = {
  price: <PriceIconSVG />,
  buildingSize: <HouseIconSVG />,
  lotSize: <LotIconSVG />,
  bedroomCount: <BedIconSVG />,
  bathroomCount: <BathIconSVG />,
  carCount: <CarIconSVG />,
  city: <MapIconSVG />,
  ownership: <DocumentIconSVG />,
}

const SavedSearchListPage = () => {
  const navigate = useNavigate()
  const { mutate } = useDeleteSavedSearch()
  const { data, error, isError, isFetching, refetch } = useGetSavedSearchList()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>()

  const title = useMemo(
    () => data?.saved_searches?.find((s) => s.id === selectedId)?.title,
    [selectedId],
  )

  const handleClickSearch = (search: SavedSearch) => {
    const newSearchParams = savedSearchToSearchParams(search)
    navigate(`/?${newSearchParams}`)
  }

  const handleToEditPage = (search: SavedSearch) => {
    const newSearchParams = savedSearchToSearchParams(search)
    navigate(`/saved-searches/edit?${newSearchParams}`)
  }

  const handleDelete = (id?: string) => {
    if (id) {
      mutate(
        { id },
        {
          onSuccess: () => {
            refetch()
            toast('Permintaan berhasil dihapus', { type: 'success' })
          },
          onError: (error) => {
            toast(`Mohon maaf, telah terjadi kesalahan (${error?.message})`, {
              type: 'error',
            })
          },
        },
      )
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100 pt-16">
      <div className="flex grow flex-col space-y-4 p-4">
        {isError ? (
          <div className="my-auto text-center">Error: {error.message}</div>
        ) : isFetching ? (
          <div className="my-auto text-center">Loading...</div>
        ) : data?.saved_searches?.length ? (
          data?.saved_searches?.map((item, id) => (
            <Card key={id} className="rounded-lg shadow-sm">
              <CardBody className="p-3">
                <div className="flex justify-between">
                  <div className="text-slate-800">Permintaan: {item.title}</div>
                  <div className="flex items-center gap-1">
                    <IconButton
                      variant="text"
                      className="rounded-full"
                      onClick={() => handleToEditPage(item)}
                    >
                      <EditIconSVG className="text-blue-400" />
                    </IconButton>
                    <IconButton
                      variant="text"
                      className="rounded-full"
                      onClick={() => {
                        setIsOpen(true)
                        setSelectedId(item.id)
                      }}
                    >
                      <TrashIconSVG className="text-red-400" />
                    </IconButton>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 py-2">
                  {Object.keys(item.filterSet ?? {}).map((filter, id) => {
                    const filterItem =
                      item.filterSet?.[filter as keyof typeof item.filterSet]
                    return filterItem ? (
                      <div key={id} className="flex items-center gap-1">
                        {FILTER_ICON[filter] ?? <InfoIconSVG />}
                        {typeof filterItem !== 'object' ? (
                          <div className="text-slate-800">
                            {(() => {
                              switch (filter) {
                                case 'price':
                                  return formatCurrencyToIDRText(
                                    filterItem as number,
                                  )
                                case 'lotSize':
                                case 'buildingSize':
                                  return `${filterItem}m2`
                                case 'bedroomCount':
                                  return `${filterItem} KT`
                                case 'bathroomCount':
                                  return `${filterItem} KM`
                                case 'floorCount':
                                  return `${filterItem} Lantai`
                                case 'electricPower':
                                  return `${filterItem} V`
                                case 'listingType':
                                  return LISTING_TYPE_ENUM[
                                    filterItem as ListingType
                                  ]
                                case 'propertyType':
                                  return PROPERTY_TYPE_ENUM[
                                    filterItem as PropertyType
                                  ]
                                case 'facing':
                                  return FACING_DIRECTION_ENUM[
                                    filterItem as FacingDirection
                                  ]
                                case 'ownership':
                                  return PROPERTY_OWNERSHIP_ENUM[
                                    filterItem as PropertyOwnership
                                  ]
                                default:
                                  return filterItem
                              }
                            })()}
                          </div>
                        ) : filterItem.min || filterItem.max ? (
                          <div className="text-slate-800">
                            {(() => {
                              switch (filter) {
                                case 'price':
                                  return (
                                    <>
                                      {formatCurrencyToIDRText(
                                        filterItem.min ?? 0,
                                      )}
                                      {filterItem.max ? (
                                        ` - ${formatCurrencyToIDRText(
                                          filterItem.max,
                                        )}`
                                      ) : (
                                        <> - &infin;</>
                                      )}
                                    </>
                                  )
                                case 'lotSize':
                                case 'buildingSize':
                                  return (
                                    <>
                                      {`${filterItem.min ?? 0}m2`}
                                      {filterItem.max
                                        ? ` - ${filterItem.max}m2`
                                        : ''}
                                    </>
                                  )
                                case 'bedroomCount':
                                  return (
                                    <>
                                      {`${filterItem.min ?? 0} KT`}
                                      {filterItem.max
                                        ? ` - ${filterItem.max} KT`
                                        : ''}
                                    </>
                                  )
                                case 'bathroomCount':
                                  return (
                                    <>
                                      {`${filterItem.min ?? 0} KM`}
                                      {filterItem.max
                                        ? ` - ${filterItem.max} KM`
                                        : ''}
                                    </>
                                  )
                                default:
                                  return (
                                    <>
                                      {filterItem.min ?? 0}
                                      {filterItem.max
                                        ? ` - ${filterItem.max}`
                                        : ''}
                                    </>
                                  )
                              }
                            })()}
                          </div>
                        ) : null}
                      </div>
                    ) : null
                  })}
                </div>
              </CardBody>
              <CardFooter className="bg-blue-100 px-3 py-2.5">
                <Button
                  size="sm"
                  fullWidth
                  color="blue"
                  variant="outlined"
                  className="bg-white text-center text-sm font-normal capitalize"
                  onClick={() => handleClickSearch(item)}
                >
                  Lihat Properti
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="my-auto">
            <Card className="rounded-lg shadow-sm">
              <CardBody className="space-y-2 text-center">
                <div className="text-lg text-slate-800">
                  Belum ada permintaan
                </div>
                <div className="text-sm text-slate-500">
                  Yuk, buat kriteria properti yang dicari
                </div>
                <Button
                  size="sm"
                  color="blue"
                  variant="filled"
                  className="text-center text-sm font-normal capitalize"
                  onClick={() => navigate('/saved-searches/add')}
                >
                  Buat kriteria baru
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
      <div className="fixed bottom-16 h-0 w-full max-w-lg pr-4 text-right">
        <IconButton
          size="lg"
          color="blue"
          className="rounded-full drop-shadow-lg"
          onClick={() => navigate('/saved-searches/add')}
        >
          <PlusIcon className="h-6 w-6 text-white" />
        </IconButton>
      </div>
      <ConfirmationDialog
        title={title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => handleDelete(selectedId)}
        onCancel={() => setSelectedId(undefined)}
      />
    </div>
  )
}

export default SavedSearchListPage
