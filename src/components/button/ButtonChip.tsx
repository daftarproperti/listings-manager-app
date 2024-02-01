import clsx from 'clsx'
import { ReactNode } from 'react'

const ButtonChip = ({
  text,
  icon,
  isActive,
  ...props
}: {
  text: string
  icon?: ReactNode
  isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={clsx(
        'group flex items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 bg-white px-3.5 py-2 text-white transition-all hover:bg-primary-500',
        isActive && '!bg-primary-500',
      )}
    >
      {icon}
      <div
        className={clsx(
          'grow self-stretch text-sm leading-5 text-primary-500 group-hover:text-white',
          isActive && '!text-white',
        )}
      >
        {text}
      </div>
    </button>
  )
}

export default ButtonChip
