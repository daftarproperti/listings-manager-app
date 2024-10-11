import React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
} from 'react-hook-form'
import { Input } from '@material-tailwind/react'

import InputLabel from './InputLabel'
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
      <InputLabel label={label} />
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <Input
            crossOrigin={undefined}
            {...field}
            className="!border-t-blue-gray-200 bg-white focus:!border-t-gray-900"
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
            labelProps={{ className: 'before:content-none after:content-none' }}
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
