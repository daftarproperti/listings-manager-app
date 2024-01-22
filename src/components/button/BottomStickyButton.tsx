type BottomStickyButtonProps = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const BottomStickyButton: React.FC<BottomStickyButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <div className="fixed bottom-0 w-full max-w-lg bg-white px-4 py-2">
      <button
        {...rest}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-20 py-3 text-white"
      >
        {children}
      </button>
    </div>
  )
}

export default BottomStickyButton
