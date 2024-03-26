import React from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { Checkbox, Tooltip, Typography } from '@material-tailwind/react'

type TextareaFieldProps = {
  label: string
  registerHook: UseFormRegisterReturn<string>
  inputID: string
  showTooltip?: boolean
  tooltipContent?: string
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  registerHook,
  inputID,
  showTooltip,
  tooltipContent,
}) => {
  return (
    <div className="mt-3 flex w-full items-center self-stretch">
      <label
        htmlFor={inputID}
        className="flex items-center gap-1 text-gray-900"
      >
        <Checkbox id={inputID} {...registerHook} crossOrigin={undefined} />
        {label}
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
  )
}

export default TextareaField
