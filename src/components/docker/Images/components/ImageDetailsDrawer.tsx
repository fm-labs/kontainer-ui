import { IDockerResourceAttrs } from '~/types.ts'
import { Button, Drawer } from '@mui/material'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import AppIcons from '~/elements/AppIcons.tsx'
import React from 'react'

export const ImageDetailsDrawer = ({
  image,
  open,
  setOpen,
}: {
  image: IDockerResourceAttrs
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  return (
    <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
      <Container>
        <Toolbar disableGutters={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Image Details</h3>
          </div>
          <div>
            <Button variant={'outlined'} onClick={() => setOpen(false)} startIcon={<AppIcons.CloseIcon />}>
              Close
            </Button>
          </div>
        </Toolbar>
        <pre>{JSON.stringify(image, null, 2)}</pre>
      </Container>
    </Drawer>
  )
}
