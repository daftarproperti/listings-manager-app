import React from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type UseFormRegisterReturn,
} from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

type CurrencyInputFieldProps = {
  label: string
  registerHook: UseFormRegisterReturn<string>
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
  control: Control<FieldValues>
  name: keyof FieldValues
}

const CurrencyInputField: React.FC<CurrencyInputFieldProps> = ({
  label,
  registerHook,
  placeholderValue,
  errorFieldName,
  errorMessage,
  control,
  name,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <div className="mt-3 w-full self-stretch">
          <span className="text-lg font-semibold leading-7 text-gray-800">
            {label}
          </span>
          <NumericFormat
            {...registerHook}
            {...rest}
            placeholder={placeholderValue}
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            decimalScale={2}
            getInputRef={ref}
            className="mt-1 w-full items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white px-3 py-2.5 text-lg leading-7 text-gray-800"
            // handle error: Warning: Function components cannot be given refs.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref={undefined}
          />
          {errorFieldName && (
            <span className="self-stretch text-sm leading-5 text-red-500">
              {errorMessage || errorFieldName?.message}
            </span>
          )}
        </div>
      )}
    />
  )
}

export default CurrencyInputField
