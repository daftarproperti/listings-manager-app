import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import ImageWithAuth from 'components/ImageWithAuth'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './Swiper.module.css'

interface SwiperSliderProps {
  pictures: string[]
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ pictures }) => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true, // Enable clickable pagination
        dynamicBullets: true, // Optional, for dynamic bullets
        bulletActiveClass: styles['swiper-pagination-bullet-active'],
        bulletClass: styles['swiper-pagination-bullet'],
        horizontalClass: styles['swiper-pagination-horizontal'],
      }}
      className="max-h-46 w-full"
      centeredSlides={true}
      modules={[Pagination]}
    >
      {pictures.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <ImageWithAuth
              link={image}
              useOrientation={true}
              noWrapper={true}
              noRounded={true}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default SwiperSlider
