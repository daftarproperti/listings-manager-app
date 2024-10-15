import React from 'react'
import { Img } from 'react-image'
import { Carousel } from '@material-tailwind/react'

interface SwiperSliderProps {
  pictures: string[]
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ pictures }) => {
  return (
    <Carousel className="max-w-[480px] items-center rounded-lg bg-gray-600">
      {pictures.map((image, key) => {
        return (
          <Img
            key={key}
            src={image}
            className="h-full w-full"
            unloader={
              <div className="inset-0 flex h-16 items-center justify-center bg-slate-300">
                <p className="text-xs text-slate-500">Image not found</p>
              </div>
            }
          />
        )
      })}
    </Carousel>
  )
}

export default SwiperSlider
