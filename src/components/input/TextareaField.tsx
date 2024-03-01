import React from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type TextareaFieldProps = {
  label: string
  registerHook: UseFormRegisterReturn<string>
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
  additionalClassName?: string
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  registerHook,
  placeholderValue,
  errorFieldName,
  errorMessage,
  additionalClassName,
}) => {
  const baseClassName =
    'mt-1 min-h-[127px] w-full items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white px-3 py-2.5 text-lg leading-7 text-gray-800'
  const textareaClassName = `${baseClassName} ${
    additionalClassName || ''
  }`.trim()

  return (
    <div className="w-full self-stretch pt-3">
      <span className="text-lg font-semibold leading-7 text-gray-800">
        {label}
      </span>
      <textarea
        {...registerHook}
        placeholder={placeholderValue}
        className={textareaClassName}
      />
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default TextareaField
