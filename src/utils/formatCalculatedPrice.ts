export const formatCalculatedPrice = (value: number | string) => {
  if (!value) {
    return ''
  }

  const numberValue = parseFloat(value.toString())
  if (isNaN(numberValue)) {
    return ''
  }

  let notation: Intl.NumberFormatOptions['notation'] = 'standard'
  let compactDisplay: Intl.NumberFormatOptions['compactDisplay']

  if (numberValue >= 1000) {
    notation = 'compact'
    compactDisplay = 'short'
  }

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    notation: notation,
    ...(notation === 'compact' && { compactDisplay }),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const formatted = formatter.format(numberValue)
  return formatted.includes('Rp') ? formatted : `Rp ${formatted}`
}
