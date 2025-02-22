import * as React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import { AppBar } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

interface BasicDialogProps extends DialogProps {
  open: boolean
  onClose: () => void
  label?: string
  children: React.ReactNode
}

export default function BasicDialog({ open, onClose, label, children, ...dialogProps }: BasicDialogProps) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} fullScreen={false} fullWidth={true} maxWidth={'md'} {...dialogProps}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              {label}
            </Typography>
            {/*<Button autoFocus color='inherit' onClick={onClose}>
              save
            </Button>*/}
            <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent>{children}</DialogContent>
        {/*<DialogActions>
          <Button onClick={onClose} variant={'contained'} color={'error'}>
            Cancel
          </Button>
          <Button type='submit' variant={'contained'} color={'primary'}>
            Launch
          </Button>
        </DialogActions>*/}
      </Dialog>
    </React.Fragment>
  )
}
