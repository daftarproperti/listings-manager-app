type Abbreviation = 'juta' | 'jt' | 'm' | 't'

const customAbbreviations: Record<Abbreviation, number> = {
  juta: 1000000,
  jt: 1000000,
  m: 1000000000,
  t: 1000000000000,
}

export const convertAbbreviationToNumber = (input: string): string => {
  const match = input.toLowerCase().match(/([\d.,]*\d)\s*([a-zA-Z]*)?/)

  if (match) {
    const abbreviation = match[2]?.trim() as Abbreviation | undefined

    if (abbreviation && customAbbreviations[abbreviation]) {
      const multiplier = customAbbreviations[abbreviation]
      let numberString = match[1].replace(/,/g, '.')

      // Remove any potential leading zeros
      numberString = numberString.replace(/^0+/, '') || '0'

      let numberValue
      if (numberString.includes('.')) {
        // Handle decimal part
        const [integerPart, decimalPart] = numberString.split('.')

        // Remove trailing zeros from the decimal part
        const trimmedDecimalPart = decimalPart.replace(/0+$/, '')
        const trimmedDecimalPlaces = trimmedDecimalPart.length

        // Convert to BigInt and scale by the multiplier
        numberValue =
          BigInt(integerPart) * BigInt(multiplier) +
          BigInt(trimmedDecimalPart) *
            (BigInt(multiplier) / BigInt(Math.pow(10, trimmedDecimalPlaces)))
      } else {
        numberValue = BigInt(numberString) * BigInt(multiplier)
      }

      return numberValue.toString()
    } else {
      return input
    }
  }

  return input
}
