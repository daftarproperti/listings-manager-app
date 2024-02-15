import { ArrowDownIconSVG } from 'assets/icons'
import React from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type SelectFieldProps = {
  label: string
  registerHook: UseFormRegisterReturn<string>
  selectOptions: {
    label: string
    value: string
  }[]
  defaultOption: string
  errorFieldName?: FieldError
  errorMessage?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  registerHook,
  selectOptions,
  defaultOption,
  errorFieldName,
  errorMessage,
}) => {
  return (
    <div className="relative mt-3 w-full self-stretch">
      <span className="text-lg font-semibold leading-7 text-gray-800">
        {label}
      </span>
      <select
        {...registerHook}
        className="mt-1 w-full appearance-none items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white px-3 py-2.5 text-lg leading-7 text-gray-800"
      >
        <option value="">{defaultOption}</option>
        {selectOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-11 group-hover:pointer-events-auto">
        <ArrowDownIconSVG />
      </div>
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default SelectField
