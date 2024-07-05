import React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
} from 'react-hook-form'

type IntuitiveCurrencyInputFieldProps = {
  label: string
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
  control: Control<FieldValues>
  name: keyof FieldValues
}

type Abbreviation = 'juta' | 'jt' | 'm' | 't'

const customAbbreviations: Record<Abbreviation, number> = {
  juta: 1000000,
  jt: 1000000,
  m: 1000000000,
  t: 1000000000000,
}

const convertAbbreviationToNumber = (input: string): string => {
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

const formatNumber = (value: number) => {
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

const IntuitiveCurrencyInputField: React.FC<
  IntuitiveCurrencyInputFieldProps
> = ({
  label,
  placeholderValue,
  errorFieldName,
  errorMessage,
  control,
  name,
}) => {
  return (
    <div className="mt-3 w-full self-stretch">
      <span className="text-lg font-semibold leading-7 text-gray-800">
        {label}
      </span>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <input
            {...field}
            placeholder={placeholderValue}
            value={value ? formatNumber(value) : ''}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[Rp. \s]/g, '')
              onChange(rawValue)
            }}
            onBlur={(e) => {
              const rawValue = e.target.value.replace(/[Rp. \s]/g, '')
              onChange(convertAbbreviationToNumber(rawValue))
            }}
            className="mt-1 w-full items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white px-3 py-2.5 text-lg leading-7 text-gray-800"
            type="text"
          />
        )}
      />
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorMessage || errorFieldName?.message}
        </span>
      )}
    </div>
  )
}

export default IntuitiveCurrencyInputField
