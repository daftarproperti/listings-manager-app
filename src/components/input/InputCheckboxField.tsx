import React from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { Checkbox, Tooltip, Typography } from '@material-tailwind/react'

type InputCheckboxFieldProps = {
  title?: string
  label: string
  registerHook: UseFormRegisterReturn<string>
  inputID: string
  showTooltip?: boolean
  tooltipContent?: string
  errorFieldName?: FieldError
}

const InputCheckboxField: React.FC<InputCheckboxFieldProps> = ({
  title,
  label,
  registerHook,
  inputID,
  showTooltip,
  tooltipContent,
  errorFieldName,
}) => {
  return (
    <>
      <div className="mt-2 flex w-auto items-start">
        <label
          htmlFor={inputID}
          className="flex items-start gap-1 text-gray-900"
        >
          <Checkbox
            id={inputID}
            {...registerHook}
            crossOrigin={undefined}
            containerProps={{
              className: 'm-0 mt-0.5 p-0 rounded-none',
            }}
            className="mr-0 p-0 hover:before:opacity-0"
          />
          <div className="ml-1">
            {title && <h5 className="text-lg leading-7">{title}</h5>}
            <p>{label}</p>
          </div>
          {showTooltip && (
            <Tooltip
              className="border border-blue-gray-100 bg-white px-4 py-3 shadow shadow-black/10"
              content={
                <div className="w-60">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-80"
                  >
                    {tooltipContent}
                  </Typography>
                </div>
              }
            >
              <QuestionMarkCircleIcon className="h-5 w-5 text-slate-500" />
            </Tooltip>
          )}
        </label>
      </div>
      {errorFieldName?.message && (
        <span className="self-stretch text-sm leading-5 text-red-500">
          {errorFieldName?.message}
        </span>
      )}
    </>
  )
}

export default InputCheckboxField
