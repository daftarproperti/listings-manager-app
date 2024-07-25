import React from 'react'

interface InputModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  title: string
  children: React.ReactNode
}

const InputModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  children,
}: InputModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="z-10 w-4/5 max-w-3xl rounded-lg bg-white p-8">
        <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        {children}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition-shadow duration-200 hover:shadow-lg"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition-shadow duration-200 hover:shadow-lg"
          >
            Ekstrak
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputModal
