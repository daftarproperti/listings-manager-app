import clsx from 'clsx'
import { type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

const LinkChip = ({
  icon,
  text,
  additionalInfo,
  disabled,
  ...props
}: {
  icon?: ReactNode
  text: string
  additionalInfo?: ReactNode
  disabled?: boolean
} & LinkProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        'border-primary-500 hover:bg-primary-500 group flex items-center justify-center gap-1 rounded-lg border border-solid bg-white px-3.5 py-2 text-white transition-all',
        props.className,
        disabled && 'pointer-events-none border-none !bg-slate-300',
      )}
    >
      {icon}
      <div
        className={clsx(
          'text-primary-500 grow  self-stretch text-sm leading-5 group-hover:text-white',
          disabled && '!text-slate-100',
        )}
      >
        {text}
        {additionalInfo}
      </div>
    </Link>
  )
}

export default LinkChip
