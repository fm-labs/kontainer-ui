import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import AlertDialog from '../Dialog/AlertDialog.tsx'
import { DialogProps } from '@mui/material/Dialog'

interface DeleteButtonProps extends ButtonProps {
  onConfirm?: () => void
  onCancel?: () => void
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>
}

const DeleteButton = ({ onConfirm, onCancel, children, dialogProps, ...buttonProps }: DeleteButtonProps) => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    console.log('Delete: closed')
    setOpen(false)
  }

  const handleConfirm = () => {
    console.log('Delete: confirmed')
    if (onConfirm) {
      onConfirm()
    }
    setOpen(false)
  }

  const handleCancel = () => {
    console.log('Delete: cancelled')
    if (onCancel) {
      onCancel()
    }
    setOpen(false)
  }

  return (
    <>
      <Button variant='contained' color='error' {...buttonProps} onClick={() => setOpen(!open)}>
        {children || 'Delete'}
      </Button>
      <AlertDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={'Delete'}
        confirmLabel={'Delete'}
        cancelLabel={'Cancel'}
        {...dialogProps}
      >
        <div>Are you sure you want to delete?</div>
      </AlertDialog>
    </>
  )
}

export default DeleteButton
