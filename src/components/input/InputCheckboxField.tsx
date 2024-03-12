import React, { useEffect, useRef, useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'

import PopUpModal from '../PopUpModal'

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
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleTap = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const tooltipElement = tooltipRef.current

      const handleMouseOver = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY })
        setIsModalOpen(true)
      }

      const handleMouseOut = () => {
        setIsModalOpen(false)
      }

      tooltipElement.addEventListener('mouseover', handleMouseOver)
      tooltipElement.addEventListener('mouseout', handleMouseOut)

      return () => {
        tooltipElement.removeEventListener('mouseover', handleMouseOver)
        tooltipElement.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [showTooltip])

  return (
    <div className="mt-3 w-full self-stretch">
      <input
        id={inputID}
        type="checkbox"
        {...registerHook}
        className="relative top-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={inputID} className="ml-2 text-gray-900">
        {label}
        {showTooltip && (
          <span
            ref={tooltipRef}
            className="ml-2 cursor-pointer text-gray-400"
            onClick={handleTap}
            data-tip={tooltipContent}
            data-event="click"
            data-event-off="mouseout"
          >
            <QuestionMarkCircleIcon className="mt-[-4px] inline h-5 w-5" />
          </span>
        )}
      </label>
      {isModalOpen && (
        <PopUpModal
          mouseX={cursorPosition.x}
          mouseY={cursorPosition.y}
          tooltipContent={tooltipContent ?? ''}
        />
      )}
    </div>
  )
}

export default TextareaField
