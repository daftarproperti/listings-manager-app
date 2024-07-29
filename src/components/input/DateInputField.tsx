import React, { type ReactNode } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import { type FieldError, Controller, type Control } from 'react-hook-form'

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
        <div className="min-h-7 text-lg font-semibold leading-7 text-gray-800">
          {label}
        </div>
      </div>
      <div className="relative mt-1 w-full">
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
              className="mt-1 w-96 items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-slate-300 bg-white px-3 py-2 text-lg leading-7 text-gray-800"
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
