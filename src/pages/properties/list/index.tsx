import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { useGetPropertyList } from 'api/queries'
import { type Property } from 'api/types'
import { useEffect } from 'react'
import ButtonChip from 'components/button/ButtonChip'
import LinkChip from 'components/button/LinkChip'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Card from 'components/Card'

const PropertyListPage = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, mutate, isPending, error, isError } = useGetPropertyList()

  const onClickCard = (item: Property) => navigate(`/properties/${item.id}`)
  useEffect(
    () =>
      mutate({
        searchParams,
      }),
    [searchParams],
  )

  return (
    <div className="relative w-full">
      <div className="py-16">
        <div className="px-4 pb-0 pt-4">
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-2 top-[50%] h-4 w-4 -translate-y-[50%] text-slate-400" />
            <input
              type="text"
              name="property-search"
              id="property-search"
              className="block w-full rounded border border-slate-300 p-4 py-2 pl-8 text-lg text-gray-900"
              placeholder="Kata kunci pencarian"
            />
          </div>
          <div className="mb-0">
            <div className="flex flex-row gap-2">
              <LinkChip
                to={`/properties/filter`}
                icon={
                  <AdjustmentsHorizontalIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
                }
                text="Filter"
              />
              <ButtonChip
                icon={
                  <Bars3BottomLeftIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
                }
                text="Urutkan"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 bg-slate-100 p-4 pb-14">
          {isError ? (
            <div className="mt-[50%] flex h-full -translate-y-1/2 flex-col items-center justify-center">
              <span className="mb-4">Error: {error.message}</span>
            </div>
          ) : isPending ? (
            <span className="mt-[50%] flex h-full -translate-y-1/2 items-center justify-center">
              Loading...
            </span>
          ) : data?.properties?.length ? (
            <ul role="list" className="space-y-4">
              {data.properties.map((property, index) => (
                <div
                  key={index}
                  onClick={() => onClickCard(property)}
                  className="cursor-pointer"
                >
                  <Card data={property} fromPage="properties" />
                </div>
              ))}
            </ul>
          ) : (
            <div className="mt-[50%] flex h-full -translate-y-1/2 flex-col items-center justify-center">
              <span className="mb-4">Data Tidak Tersedia</span>
              <ButtonChip text="Reset" onClick={() => navigate('/')} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyListPage
