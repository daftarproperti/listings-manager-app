export const formatCurrencyToIDRText = (number?: number) =>
  number
    ? new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        style: 'currency',
        notation: 'compact',
        compactDisplay: 'short',
      }).format(number)
    : ''
