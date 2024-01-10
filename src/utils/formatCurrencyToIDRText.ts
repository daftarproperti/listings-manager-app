export const formatCurrencyToIDRText = (number?: number) =>
  number
    ? new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        notation: 'compact',
        compactDisplay: 'short',
      }).format(number)
    : ''
