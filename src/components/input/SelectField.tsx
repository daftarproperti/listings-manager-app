import React from 'react'
import {
  Controller,
  type FieldError,
  type UseFormRegisterReturn,
  type Control,
} from 'react-hook-form'
import { Select, Typography, Option } from '@material-tailwind/react'

import InputLabel from './InputLabel'

type SelectFieldProps = {
  control: Control
  label: string
  name: string
  registerHook: UseFormRegisterReturn<string>
  selectOptions: {
    label: string
    value: string
  }[]
  errorFieldName?: FieldError
  errorMessage?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  control,
  label,
  name,
  selectOptions,
  errorFieldName,
  errorMessage,
}) => {
  return (
    <div className="relative mt-3 w-full self-stretch">
      <InputLabel label={label} />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            name={name}
            label={label}
            labelProps={{ className: 'hidden' }}
            className="border-blue-gray-200 bg-white aria-[expanded=true]:border-gray-900"
            value={value ? String(value) : undefined}
            onChange={(selectedOption) => {
              if (selectedOption !== null) {
                onChange(selectedOption)
              }
            }}
          >
            {selectOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )}
      ></Controller>
      {errorFieldName && (
        <Typography variant="small" className="mt-1" color="red">
          {errorMessage || errorFieldName?.message}
        </Typography>
      )}
    </div>
  )
}

export default SelectField
