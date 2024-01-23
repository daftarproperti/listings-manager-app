import React from 'react'
import { ArrowDownIconSVG } from 'assets/icons'
type SelectFieldProps = {
  label: string
  registerHook: any
  selectOptions: any
  defaultOption: string
  errorFieldName?: any
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
        className="select-hide group-hover:active mt-1 w-full appearance-none items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white px-3 py-2.5 text-lg leading-7 text-gray-800"
      >
        <option value="">{defaultOption}</option>
        {selectOptions.options.map((option: any, index: number) => (
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
