import React, { type ReactNode } from 'react'
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'
import { Typography, Input } from '@material-tailwind/react'

import InputLabel from './InputLabel'

type InputFieldProps = {
  halfWidth?: boolean
  leftPosition?: boolean
  label?: ReactNode
  registerHook?: UseFormRegisterReturn<string>
  placeholderValue: string
  errorFieldName?: FieldError
  errorMessage?: string
  additionalLabel?: ReactNode
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
          event.key === 'ArrowRight' ||
          event.key === 'Tab'
        )
      ) {
        event.preventDefault()
      }
    }
  }

  return (
    <div
      className={`mt-3
        ${halfWidth ? 'w-1/2' : 'w-full'} ${
          leftPosition ? 'mr-1' : halfWidth ? 'ml-1' : 'ml-0'
        }`}
    >
      <div className="flex justify-between">
        <InputLabel label={label ?? <span>&nbsp;</span>} />
        {additionalLabel && (
          <div className="ml-2 text-sm leading-7 text-gray-500">
            {additionalLabel}
            <a
              target="_blank"
              href={linkHref}
              className="text-blue-500 underline hover:no-underline"
              rel="noreferrer"
            >
              {linkText}
            </a>
          </div>
        )}
      </div>
      <div className="relative w-full self-stretch rounded-lg bg-white">
        <Input
          autoComplete="off"
          crossOrigin={undefined}
          {...registerHook}
          placeholder={placeholderValue}
          className="!border-t-blue-gray-200 bg-white focus:!border-t-gray-900"
          labelProps={{ className: 'before:content-none after:content-none' }}
          onKeyDown={handleKeyDown}
        />
        {rightContent && (
          <div className="absolute right-0 top-0 flex h-full min-w-11 items-center justify-center rounded-r-[6px] bg-slate-200 text-lg text-slate-700">
            <span>{rightContent}</span>
          </div>
        )}
      </div>
      {errorFieldName && (
        <Typography variant="small" color="red" className="mt-1">
          {errorMessage || errorFieldName?.message}
        </Typography>
      )}
    </div>
  )
}

export default InputField
