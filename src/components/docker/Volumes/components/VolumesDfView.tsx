import React from 'react'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import VolumesDfTableMaterial from '~/components/docker/Volumes/components/VolumesDfTableMaterial.tsx'
import { IDockerResourceAttrs } from '~/types.ts'
import { Button, Drawer } from '@mui/material'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import AppIcons from '~/elements/AppIcons.tsx'

const VolumeDetailsDrawer = ({
  volume,
  open,
  setOpen,
}: {
  volume: IDockerResourceAttrs
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  return (
    <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
      <Container>
        <Toolbar disableGutters={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Volume Details</h3>
          </div>
          <div>
            <Button variant={'outlined'} onClick={() => setOpen(false)} startIcon={<AppIcons.CloseIcon />}>
              Close
            </Button>
          </div>
        </Toolbar>
        <pre>{JSON.stringify(volume, null, 2)}</pre>
      </Container>
    </Drawer>
  )
}

const VolumesDfView = () => {
  const { df } = useDockerContext()
  const [selectedVolume, setSelectedVolume] = React.useState<IDockerResourceAttrs | null>(null)
  const toggleDrawer = (open) => setSelectedVolume(open ? selectedVolume : null)

  return (
    <div>
      {selectedVolume && <VolumeDetailsDrawer volume={selectedVolume} open={!!selectedVolume} setOpen={toggleDrawer} />}
      <VolumesDfTableMaterial data={df.Volumes || []} onRowClick={(row) => setSelectedVolume(row)} />
    </div>
  )
}

export default VolumesDfView
