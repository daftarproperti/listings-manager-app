import React from 'react'
import { Img } from 'react-image'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styles from './Swiper.module.css'

interface SwiperSliderProps {
  pictures: string[]
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ pictures }) => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        bulletActiveClass: styles['swiper-pagination-bullet-active'],
        bulletClass: styles['swiper-pagination-bullet'],
        horizontalClass: styles['swiper-pagination-horizontal'],
      }}
      className="relative flex w-full items-center justify-center bg-slate-500"
      centeredSlides={true}
      modules={[Pagination, Navigation]}
      loop={true}
      navigation={true}
    >
      {pictures.map((image, index) => {
        return (
          <SwiperSlide
            key={index}
            className="flex max-h-52 items-center justify-center lg:max-h-80"
          >
            <Img
              src={image}
              className="h-full max-h-52 object-cover lg:max-h-80"
              unloader={
                <div className="inset-0 flex h-16 items-center justify-center bg-slate-300">
                  <p className="text-xs text-slate-500">Image not found</p>
                </div>
              }
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default SwiperSlider
