import { type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type ChipProps = LinkProps & {
  icon?: ReactNode
  text: string
}
const Chip = ({ icon, text, ...rest }: ChipProps) => {
  return (
    <Link
      className="border-primary-500 hover:bg-primary-500 group flex items-center justify-center gap-1 rounded-lg border border-solid bg-white px-3.5 py-2 text-white transition-all"
      {...rest}
    >
      {icon}
      <div className="text-primary-500 grow self-stretch whitespace-nowrap text-sm leading-5 group-hover:text-white">
        {text}
      </div>
    </Link>
  )
}

export default Chip
