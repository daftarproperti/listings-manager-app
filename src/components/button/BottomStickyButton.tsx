import { Button } from '@material-tailwind/react'

const BottomStickyButton = ({
  type,
  disabled,
  children,
  onClick,
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <div className="fixed bottom-0 w-full max-w-lg bg-white px-4 py-2">
      <Button
        fullWidth
        color="blue"
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="text-base font-normal capitalize"
      >
        {children}
      </Button>
    </div>
  )
}

export default BottomStickyButton
