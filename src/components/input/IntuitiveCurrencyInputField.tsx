import React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
} from 'react-hook-form'

import { convertAbbreviationToNumber, formatNumber } from '../../utils'

type IntuitiveCurrencyInputFieldProps = {
  label: string
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
  control: Control<FieldValues>
  name: keyof FieldValues
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
