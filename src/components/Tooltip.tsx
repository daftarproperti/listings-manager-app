import { type ReactNode, type FC, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react'
import { type placement } from '@material-tailwind/react/types/components/popover'

type TooltipProps = {
  children: ReactNode
  content: ReactNode
  open?: boolean
  placement?: placement
}

const Tooltip: FC<TooltipProps> = ({ children, content, open, placement }) => {
  const [isOpen, setIsOpen] = useState(false)

  const triggers = {
    onMouseEnter: () => setIsOpen(open ?? true),
    onMouseLeave: () => setIsOpen(false),
  }

  return (
    <Popover open={isOpen} handler={setIsOpen} placement={placement}>
      <PopoverHandler {...triggers}>{children}</PopoverHandler>
      <PopoverContent
        {...triggers}
        className="z-50 w-60 border border-blue-gray-100 bg-white px-4 py-3 shadow shadow-black/10"
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}

export default Tooltip
