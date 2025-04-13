import React from 'react'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import ImagesDfTableMaterial from '~/components/docker/Images/components/ImagesDfTableMaterial.tsx'
import { IDockerResourceAttrs } from '~/types.ts'
import { Button, Drawer } from '@mui/material'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import AppIcons from '~/elements/AppIcons.tsx'

const ImageDetailsDrawer = ({
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

const ImagesDfView = () => {
  const { df } = useDockerContext()
  const [selectedImage, setSelectedImage] = React.useState<IDockerResourceAttrs | null>(null)
  const toggleDrawer = (open) => setSelectedImage(open ? selectedImage : null)

  return (
    <div>
      {selectedImage && <ImageDetailsDrawer image={selectedImage} open={!!selectedImage} setOpen={toggleDrawer} />}
      <ImagesDfTableMaterial data={df.Images || []} onRowClick={(row) => setSelectedImage(row)} />
    </div>
  )
}

export default ImagesDfView
