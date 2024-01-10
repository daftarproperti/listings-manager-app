import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'

import Card from './Card'
import { useGetPropertyList } from 'api/queries'
import { Property } from 'api/types'

const Chip = ({ icon, text }: { icon?: ReactNode; text: string }) => {
  return (
    <button className="group flex items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 bg-white px-3.5 py-2 text-white transition-all hover:bg-primary-500">
      {icon}
      <div className="grow self-stretch whitespace-nowrap text-sm leading-5 text-primary-500 group-hover:text-white">
        {text}
      </div>
    </button>
  )
}

const ListPage = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useGetPropertyList()

  const onClick = (item: Property) => navigate(`/detail/${item.id}`)

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
            <Chip
              icon={
                <AdjustmentsHorizontalIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
              }
              text="Filter"
            />
            <Chip
              icon={
                <Bars3BottomLeftIcon className="w-5 overflow-hidden text-primary-500 group-hover:text-white" />
              }
              text="Urutkan"
            />
            <Chip text="Private" />
          </div>
        </div>
        {isLoading && (
          <div className="m-auto mt-[50%] flex h-full items-center justify-center">
            Loading...
          </div>
        )}
        {data?.properties && (
          <ul role="list" className="space-y-4">
            {data.properties.map((property, index) => (
              <div
                key={index}
                onClick={() => onClick(property)}
                className="cursor-pointer"
              >
                <Card data={property} />
              </div>
            ))}
          </ul>
        )}
      </div>
      <div className="fixed bottom-0 w-full max-w-lg bg-white px-4 py-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-20 py-3">
          <PlusIcon className="w-[18px] text-white" />
          <div className="whitespace-nowrap text-base leading-6 text-white">
            Tambah listing baru
          </div>
        </button>
      </div>
    </div>
  )
}

export default ListPage
