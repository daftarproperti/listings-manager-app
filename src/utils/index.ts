import CryptoJS from 'crypto-js'

export const formatCurrencyToIDRText = (number?: number) =>
  number
    ? new Intl.NumberFormat('id-ID', {
        currency: 'IDR',
        notation: 'compact',
        compactDisplay: 'short',
      }).format(number)
    : ''

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

const tele = window.Telegram?.WebApp
export const verifyTelegramWebAppData = () => {
  if (tele?.initData) {
    const initData = new URLSearchParams(tele.initData)
    const hash = initData.get('hash')
    const dataToCheck: string[] = []

    initData.sort()
    initData.forEach(
      (val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`),
    )

    const secret = CryptoJS.HmacSHA256(
      import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
      'WebAppData',
    )
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(
      CryptoJS.enc.Hex,
    )

    return _hash === hash
  }
  return false
}
