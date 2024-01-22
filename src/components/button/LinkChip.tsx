import { ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'

const LinkChip = ({
  icon,
  text,
  ...props
}: { icon?: ReactNode; text: string } & LinkProps) => {
  return (
    <Link
      {...props}
      className="group flex items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 bg-white px-3.5 py-2 text-white transition-all hover:bg-primary-500"
    >
      {icon}
      <div className="grow self-stretch  text-sm leading-5 text-primary-500 group-hover:text-white">
        {text}
      </div>
    </Link>
  )
}

export default LinkChip
