import React from 'react'
import { IDockerResourceAttrs } from '~/types.ts'
import NetworksTableMaterial from '~/components/docker/Networks/components/NetworksTableMaterial.tsx'
import { Button, Drawer } from '@mui/material'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import AppIcons from '~/elements/AppIcons.tsx'

const NetworkDetailsDrawer = ({
  network,
  open,
  setOpen,
}: {
  network: IDockerResourceAttrs
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  return (
    <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
      <Container>
        <Toolbar disableGutters={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Network Details</h3>
          </div>
          <div>
            <Button variant={'outlined'} onClick={() => setOpen(false)} startIcon={<AppIcons.CloseIcon />}>
              Close
            </Button>
          </div>
        </Toolbar>
        <pre>{JSON.stringify(network, null, 2)}</pre>
      </Container>
    </Drawer>
  )
}

const NetworksView = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const [selectedNetwork, setSelectedNetwork] = React.useState<IDockerResourceAttrs | null>(null)
  const toggleDrawer = (open) => setSelectedNetwork(open ? selectedNetwork : null)

  return (
    <div>
      {selectedNetwork && (
        <NetworkDetailsDrawer network={selectedNetwork} open={!!selectedNetwork} setOpen={toggleDrawer} />
      )}
      <NetworksTableMaterial data={data} onRowClick={(row) => setSelectedNetwork(row)} />
    </div>
  )
}

export default NetworksView
