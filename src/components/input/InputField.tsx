import React from 'react'
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'

type InputFieldProps = {
  halfWidth?: boolean
  leftPosition?: boolean
  label: string
  registerHook: UseFormRegisterReturn<string>
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
}

const InputField: React.FC<InputFieldProps> = ({
  halfWidth,
  leftPosition,
  label,
  registerHook,
  placeholderValue,
  errorFieldName,
  errorMessage,
}) => {
  return (
    <div
      className={`mt-3 self-stretch 
        ${halfWidth ? 'w-1/2' : 'w-full'} ${leftPosition ? 'mr-1' : 'ml-1'}`}
    >
      <span className="text-lg font-semibold leading-7 text-gray-800">
        {label}
      </span>
      <input
        {...registerHook}
        placeholder={placeholderValue}
        className="mt-1 w-full items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white px-3 py-2.5 text-lg leading-7 text-gray-800"
        type="text"
      />
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorMessage || errorFieldName?.message}
        </span>
      )}
    </div>
  )
}

export default InputField
