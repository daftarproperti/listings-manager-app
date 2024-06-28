import React, { type ReactNode } from 'react'
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'

type InputFieldProps = {
  halfWidth?: boolean
  leftPosition?: boolean
  label?: string
  registerHook: UseFormRegisterReturn<string>
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
  additionalLabel?: string
  linkHref?: string
  linkText?: string
  rightContent?: ReactNode
  allowOnlyNumbersAndPlus?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

const InputField: React.FC<InputFieldProps> = ({
  halfWidth,
  leftPosition,
  label,
  registerHook,
  placeholderValue,
  errorFieldName,
  errorMessage,
  additionalLabel,
  linkHref,
  linkText,
  rightContent,
  allowOnlyNumbersAndPlus,
  ...inputProps
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (allowOnlyNumbersAndPlus) {
      const charCode = event.key.charCodeAt(0)
      if (
        !(
          (charCode >= 48 && charCode <= 57) ||
          charCode === 43 ||
          event.key === 'Backspace' ||
          event.key === 'Delete' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight'
        )
      ) {
        event.preventDefault()
      }
    }
  }

  return (
    <div
      className={`mt-3 self-stretch 
        ${halfWidth ? 'w-1/2' : 'w-full'} ${
          leftPosition ? 'mr-1' : halfWidth ? 'ml-1' : 'ml-0'
        }`}
    >
      <div className="flex justify-between">
        <div className="text-lg font-semibold leading-7 text-gray-800">
          {label}
        </div>
        {additionalLabel && (
          <div className="ml-2 text-sm leading-7 text-gray-500">
            {additionalLabel}
            <a
              href={linkHref}
              className="text-blue-500 underline hover:no-underline"
            >
              {linkText}
            </a>
          </div>
        )}
      </div>
      <div className="relative mt-1 w-full self-stretch rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white">
        <input
          {...registerHook}
          placeholder={placeholderValue}
          className="h-full w-full items-start justify-center whitespace-nowrap rounded-lg px-3 py-2.5 text-lg leading-7 text-gray-800"
          onKeyDown={handleKeyDown}
          {...inputProps}
        />
        {rightContent && (
          <div className="absolute right-0 top-0 flex h-full min-w-11 items-center justify-center rounded-r-lg bg-slate-200 text-lg text-slate-700">
            <span>{rightContent}</span>
          </div>
        )}
      </div>
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorMessage || errorFieldName?.message}
        </span>
      )}
    </div>
  )
}

export default InputField
