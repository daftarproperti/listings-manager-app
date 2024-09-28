type FilterWithRange = 'price' | 'lotSize' | 'buildingSize'

const FILTER_WITH_RANGE_ENUM: { [key in FilterWithRange]: string } = {
  price: 'Harga',
  lotSize: 'Luas Tanah',
  buildingSize: 'Luas Bangunan',
}

export const useValidateMinMaxValue = (searchParams: URLSearchParams) => {
  const validationMessage = (fieldName: FilterWithRange) => {
    const minValue = parseInt(searchParams.get(`${fieldName}[min]`) ?? '')
    const maxValue = parseInt(searchParams.get(`${fieldName}[max]`) ?? '')

    if (minValue > maxValue) {
      return `${FILTER_WITH_RANGE_ENUM[fieldName]} maksimum harus lebih besar dari ${FILTER_WITH_RANGE_ENUM[fieldName]} minimum.`
    }
  }

  return { validationMessage }
}
