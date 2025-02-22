import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface AlertDialogProps extends DialogProps {
  open: boolean
  title?: string
  onClose?: () => any
  onConfirm?: () => any
  onCancel?: () => any
  confirmLabel?: string
  cancelLabel?: string
}

export default function AlertDialog({
  title,
  open,
  onClose,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  children,
  ...dialogProps
}: AlertDialogProps) {
  const handleConfirm = () => {
    console.log('AlertDialog: handleConfirm')
    if (onConfirm) {
      onConfirm()
    }
    if (onClose) {
      onClose()
    }
  }

  const handleCancel = () => {
    console.log('AlertDialog: handleCancel')
    if (onCancel) {
      onCancel()
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {children && <DialogContent>{children}</DialogContent>}
        <DialogActions>
          <Button onClick={handleCancel}>{cancelLabel}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
