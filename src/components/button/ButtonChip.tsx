import clsx from 'clsx'
import { type ReactNode } from 'react'

const ButtonChip = ({
  text,
  icon,
  isActive,
  ...props
}: {
  text?: string
  icon?: ReactNode
  isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={clsx(
        'group flex items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 bg-white px-3.5 py-2 text-white transition-all',
        isActive && '!bg-primary-500',
        props.disabled ? 'border-none !bg-slate-300' : 'hover:bg-primary-500',
        props.className,
      )}
    >
      {icon}
      {text && (
        <div
          className={clsx(
            'grow self-stretch text-sm leading-5 text-primary-500',
            isActive && '!text-white',
            props.disabled ? 'text-slate-100' : 'group-hover:text-white',
          )}
        >
          {text}
        </div>
      )}
    </button>
  )
}

export default ButtonChip
