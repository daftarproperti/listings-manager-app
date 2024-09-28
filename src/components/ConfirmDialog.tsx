import { type ReactNode } from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react'
import { type size } from '@material-tailwind/react/types/components/dialog'

const ConfirmDialog = ({
  open,
  size = 'sm',
  title,
  body,
  cancelLabel,
  confirmLabel,
  confirmDelete,
  handleOpen,
  handleCancel,
  handleConfirm,
}: {
  open: boolean
  size?: size
  title: string
  body: ReactNode
  cancelLabel: string
  confirmLabel: string
  confirmDelete: boolean
  handleOpen: () => void
  handleCancel: () => void
  handleConfirm: () => void
}) => {
  return (
    <Dialog open={open} size={size} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>{body}</DialogBody>
      <DialogFooter className="space-x-2">
        <Button
          variant="text"
          color={confirmDelete ? 'blue' : 'red'}
          onClick={handleCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="gradient"
          color={confirmDelete ? 'red' : 'blue'}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default ConfirmDialog
