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

type Abbreviation = 'juta' | 'm' | 't'

const customAbbreviations: Record<Abbreviation, number> = {
  juta: 1000000,
  m: 1000000000,
  t: 1000000000000,
}

const convertAbbreviationToNumber = (input: string) => {
  const match = input.toLowerCase().match(/([\d.,]*\d)\s*([a-zA-Z]*)?/)

  if (match) {
    const abbreviation = match[2]?.trim() as Abbreviation | undefined

    if (abbreviation && customAbbreviations[abbreviation]) {
      const multiplier = customAbbreviations[abbreviation]
      if (/,/.test(match[1])) {
        return (parseFloat(match[1].replace(/,/g, '')) * multiplier) / 10
      } else {
        return parseFloat(match[1].replace(/,/g, '')) * multiplier
      }
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
              const rawValue = e.target.value.replace(/\./g, '')
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
