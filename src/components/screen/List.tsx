import {
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const items = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    image:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    title: 'Rumah Baru 2021',
    listCount: 134,
  },
  {
    id: '1c66205c-1b4c-4342-a4fc-16a5c35ce8a2',
    image:
      'https://transrumah.com/wp-content/uploads/2020/09/Rumah-tipe-lebih-dari-120.jpg',
    title: 'Rumah Khas Qww',
    listCount: 94,
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    image:
      'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/krjogja/site/2022/07/28/409354/indonesia-butuh-12-juta-rumah-baru-per-tahun-220728i.jpg',
    title: 'Rumah Tua / Antik',
    listCount: 45,
  },
  {
    id: '6a53b3d6-9b26-4f62-bc5e-92a3a7fa51a1',
    image:
      'https://i0.wp.com/www.emporioarchitect.com/upload/portofolio/1280/desain-rumah-klasik-modern-1-setengah-lantai-25011021-7723124011021094800-0.jpg',
    title: 'Dalam Kota',
    listCount: 78,
  },
  {
    id: '5e25f627-b2ac-4e89-8df7-95757de8eade',
    image:
      'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    title: 'Rumah Baru 2021',
    listCount: 134,
  },
  {
    id: 'f7c15153-6693-41d3-bd4d-40c85b5e0674',
    image:
      'https://transrumah.com/wp-content/uploads/2020/09/Rumah-tipe-lebih-dari-120.jpg',
    title: 'Rumah Khas Jawa',
    listCount: 94,
  },
  {
    id: '84df6c2f-2f5d-4ae4-a76b-707c85c39f4a',
    image:
      'https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/krjogja/site/2022/07/28/409354/indonesia-butuh-12-juta-rumah-baru-per-tahun-220728i.jpg',
    title: 'Rumah Tua / Antik',
    listCount: 45,
  },
  {
    id: '08c80b91-2d27-4b9a-9a22-4bffd89fb3db',
    image:
      'https://i0.wp.com/www.emporioarchitect.com/upload/portofolio/1280/desain-rumah-klasik-modern-1-setengah-lantai-25011021-7723124011021094800-0.jpg',
    title: 'Dalam Kota',
    listCount: 78,
  },
]

const tele = window.Telegram?.WebApp

export default function List() {
  const navigate = useNavigate()

  const onClick = (item: (typeof items)[0]) => {
    if (tele) {
      tele.MainButton.isVisible = false
      setTimeout(() => {
        tele.MainButton.isVisible = true
        tele.MainButton.text = `View ${item.title}`
        tele.MainButton.onClick(() => {
          navigate(`/detail/${item.id}`)
          tele.MainButton.isVisible = false
        })
      }, 200)
    }
  }

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="absolute left-2 top-[50%] h-5 w-5 -translate-y-[50%] text-blue-200" />
        <input
          type="text"
          name="property-search"
          id="property-search"
          className="block w-full rounded-sm border border-blue-200 p-4 py-1.5 pl-8 text-gray-900 sm:text-sm sm:leading-6"
          placeholder="Cari Rumah Dimana?"
        />
      </div>
      <ul role="list" className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="h-44 cursor-pointer overflow-hidden rounded-md shadow transition hover:bg-blue-200"
            onClick={() => onClick(item)}
          >
            <div className="flex h-full flex-col">
              <div className="h-1/2 bg-gray-300">
                <img
                  src={item.image}
                  alt={String(item.image)}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex h-1/2 flex-col justify-between p-2">
                <p className="mt-0.5 text-xs font-bold">{item.title}</p>
                <div className="flex flex-row items-center justify-between">
                  <p className="text-[10px] text-gray-500">
                    {item.listCount} Listing
                  </p>
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
