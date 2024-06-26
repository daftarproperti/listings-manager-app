export const formatCurrencyToIDRText = (number?: number) => {
  if (number === undefined || number === null) return ''

  const numberString = number.toString()
  const isLargeNumber = number >= 1000000000
  const hasSignificantDigitAfterFirst =
    /\d0*[1-9]/.test(numberString) && isLargeNumber

  const formatOptions: Intl.NumberFormatOptions = {
    currency: 'IDR',
    style: 'currency',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: hasSignificantDigitAfterFirst ? 2 : 0,
    maximumFractionDigits: hasSignificantDigitAfterFirst ? 2 : 0,
  }

  let formattedNumber = new Intl.NumberFormat('id-ID', formatOptions).format(
    number,
  )

  if (hasSignificantDigitAfterFirst) {
    formattedNumber = formattedNumber.replace(/(,\d*[1-9])0+|,.00/g, '$1')
  }

  return formattedNumber
}
