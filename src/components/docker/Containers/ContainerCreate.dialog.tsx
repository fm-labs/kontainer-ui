import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { toast } from 'react-toastify'

export default function CreateContainerDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault()
        //     const formData = new FormData(event.currentTarget)
        //     const formJson = Object.fromEntries((formData as any).entries())
        //     const containerName = formJson.containerName
        //     console.log(containerName)
        //     // api
        //     //   .createContainer(containerName)
        //     //   .then(() => {
        //     //     console.log('container created')
        //     //     toast.success('Container created')
        //     //     handleClose()
        //     //   })
        //     //   .catch((error) => {
        //     //     console.error('error creating container', error)
        //     //     toast.error('Error creating container')
        //     //   })
        //   },
        // }}
      >
        <DialogTitle>Create new container</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the image name you want to launch</DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='imageName'
            label='Image Name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            id='name'
            name='containerName'
            label='Container Name (optional)'
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant={'outlined'} color={'error'}>
            Cancel
          </Button>
          <Button type='submit' variant={'outlined'}>
            Just create
          </Button>
          <Button type='submit' variant={'contained'} color={'primary'}>
            Create & Run
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
