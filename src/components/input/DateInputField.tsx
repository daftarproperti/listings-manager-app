import React, { type ReactNode } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import { type FieldError, Controller, type Control } from 'react-hook-form'

import InputLabel from './InputLabel'

type DateInputFieldProps = {
  label?: ReactNode
  name: string
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
  control?: Control
} & React.InputHTMLAttributes<HTMLInputElement>

const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  name,
  placeholderValue,
  errorFieldName,
  errorMessage,
  control,
}) => {
  return (
    <div className={`mt-3`}>
      <div className="flex justify-between">
        <InputLabel label={label} />
      </div>
      <div className="relative w-full">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                const formattedDate = date
                  ? format(date, 'yyyy-MM-dd HH:mm')
                  : ''
                field.onChange(formattedDate)
              }}
              placeholderText={placeholderValue}
              showTimeSelect
              autoComplete="off"
              maxDate={new Date()}
              className="h-10 w-96 items-start justify-center rounded-[7px] border border-blue-gray-200 bg-white px-3 py-2 text-sm leading-7 focus:border-gray-900 focus:outline-none"
              dateFormat="yyyy-MM-dd HH:mm"
            />
          )}
        />
      </div>
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorMessage || errorFieldName?.message}
        </span>
      )}
    </div>
  )
}

export default DateInputField
