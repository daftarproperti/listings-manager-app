export const formatNumber = (value: number | string) => {
  if (!value) {
    return ''
  }
  const numberValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const isContainsNumber = /\d/.test(numberValue)
  if (!isContainsNumber) {
    return ''
  }
  return numberValue.includes('Rp') ? numberValue : `Rp ${numberValue}`
}
