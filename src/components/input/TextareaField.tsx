import React from 'react'
type TextareaFieldProps = {
  label: string
  registerHook: any
  placeholderValue: string
  errorFieldName?: any
  errorMessage?: string
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  registerHook,
  placeholderValue,
  errorFieldName,
  errorMessage,
}) => {
  return (
    <div className="mt-3 w-full self-stretch">
      <span className="text-lg font-semibold leading-7 text-gray-800">
        {label}
      </span>
      <textarea
        {...registerHook}
        placeholder={placeholderValue}
        className="mt-1 min-h-[127px] w-full items-start justify-center self-stretch whitespace-nowrap rounded-lg border border-solid border-[color:var(--royal-blue-200,#C6CAFF)] bg-white px-3 py-2.5 text-lg leading-7 text-gray-800"
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