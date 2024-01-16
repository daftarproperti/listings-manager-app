import { ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'

type ChipProps = LinkProps & {
  icon?: ReactNode
  text: string
}
const Chip = ({ icon, text, ...rest }: ChipProps) => {
  return (
    <Link
      className="group flex items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 bg-white px-3.5 py-2 text-white transition-all hover:bg-primary-500"
      {...rest}
    >
      {icon}
      <div className="grow self-stretch whitespace-nowrap text-sm leading-5 text-primary-500 group-hover:text-white">
        {text}
      </div>
    </Link>
  )
}

export default Chip
