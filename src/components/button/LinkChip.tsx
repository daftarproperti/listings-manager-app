import clsx from 'clsx'
import { type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

const LinkChip = ({
  icon,
  text,
  disabled,
  ...props
}: { icon?: ReactNode; text: string; disabled?: boolean } & LinkProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        'group flex items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 bg-white px-3.5 py-2 text-white transition-all hover:bg-primary-500',
        props.className,
        disabled && 'pointer-events-none border-none !bg-slate-300',
      )}
    >
      {icon}
      <div
        className={clsx(
          'grow self-stretch  text-sm leading-5 text-primary-500 group-hover:text-white',
          disabled && '!text-slate-100',
        )}
      >
        {text}
      </div>
    </Link>
  )
}

export default LinkChip
