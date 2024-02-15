import React from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type TextareaFieldProps = {
  label: string
  registerHook: UseFormRegisterReturn<string>
  inputID: string
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  registerHook,
  inputID,
}) => {
  return (
    <div className="mt-3 w-full self-stretch">
      <input
        id={inputID}
        type="checkbox"
        {...registerHook}
        className="relative top-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor="isPrivate" className="ml-2 text-gray-900">
        {label}
      </label>
    </div>
  )
}

export default TextareaField
