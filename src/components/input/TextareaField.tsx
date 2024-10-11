import { Textarea } from '@material-tailwind/react'
import React from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import InputLabel from './InputLabel'

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
    'mt-1 min-h-[240px] w-full items-start justify-center self-stretch whitespace-nowrap'
  const textareaClassName = `${baseClassName} ${
    additionalClassName || ''
  }`.trim()

  return (
    <div className="w-full self-stretch pt-3">
      <InputLabel label={label} />
      <Textarea
        {...registerHook}
        placeholder={placeholderValue}
        className={
          'mt-0 bg-white !border-t-blue-gray-200 focus:!border-t-gray-900 ' +
          textareaClassName
        }
        labelProps={{ className: 'hidden' }}
      />
      {errorFieldName && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorMessage || errorFieldName?.message}
        </span>
      )}
    </div>
  )
}

export default TextareaField
