import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'

export const getLabelForValue = (
  property: keyof typeof LISTING_OPTIONS,
  value: string | number,
) => {
  const options = LISTING_OPTIONS[property].options
  const option = options.find((option) => option.value === value)
  return option ? option.label : value
}
