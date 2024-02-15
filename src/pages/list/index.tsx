import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { useGetPropertyList } from 'api/queries'
import { type Property } from 'api/types'
import SortBottomSheet from 'components/SortBottomSheet'
import ButtonChip from 'components/button/ButtonChip'
import LinkChip from 'components/button/LinkChip'
import { useEffect, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Card from './Card'

const ListPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFilterBottomSheetOpen, setIsFilterBottomBarOpen] = useState(false)

  const { data, mutate, isPending } = useGetPropertyList()

  const onClickCard = (item: Property) => navigate(`/detail/${item.id}`)

  useEffect(
    () =>
      mutate({
        searchParams,
      }),
    [searchParams],
  )

  const location = useLocation()
  const updateSuccess = location.state?.updateSuccess

  return (
    <div className="relative w-full">
      <div className="p-4 pb-20">
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-2 top-[50%] h-4 w-4 -translate-y-[50%] text-slate-400" />
          <input
            type="text"
            name="property-search"
            id="property-search"
            className="block w-full rounded border border-slate-400 p-4 py-1.5 pl-8 text-gray-900 sm:text-sm sm:leading-6"
            placeholder="Cari Rumah Dimana?"
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-row gap-2">
            <LinkChip
              to={`/filter?${searchParams}`}
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
              onClick={() => setIsFilterBottomBarOpen(true)}
            />
            <ButtonChip
              text="Private"
              isActive={searchParams.get('collection') === 'true'}
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams)
                if (newSearchParams.get('collection')) {
                  newSearchParams.delete('collection')
                } else {
                  newSearchParams.set('collection', 'true')
                }
                setSearchParams(newSearchParams, { replace: true })
              }}
            />
          </div>
        </div>
        {updateSuccess && (
          <div className="mb-4 rounded-lg bg-primary-50 p-4 text-sm text-green-800">
            Data berhasil dihapus.
          </div>
        )}
        {isPending ? (
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
                <Card data={property} />
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
      <div className="fixed bottom-0 w-full max-w-lg bg-white px-4 py-2">
        <Link
          to="/add"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-20 py-3"
        >
          <PlusIcon className="w-[18px] text-white" />
          <div className=" text-base leading-6 text-white">
            Tambah listing baru
          </div>
        </Link>
      </div>
      <SortBottomSheet
        isOpen={isFilterBottomSheetOpen}
        setIsOpen={setIsFilterBottomBarOpen}
      />
    </div>
  )
}

export default ListPage
