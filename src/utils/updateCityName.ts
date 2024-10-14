import { type SetStateAction } from 'react'

import { getCityById } from '../api/queries'
import { type CityOption } from '../api/types'

export const updateCityName = async (
  isFetching: boolean,
  cityId: number,
  setSelectedCity: React.Dispatch<SetStateAction<CityOption | null>>,
) => {
  if (isFetching) {
    return
  }
  const defaultCity = {
    label: 'Kota ' + String(cityId),
    value: cityId,
  }
  const city = await getCityById(cityId)
  if (city?.name) {
    defaultCity.label = city.name
  }
  setSelectedCity((defaultCity as CityOption) || null)
}
