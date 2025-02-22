import * as React from 'react'
import { DialogProps } from '@mui/material/Dialog'
import Button, { ButtonProps } from '@mui/material/Button'
import BasicDialog from './BasicDialog.tsx'

interface BasicDialogButtonProps extends ButtonProps {
  label: string
  children: React.ReactNode
  dialogLabel?: string
  dialogProps?: DialogProps
}

export default function BasicDialogButton({
  label,
  dialogLabel,
  dialogProps,
  children,
  ...buttonProps
}: BasicDialogButtonProps) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button variant={'contained'} onClick={handleOpen} {...buttonProps}>
        {label}
      </Button>
      <BasicDialog {...dialogProps} label={dialogLabel} open={open} onClose={handleClose}>
        {' '}
        {children}
      </BasicDialog>
    </React.Fragment>
  )
}
